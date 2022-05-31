const {sockets} = require("../model/sockets")

async function verified(ws, data){
    if(data.type == "message"){
        let userToSend = {}

        for(let i = 0; i < sockets.length; i++){
            if(sockets[i].address == data.address && sockets[i].verified == true){
                userToSend = sockets[i]
            }
        }

        userToSend.send(JSON.stringify({"type":"message","message":data.message,"from": ws.address}))
    }
}

module.exports = verified;