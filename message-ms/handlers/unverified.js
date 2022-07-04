const pool = require('../model/database')
const bcrypt = require('bcrypt')
const checkIn = require('./checkin');
const {sockets} = require("../model/sockets")

async function verify(ws, data) {
    if(ws._eventsCount >= 4){
        ws.send(JSON.stringify({"type":"connection", "status":"terminate", "message":"Sent 3 messages without verify."}))
        ws.terminate();
        return
    }

    if(data.type == "login"){
        let { address, password } = data;

        //HASHING and SALT reterival
        try{
            const SALTdata = await pool.query(`SELECT salt FROM users WHERE address = '${address}'`)
            if(SALTdata.rowCount != 1) return ws.send(JSON.stringify({"type":"login", "status":"failed", "reason":"address is wrong."}))
    
            password = await bcrypt.hash(password, SALTdata.rows[0].salt)
        }catch(err){
            ws.send(JSON.stringify({"type":"login", "status":"failed", "reason":"there was an error hashing your password."}))
        }
    
        //Logging in and verifing credintials
        try{
            const DBdata = await pool.query(`SELECT password = '${password}', username FROM users  WHERE address = '${address}'`)
    
            if(DBdata.rows[0]['?column?'] == false){
                ws.send(JSON.stringify({"type":"login", "status":"failed", "reason":"password is wrong."}))
            }
            else if(DBdata.rows[0]['?column?'] == true){ //password is correct
                //check if user already connected
                for(let i = 0; i < sockets.length; i++){
                    if(sockets[i].ACCaddress == address){
                        ws.send(JSON.stringify({"type":"connection","status":"termination","reason":"this account is already connected."}))
                        ws.terminate()

                        return
                    }
                }

                let checked = await checkIn(ws, address, DBdata.rows[0]['username']);
                if(checked == true){
                    ws.send(JSON.stringify({"type":"login", "status":"success", "logged_as":ws.username}))
                }
            }
        }catch(err){
            ws.send(JSON.stringify({"type":"login", "status":"failed", "reason":"there was an error checking your credintials."}))
        }
    }
}

module.exports = verify;