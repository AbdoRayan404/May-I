const wss = require('../server')
const {sockets} = require('../model/sockets')
const verify = require('./unverified')
const verified = require("./verified")

wss.on("connection", async (ws)=>{
    ws.send(JSON.stringify({"type":"authenticate","message":"login"}))
    ws.verified = false
    sockets.push(ws)
    

    ws.on('message', (data)=>{
        
        //Binary -> String -> JSON
        try{
            data = JSON.parse(data.toString())
        }catch(err){
            ws.send(JSON.stringify({"type":"error","connection":"terminate","message":"Invalid JSON."}))
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