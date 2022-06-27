const pool = require('../Model/database')
const { v4:uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

const {addUser, getMessages} = require('../Model/mongoController')

//config imports
let { SALT } = require('../config/env')

async function register(req, res, next){
    let {username, password, public_key} = req.body;
    let uuid = uuidv4();

    //hashing
    SALT = await bcrypt.genSalt(Number.parseInt(SALT))
    password = await bcrypt.hash(password, SALT)

    //address
    initalNumber = Math.floor(Math.random() * 9999) + 1000;
    address = Number.parseInt(initalNumber).toString(16)
    address = `0x${address}`

    //database insertion
    let query = {
        method: 'INSERT',
        table: 'users',
        columns: `address, username, password, UUID, store_messages, public_key, SALT`,
        values: `'${address}', '${username}', '${password}', '${uuid}', FALSE, '${public_key}', '${SALT}'`
    }

    try{
        const registerData = await pool.query(`${query.method} INTO ${query.table}(${query.columns}) VALUES(${query.values})`)

        res.status(200).json({'address':address, 'username': username, 'public_key': public_key})
        
        next(query)
    }catch(err){
        console.log(err)
        next({
            method: 'error',
            status: 500,
            msg: 'there was error saving your data.'
        })
    }
}

async function login(req, res, next){
    let {address, password} = req.body;

    try{
        const userSalt = await pool.query(`SELECT salt FROM users WHERE address = '${address}'`)
        const hashed = await bcrypt.hash(password, userSalt.rows[0]['salt'])
        
        password = hashed
    }catch(error){
        next({
            method: 'error',
            status: 500,
            msg: 'there was error hashing your password.'
        })
    }

    let query = {
        method: 'SELECT',
        columns: `password = '${password}', address, username, public_key`,
        table: 'users',
        condition: 'WHERE',
        conditionKey: 'address',
        conditionValue: `'${address}'`
    }

    try{
        const userData = await pool.query(`${query.method} ${query.columns} FROM ${query.table} WHERE ${query.conditionKey} = ${query.conditionValue}`)

        if(userData.rows[0]['?column?'] == false){
            next({
                method: 'error',
                status: 401,
                msg: 'password is incorrect'
            })
        }else{
            res.status(200).json({'address': userData.rows[0]['address'], 'username': userData.rows[0]['username'], 'public_key': userData.rows[0]['public_key']})
        
            next(query)
        }
    }catch(err){
        next({
            method:'error',
            status: 500,
            msg: 'there was error reteriving your data.'
        })
    }
}

async function updatePubKey(req, res, next){
    let {address, password, public_key} = req.body;
    
    try{
        const userSalt = await pool.query(`SELECT salt FROM users WHERE address = '${address}'`)
        const hashed = await bcrypt.hash(password, userSalt.rows[0]['salt'])
        
        password = hashed
    }catch(error){
        next({
            method: 'error',
            status: 500,
            msg: 'there was error hashing your password.'
        })
    }

    let query = {
        method: "UPDATE",
        table: "users",
        column: 'public_key',
        columnValue: public_key,
        conditionAddress: `address = '${address}'`,
        conditionPassword: `password = '${password}'`
    }

    try{
        const updatedData = await pool.query(`${query.method} ${query.table} SET ${query.column} = '${query.columnValue}' WHERE ${query.conditionAddress} AND ${query.conditionPassword}`)

        res.json({'address': address, 'public_key': public_key})

        next(query)
    }catch(err){
        next({
            method: 'error',
            status: 500,
            msg: 'there was error reteriving your data.'
        })
    }
}

async function updateSettings(req, res, next){
    let {address, password, storeIt} = req.body;
    if(typeof storeIt !== 'boolean') next({method:'error',status:400,msg:'storeIt should be a boolean'})

    try{
        const userSalt = await pool.query(`SELECT salt FROM users WHERE address = '${address}'`)
        const hashed = await bcrypt.hash(password, userSalt.rows[0]['salt'])

        password = hashed
    }catch(err){
        next({
            method: 'error',
            status: 500,
            msg: 'there was an error hashing your password'
        })
    }

    let query = {
        method: 'UPDATE',
        table: 'users',
        column: 'store_messages',
        columnValue: storeIt,
        conditionAddress: `address = '${address}'`,
        conditionPassword: `password = '${password}'`
    }

    try{
        const update = await pool.query(`${query.method} ${query.table} SET ${query.column} = ${query.columnValue} WHERE ${query.conditionAddress} AND ${query.conditionPassword}`)
        

        res.json({address:address, store_messages:storeIt})

        if(storeIt == true){
            await addUser(address);
        }else if(storeIt == false){
            //delete user document from database
        }

        next(query)
    }catch(err){
        console.log(err)
        next({
            method: 'error',
            status: 500,
            msg: 'there was an error upadting your data'
        })
    }
}

async function getUserMessages(req, res, next){
    let {address, password} = req.body;

    try{
        const userSalt = await pool.query(`SELECT salt FROM users WHERE address = '${address}'`)
        const hashed = await bcrypt.hash(password, userSalt.rows[0]['salt'])

        password = hashed
    }catch(err){
        next({
            method: 'error',
            status: 500,
            msg: 'there was an error hashing your password'
        })
    }

    try{
        const user = await pool.query(`SELECT password = '${password}' FROM users WHERE address = '${address}'`);
        
        if(user.rows[0]['?column?'] == true){ //password is correct
            const userMessages = await getMessages(address);

            res.json({address:userMessages.address, outgoing:userMessages.outgoing, incoming:userMessages.incoming})
        }else{
            next({
                method: 'error',
                status: 400,
                msg: 'password is incorrect'
            })
        }
    }catch(err){
        console.log(err)
        next({
            method: 'error',
            status: 500,
            msg: 'there was an error checking your password in DB'
        })
    }
}

module.exports = {
    register: register,
    login: login,
    updatePubKey: updatePubKey,
    updateSettings: updateSettings,
    getUserMessages: getUserMessages
}