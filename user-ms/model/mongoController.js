const mongoose = require('mongoose')

//configs
const { MONGO_URI } = require('../config/env');

//connect
mongoose.connect(MONGO_URI)

//model
const messagesModel = require('./messagesModel')

async function getAllMessages(address){
    const outgoing = await messagesModel.find({sender: address, outgoing: true})
    const incoming = await messagesModel.find({receiver: address, outgoing: false})
    
    return {outgoing, incoming};
}

async function getAllMessagesAssociated(address, associated_address){
    const outgoing = await messagesModel.find({sender:address, receiver:associated_address, outgoing:true})
    const incoming = await messagesModel.find({sender:associated_address, receiver:address, outgoing:true})

    return {outgoing, incoming}
}

module.exports = {
    getAllMessages: getAllMessages,
    getAllMessagesAssociated: getAllMessagesAssociated
}