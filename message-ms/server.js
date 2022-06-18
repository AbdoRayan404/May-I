const WebSocket = require('ws');

//config
const { PORT } = require('./config/env')

//exports
const verify = require('./handlers/unverified')
const verified = require("./handlers/verified")
const checkin = require("./handlers/checkin")
const {sockets} = require('./model/sockets')

//initial WebSockerServer
const MayIWebSocket = require('./classes/websocket')
const wss = new WebSocket.WebSocketServer({ port:PORT, "WebSocket":MayIWebSocket },()=> console.log(`server is up on port ${ PORT }`))

wss.on('connection', async (ws)=>{
    sockets.push(ws)

    ws.on("message", (data)=>{
        try{
            data = JSON.parse(data.toString());
        }catch(err){
            ws.send(JSON.stringify({"type":"conection", "status":"terminate", "reason":"Invalid JSON"}))
            ws.terminate();

            return
        }

        if(ws.verified == false){
            verify(ws, data)
        }else if(ws.verified == true){
            verified(ws, data)
        }
    })
})

module.exports = wss