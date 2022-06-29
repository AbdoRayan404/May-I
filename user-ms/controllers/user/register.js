const { v4:uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

//postgreSQL pool
const pool = require('../../model/database')

//config imports
let { SALT } = require('../../config/env')

async function register(req, res, next){
    let {username, password, public_key} = req.body;
    let uuid = uuidv4();

    //hashing
    let bcryptsalt = await bcrypt.genSalt(Number.parseInt(SALT))
    password = await bcrypt.hash(password, bcryptsalt)

    //creating address
    initalNumber = Math.floor(Math.random() * 9999) + 1000;
    address = Number.parseInt(initalNumber).toString(16)
    address = `0x${address}`

    //database insertion
    let query = {
        method: 'INSERT',
        table: 'users',
        columns: `address, username, password, UUID, store_messages, public_key, salt`,
        values: `'${address}', '${username}', '${password}', '${uuid}', FALSE, '${public_key}', '${bcryptsalt}'`
    }

    try{
        const registerData = await pool.query(`${query.method} INTO ${query.table}(${query.columns}) VALUES(${query.values})`)
        
        if(registerData.rowCount == 1){ //if inserting was successful
            res.status(200).json({'address':address, 'username': username, 'public_key': public_key})
        }
    }catch(err){
        console.error(err)
        req.error = {status:500, msg:'there was error saving your data'}
        next()
    }
}

module.exports = register;