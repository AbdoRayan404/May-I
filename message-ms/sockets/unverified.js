const sockets = require('../model/sockets')
const pool = require('../model/database')
const bcrypt = require('bcrypt')

function verify(ws, data) {
    if(sockets[ws].messages >= 3){
        ws.send(JSON.stringify({"type":"connection", "connection":"terminate", "message":"Sent 3 messages without verify."}))
        ws.terminate();
        return
    }

    let { address, password } = data;

    try{
        const data = await pool.query(`SELECT password = '${password}' WHERE address = '${address}'`)

        if(data.rows[0]['?column?'] == false){
            ws.send(JSON.stringify({"type":"authenticate", "authentication":"failed", "message":"password is wrong."}))
        }
        else if(data.rows[0]['?column?'] == true){
            ws.send(JSON.stringify({"type":"authenticate", "authentication":"success"}))
            sockets[ws].verified = true;
        }
    }catch(err){

    }
    


}

module.exports = verify;