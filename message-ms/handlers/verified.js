const {sockets} = require("../model/sockets")
const pool = require('../model/database')
const { createPending } = require('../model/mongoController')

async function verified(ws, data){
    if(data.type == "message"){
        let userToSend = {}

        const findUser = await pool.query(`SELECT address FROM users WHERE address = '${data.address}'`)

        if(findUser.rowCount == 0){
            ws.send(JSON.stringify({"type":"send","status":"error","reason":"this user doesn't exist"}))
            return
        }

        for(let i = 0; i < sockets.length; i++){
            if(sockets[i].address == data.address && sockets[i].verified == true){
                userToSend = sockets[i]
            }
        }

        if(userToSend = {}){ //if the user is not connected
            createPending(data.message, ws.address, data.address)
        }else{ //user is connected
            userToSend.send(JSON.stringify({"type":"message","message":data.message,"from": ws.address}))
        }

        ws.send(JSON.stringify({"type":"send","status":"success","reason":"message was sent successfuly"}))
    }
}

module.exports = verified;