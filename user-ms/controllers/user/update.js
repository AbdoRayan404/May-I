const pool = require('../../model/database')

async function updateSettings(req, res, next){
    let {address, update} = req.body;
    /*
        expecting update Object to be
            {
                store_messages: Boolean,
                public_key: String
            }
        //NOTE: it is optional, so a user might update public_key only
    */
    
    if(typeof update.public_key == "string" && typeof update.store_messages == "boolean"){
        const updatedData = await pool.query(`UPDATE users SET public_key = '${update.public_key}', store_messages = ${update.store_messages} WHERE address = '${address}'`)
        
        if(updatedData.rowCount == 1){
            res.status(200).json({"store_messages": update.store_messages, "public_key": update.public_key})
        }
        return
    }

    if(typeof update.store_messages == "boolean" && typeof update.public_key == "undefined"){
        const updatedData = await pool.query(`UPDATE users SET store_messages = ${update.store_messages} WHERE address = '${address}'`)

        if(updatedData.rowCount == 1){
            res.status(200).json({"store_messages": update.store_messages})
        }
        return
    }

    if(typeof update.public_key == "string" && typeof update.store_messages == "undefined"){
        const updatedData =  await pool.query(`UPDATE users SET public_key = '${update.public_key}' WHERE address = '${address}'`)

        if(updatedData.rowCount == 1){
            res.status(200).json({"public_key": update.public_key})
        }
        return
    }

    res.status(400).json({"error":"are you sure your input is correct?"})


}

module.exports = updateSettings;