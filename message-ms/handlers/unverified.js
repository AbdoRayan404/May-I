const pool = require('../model/database')
const bcrypt = require('bcrypt')
const checkIn = require('./checkin');

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
            const DBdata = await pool.query(`SELECT password = '${password}' FROM users  WHERE address = '${address}'`)
    
            if(DBdata.rows[0]['?column?'] == false){
                ws.send(JSON.stringify({"type":"login", "status":"failed", "reason":"password is wrong."}))
            }
            else if(DBdata.rows[0]['?column?'] == true){
                ws.send(JSON.stringify({"type":"login", "status":"success"}))
                ws.verified = true;
                ws.address = address;

                checkIn(ws);
            }
        }catch(err){
            ws.send(JSON.stringify({"type":"login", "status":"failed", "reason":"there was an error checking your credintials."}))
        }
    }
}

module.exports = verify;