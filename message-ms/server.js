const WebSocket = require('ws');

//config
const { PORT } = require('./config/env')

//exports
const verify = require('./handlers/unverified')
const verified = require("./handlers/verified")
const checkin = require("./handlers/checkin")
const {sockets} = require('./model/sockets')
const miscCheck = require('./handlers/inputCheck')

//initial WebSockerServer
const MayIWebSocket = require('./classes/websocket')
const wss = new WebSocket.WebSocketServer({ port:PORT || 4000, "WebSocket":MayIWebSocket },()=> console.log(`server is up on port ${ PORT }`))

wss.on('connection', async (ws)=>{
    sockets.push(ws)

    ws.on("message", (data)=>{
        // data parsing. Buffer => String => JSON
        try{
            data = JSON.parse(data.toString());
        }catch(err){
            ws.send(JSON.stringify({"type":"conection", "status":"terminate", "reason":"Invalid JSON"}))
            ws.terminate();

            return
        }

        // Input check
        let misccheck = miscCheck(data);

        if(misccheck == true){ //means input has miscellaneous characters
            ws.send(JSON.stringify({"type":"connection", "status":"terminate", "reason":"miscellaneous characters"}))
            ws.terminate();

            return
        }

        if(ws.verified == false){
            verify(ws, data)
        }else if(ws.verified == true){
            verified(ws, data)
        }
    })

    ws.on("close", (code, reason)=>{
        for(let i = 0; i < sockets.length; i++){
            if(sockets[i] == ws){
                sockets.splice(i, 1);
            }
        }
    })
})

module.exports = wss