const mongoose = require('mongoose');

//configs
const {MONGO_URI} = require('../config/env')

//DB connecting
mongoose.connect(MONGO_URI)

//models
const pendingModel = require('./pending')

function getPendings(address){
    pendingModel.findOne({to: address}, (err, data) =>{
        if(err){return}
        if(data){
            console.log(data);
            return data
        }
    })
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