const pool = require('../../model/database')

async function updateSettings(req, res, next){
    let {address, update} = req.body;
    let updated = {address, updated:{}}

    if(req.body.hasOwnProperty('update') == false){
        res.status(400).json({'error':'provide settings field'})
        return
    }

    try{
        //update settings if entered
        if(typeof update.settings.store_messages == 'boolean'){
            const beforeData = await pool.query(`SELECT store_messages FROM settings WHERE address = '${address}'`)
            if(beforeData.rowCount == 1) updated.updated['store_messages'] = {before: beforeData.rows[0]['store_messages']}

            const updatedData = await pool.query(`UPDATE settings SET store_messages = ${update.settings.store_messages} WHERE address = '${address}'`)
            if(updatedData.rowCount == 1) {
                updated.updated['store_messages'].after = update.settings.store_messages
            }
        }else{
            res.status(400).json({'error':'make sure your types are correct'})
            return
        }

        //update profile
        const beforeData = await pool.query(`SELECT ${update.bio ? `bio` : ''}${update.profile_picture ? `, profile_picture` : ''}${update.username ? `, username` : ''}${update.public_key ? `, public_key` : ''} FROM profile WHERE address = '${address}'`)
        Object.keys(beforeData.rows[0]).forEach((v,i)=>{
            updated.updated[v] = {before: beforeData.rows[0][v]}
        })


        const updatedData = await pool.query(`UPDATE profile SET ${update.bio ? `bio = '${update.bio}' ` : ''}${update.profile_picture ? `, profile_picture = '${update.profile_picture}' ` : ''}${update.username ? `, username = '${update.username}'` : ''}${update.public_key ? `, public_key = '${update.public_key}'` : ''} WHERE address = '${address}'`)
        if(updatedData.rowCount == 1){
            Object.keys(updated.updated).forEach((v,i)=>{
                if(v != 'store_messages') updated.updated[v].after = update[v]
            })
        }
        
        res.status(200).json(updated)
    }catch(err){
        console.log(err)
        req.error = {status:500, msg:'there was an error updating your profile'}
        next()
    }
}   


module.exports = updateSettings;