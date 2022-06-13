const mongoose = require('mongoose');

//configs
const {MONGO_URI} = require('../config/env')

//DB connecting
mongoose.connect(MONGO_URI)

//models
const pendingModel = require('./pending')

async function getPendings(address){
    const pendings = await pendingModel.find({to: address});

    if(pendings.length == 0) return [];
    else{ //if it's returned. delete em
        await pendingModel.deleteMany({to: address});
    }

    return pendings;
}

function createPending(message, from, to){
    const pending = new pendingModel({
        to: to,
        from: from,
        message: message,
        sent_at: new Date().toDateString()
    })


    pending.save((err, data)=>{
        if(err) {
            console.log('saving pending error')
        }
    })
}

module.exports = {
    getPendings: getPendings,
    createPending: createPending
};