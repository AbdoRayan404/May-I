const WebSocket = require('ws');

//config
const { PORT } = require('./config/env')

const wss = new WebSocket.WebSocketServer({ port:PORT },()=> console.log(`server is up on port ${ PORT }`))

module.exports = wss;

//loading
const handler = require('./sockets/handler')