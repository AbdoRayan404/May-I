const bcrypt = require('bcrypt');

//postgreSQL pool
const pool = require('../../model/database')

//config imports
let { SALT } = require('../../config/env')

async function register(req, res, next){
    let {username, password, public_key} = req.body;

    //hashing
    let bcryptsalt = await bcrypt.genSalt(Number.parseInt(SALT))
    password = await bcrypt.hash(password, bcryptsalt)

    //creating address
    initalNumber = Math.floor(Math.random() * 9999) + 1000;
    address = Number.parseInt(initalNumber).toString(16)
    address = `0x${address}`

    try{
        const profileData = await pool.query(`INSERT INTO profile(address, username, password, public_key, salt, joined_at, profile_picture) VALUES('${address}', '${username}', '${password}', '${public_key}', '${bcryptsalt}', '${new Date().toDateString()}', 'https://i.imgur.com/wvic0Uy.jpeg')`)
        
        if(profileData.rowCount == 1){ //inserting profile was successful
            const settingsData = await pool.query(`INSERT INTO settings(address, store_messages) VALUES('${address}', FALSE)`)
            
            if(settingsData.rowCount == 1){ //inserting settings was sucessful
                res.status(200).json({'address':address, 'username': username, 'public_key': public_key})
            }
        }
    }catch(err){
        console.error(err)
        req.error = {status:500, msg:'there was error saving your data'}
        next()
    }
}

module.exports = register;