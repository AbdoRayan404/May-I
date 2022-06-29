const { storeMessage } = require('../model/mongoController')

//NOTE: calling this function means that sender and reciever both are online.
async function sendMessage(sender, reciever, message){
    reciever.send(JSON.stringify({"type": "message", "message": message, "from": sender.ACCaddress}))
    if(sender.storeMessages == true){
        storeMessage(sender.ACCaddress, reciever.ACCaddress, message, true)
    }
    
    if(reciever.storeMessages == true){
        storeMessage(sender.ACCaddress, reciever.ACCaddress, message, false)
    }
}

async function sendPendingMessage(senderAddress, receiver, message, sent_at){
    receiver.send(JSON.stringify({"type":"pending-message", "from":senderAddress, "message":message, "sent_at":sent_at}))
    if(receiver.storeMessages == true){
        storeMessage(senderAddress, receiver.ACCaddress, message, false)
    }
}   

module.exports = {
    sendMessage:sendMessage,
    sendPendingMessage:sendPendingMessage
};