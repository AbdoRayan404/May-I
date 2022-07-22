const pool = require('../../model/database')
const {getAllMessages} = require('../../model/mongoController')

async function login(req, res, next){
    let {address} = req.body;

    try{
        const profileData = await pool.query(`SELECT address, username, public_key, bio, profile_picture, joined_at FROM profile WHERE address = '${address}'`)
        
        if(profileData.rowCount == 1){
            let profileDestruct = {...data} = profileData.rows[0]

            const settingsData = await pool.query(`SELECT store_messages FROM settings WHERE address = '${address}'`)
            const contactsData = await pool.query(`SELECT contact_address FROM contacts WHERE address = '${address}'`)

            if(settingsData.rowCount == 1 && contactsData.rowCount >= 1){
                profileDestruct.settings = {
                    store_messages: settingsData.rows[0]['store_messages']
                }

                profileDestruct.contacts = []
                contactsData.rows.forEach((v, i)=>{profileDestruct.contacts.push(v['contact_address'])})

                if(settingsData.rows[0]['store_messages'] == true){
                    profileDestruct.stored_messages = await getAllMessages(address)
                    
                }
                res.status(200).json(profileDestruct)
            }
        }      
    }catch(err){
        console.error(err)
        req.error = {status:500, msg:'there was an error retreving your data'}
        next()
    }
}

module.exports = login;