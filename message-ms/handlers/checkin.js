const { getPendings } = require('../model/mongoController')

async function checkIn(ws){
    const pendings = await getPendings(ws.ACCaddress);

    for(let i = 0; i < pendings.length; i++){
        ws.send(JSON.stringify({"type":"pending-message","from":pendings[i]['from'], "message":pendings[i]['message'], "sent_at": new Date(pendings[i]['sent_at']).toDateString() }))
    }
}

module.exports = checkIn