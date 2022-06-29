const {getAllMessages} = require('../../model/mongoController')

async function getUserMessages(req, res, next){
    let {address} = req.body;

    const userMessages = await getAllMessages(address)
    res.status(200).json(userMessages)
}

module.exports = getUserMessages;