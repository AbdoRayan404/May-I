const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    sender: String,
    sender_username: String,
    receiver: String,
    receiver_username: String,
    outgoing: Boolean,
    message: String,
    sent_at: String,
})

const messagesModel = mongoose.model('messages', messageSchema)

module.exports = messagesModel