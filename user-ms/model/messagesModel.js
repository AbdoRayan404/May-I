const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    sender: String,
    receiver: String,
    outgoing: Boolean,
    message: String,
    sent_at: String,
})

const messagesModel = mongoose.model('messages', messageSchema)

module.exports = messagesModel