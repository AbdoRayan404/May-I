const wss = require('../server')
const sockets = require('../model/sockets')
const verify = require('./unverified')

wss.on("connection", async (ws)=>{
    ws.send(JSON.stringify({"type":"authenticate","message":"login"}))
    sockets[ws] = {verified: false, messages: 0}
    

    ws.on('message', (data)=>{
        //Data convertion
        try{
            data = JSON.parse(data.toString()) // buffer -> string -> json
        }catch(err){
            ws.send(JSON.stringify({"type":"connection", "connection":"terminate", "message":"invalid JSON."}))
            ws.terminate()
        }
        
        if(sockets[ws].verified == false){
            verify(ws, data)
        }


        sockets[ws].messages++;
    })

    
})

module.exports = wss