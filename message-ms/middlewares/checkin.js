async function checkIn(ws){
    ws.send(JSON.stringify({"type":"TEST","message":"check in middleware works", "address":ws.address, "verification-status":ws.verified}))
}

module.exports = checkIn