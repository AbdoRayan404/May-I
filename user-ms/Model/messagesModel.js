const mongoose = require('mongoose');

const outgoingSchema = new mongoose.Schema({
    to:{
        type: String,
        required: true,
    },
    message:{
        type: String,
        required: true,
    },
    sent_at:{
        type: Date,
        required: true,
    }
})

const incomingSchema = new mongoose.Schema({
    from:{
        type: String,
        required: true,
    },
    message:{
        type: String,
        required: true,
    },
    sent_at:{
        type: Date,
        required: true
    }

})

const messageSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true
    },
    outgoing: [outgoingSchema],
    incoming: [incomingSchema]
})

const messagesModel = mongoose.model('Messages', messageSchema)

module.exports = messagesModel