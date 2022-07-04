const mongoose = require('mongoose')

const pendingSchema = new mongoose.Schema({
    receiver: String,
    sender: String,
    sender_username: String,
    message: String,
    sent_at: Date,
})

const pendingModel = mongoose.model("Pending", pendingSchema)

module.exports = pendingModel;