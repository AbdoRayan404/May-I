const WebSocket = require('ws');
const pool = require('./model/database');

const wss = new WebSocket.WebSocketServer({ port:4000 },()=> console.log('server is up on port 4000'))
const sockets = {
    
}

wss.on('connection', (ws)=>{
    ws.send(JSON.stringify({"type":"authenticate","message":"login"}))
    sockets[ws] = {verified: false, messages: 0}

    ws.on('message', (data)=>{
        try{
            data = JSON.parse(data.toString()) // buffer -> string -> json
        }catch(err){
            ws.send(JSON.stringify({"type":"connection", "connection":"terminate", "message":"invalid JSON."}))
            ws.terminate()
        }
        

        if(sockets[ws].verified == false){
            if(sockets[ws].messages >= 3){
                ws.send(JSON.stringify({"type":"connection", "connection":"terminate", "message":"did not verify after 3 requests. TERMINATING"}))
                ws.terminate()
            }
            sockets[ws].messages++;

            if(data.type == "login"){
                ws.send('will continue later !!')
            }
        }
    })
})