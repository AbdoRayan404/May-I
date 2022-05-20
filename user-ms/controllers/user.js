const pool = require('../Model/database')
const { v4:uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

//config imports
let { SALT } = require('../config/env')

async function register(req, res, next){
    let {username, password, public_key} = req.body;
    let uuid = uuidv4();

    //hashing
    SALT = await bcrypt.genSalt(Number.parseInt(SALT))
    password = await bcrypt.hash(password, SALT)

    //database insertion
    let query = {
        method: 'INSERT',
        table: 'users',
        coulmns: `username, password, UUID, public_key, SALT`,
        values: `'${username}', '${password}', '${uuid}', '${public_key}', '${SALT}'`
    }

    try{
        const registerData = await pool.query(`${query.method} INTO ${query.table}(${query.coulmns}) VALUES(${query.values})`)

        res.status(200).json({'username': username, 'public_key': public_key})
        
        next(query)
    }catch(err){
        next({
            method: 'error',
            status: 500,
            msg: 'there was error saving your data.'
        })
    }
}

async function login(req, res, next){
    let {username, password} = req.body;

    try{
        const userSalt = await pool.query(`SELECT salt FROM users WHERE username = '${username}'`)
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
        coulmns: `password = '${password}', username, public_key`,
        table: 'users',
        condition: 'WHERE',
        conditionKey: 'username',
        conditionValue: `'${username}'`
    }

    try{
        const userData = await pool.query(`${query.method} ${query.coulmns} FROM ${query.table} WHERE ${query.conditionKey} = ${query.conditionValue}`)

        if(userData.rows[0]['?column?'] == false){
            next({
                method: 'error',
                status: 401,
                msg: 'password is incorrect'
            })
        }else{
            res.status(200).json({'username': userData.rows[0]['username'], 'public_key': userData.rows[0]['public_key']})
        
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

async function update(req, res, next){
    let {username, password, public_key} = req.body;

    let query = {
        method: "UPDATE",
        table: "users",
        coulmn: 'public_key',
        coulmnValue: public_key,
        conditionUsername: `username = '${username}'`,
        conditionPassword: `password = '${password}'`
    }

    try{
        const updatedData = await pool.query(`${query.method} ${query.table} SET ${query.coulmn} = '${query.coulmnValue}' WHERE ${query.conditionUsername} AND ${query.conditionPassword}`)
        
        res.json({'username': username, 'public_key': public_key})

        next(query)
    }catch(err){
        next({
            method: 'error',
            status: 500,
            msg: 'there was error reteriving your data.'
        })
    }
}

module.exports = {
    register: register,
    login: login,
    update: update
}