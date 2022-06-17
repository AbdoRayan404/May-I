const mongoose = require('mongoose')

const pendingSchema = new mongoose.Schema({
    to:{
        type: String,
        required: true
    },
    from:{
        type: String,
        required: true
    },
    message:{
        type: String,
        required: true
    },
    sent_at:{
        type: Date,
        required: true
    }
})

const pendingModel = mongoose.model("Pending", pendingSchema)

module.exports = pendingModel;