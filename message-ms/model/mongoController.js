const mongoose = require('mongoose');

//configs
const {MONGO_URI} = require('../config/env')

//DB connecting
mongoose.connect(MONGO_URI)

//models
const pendingModel = require('./pendingModel')
const messagesModel = require('./messagesModel')

async function getPendings(address){
    const pendings = await pendingModel.find({receiver: address});

    if(pendings.length == 0) return [];
    else{ //if it's returned. delete em
        await pendingModel.deleteMany({receiver: address});
    }

    return pendings;
}

/*
    args
        sender @type {WebSocket}
        reciever @type {String}
        message @type {String} 
*/

async function createPending(sender, reciever, message){
    const pending = new pendingModel({
        receiver: reciever,
        sender: sender.ACCaddress,
        sender_username: sender.username,
        message: message,
        sent_at: new Date().toDateString()
    })


    const savedPending = await pending.save()
}

/*
    args
        senderAddress @type {String}
        senderUsername @type {String}
        receieverAddress @type {String}
        recieverUsername @type {String}
        message @type {String}
        outgoing @type {Boolean}
        sent_at @type {Date}


*/
async function storeMessage(senderAddress, senderUsername, recieverAddress, recieverUsername, message, outgoing, sent_at = new Date().toDateString()){
    let messageToSave = new messagesModel({
        sender: senderAddress,
        sender_username: senderUsername,
        receiver: recieverAddress,
        receiver_username: recieverUsername,
        message: message,
        outgoing: outgoing,
        sent_at: sent_at
    })

    const savedMessage = await messageToSave.save()
}

module.exports = {
    getPendings: getPendings,
    createPending: createPending,
    storeMessage: storeMessage
};