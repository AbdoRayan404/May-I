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

module.exports = getPendings;