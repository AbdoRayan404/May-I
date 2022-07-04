const { storeMessage } = require('../model/mongoController')

//NOTE: calling this function means that sender and reciever both are online.
async function sendMessage(sender, reciever, message, restore_message){
    reciever.send(JSON.stringify({"type": "message", "message": message, "from": sender.ACCaddress}))
    
    if(reciever.storeMessages == true){
        storeMessage(sender.ACCaddress, sender.username,  reciever.ACCaddress, reciever.username, message, false)
    }

    if(sender.storeMessages == true){
        if(restore_message){
            storeMessage(sender.ACCaddress, sender.username, reciever.ACCaddress, reciever.username, restore_message, true)
        }else{
            return false
        }
    }

    return true
}

async function sendPendingMessage(senderAddress, senderUsername, receiver, message, sent_at){
    receiver.send(JSON.stringify({"type":"pending-message", "from":senderAddress, "username":senderUsername, "message":message, "sent_at":sent_at}))
    if(receiver.storeMessages == true){
        storeMessage(senderAddress, senderUsername, receiver.ACCaddress, receiver.username, message, false)
    }
}   

module.exports = {
    sendMessage:sendMessage,
    sendPendingMessage:sendPendingMessage
};