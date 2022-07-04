const { getPendings } = require('../model/mongoController')
const pool = require('../model/database')

const { sendPendingMessage } = require('./sendMessage')

async function checkIn(ws, address, username){
    ws.verified = true;
    ws.ACCaddress = address;
    ws.username = username

    try{
        let userSettings = await pool.query(`SELECT store_messages FROM users WHERE address = '${ws.ACCaddress}'`)
        ws.storeMessages = userSettings.rows[0]['store_messages']
    }catch(err){
        console.log(err)
        ws.send(JSON.stringify({"type":"login", "status":"failed", "reason":"there was an error retrieving your settings"}))
        return false
    }

    const pendings = await getPendings(ws.ACCaddress);

    for(let i = 0; i < pendings.length; i++){
        await sendPendingMessage(pendings[i]['sender'], ws, pendings[i]['message'], new Date(pendings[i]['sent_at']).toDateString())
    }

    return true
}

module.exports = checkIn