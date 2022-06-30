const {sockets} = require("../model/sockets")
const pool = require('../model/database')
const { createPending, storeMessage } = require('../model/mongoController')
const { sendMessage } = require('./sendMessage')

async function verified(ws, data){
    if(data.type == "send"){
        let userToSend = {}

        const findUser = await pool.query(`SELECT address FROM users WHERE address = '${data.address}'`)

        if(findUser.rowCount == 0){
            ws.send(JSON.stringify({"type":"send","status":"error","reason":"this user doesn't exist"}))
            return
        }

        for(let i = 0; i < sockets.length; i++){
            if(sockets[i].ACCaddress == data.address && sockets[i].verified == true){
                userToSend = sockets[i]
            }
        }

        //NOTE: here we want to store message when it is sent to the user that's why storing messages only happen
        //when the user have checked in
        
        if(userToSend.ACCaddress){ //if the user is connected
            let error = await sendMessage(ws, userToSend, data.message, data.restore_message)
            if(error == false){
                ws.send(JSON.stringify({"type":"error","reason":"message were not stored, no restore_message field provided"}))
            }
        }else{ //user is not connected
            createPending(ws.ACCaddress, data.address, data.message)

            //creating stored message for the sender only.
            if(ws.storeMessages == true){
                storeMessage(ws.ACCaddress, data.address, data.restore_message, true)
            }
        }

        ws.send(JSON.stringify({"type":"send","status":"success"}))
    }
}

module.exports = verified;