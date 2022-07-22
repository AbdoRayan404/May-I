const {getAllMessages, getAllMessagesAssociated} = require('../../model/mongoController')

async function getUserMessages(req, res, next){
    let {address, with_address} = req.body;

    if(with_address){
        const messages = await getAllMessagesAssociated(address, with_address)
        res.status(200).json(messages)
    }else{
        const userMessages = await getAllMessages(address)
        res.status(200).json(userMessages)
    }

    
}

module.exports = getUserMessages;