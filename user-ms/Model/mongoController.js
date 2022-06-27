const mongoose = require('mongoose')

//configs
const { MONGO_URI } = require('../config/env');

//connect
mongoose.connect(MONGO_URI)

//model
const messagesModel = require('./messagesModel')

async function addUser(address){
    const user = new messagesModel({
        address:address,
        outgoing:[],
        incoming:[]
    })

    const saved = await user.save()
    if(saved.address = address){
        return //NOTE there will be logger here
    }
}

async function getMessages(address){
    const user = await messagesModel.findOne({address: address})

    return user;
}

module.exports = {
    addUser:addUser,
    getMessages:getMessages
}