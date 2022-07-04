const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    sender: {type:String, required:true},
    sender_username: {type:String, required:true},
    receiver: {type:String, required:true},
    receiver_username: {type:String, required:true},
    outgoing: {type:Boolean, required:true},
    message: {type:String, required:true},
    sent_at: {type:String, required:true}
})

const messagesModel = mongoose.model('messages', messageSchema)

module.exports = messagesModel