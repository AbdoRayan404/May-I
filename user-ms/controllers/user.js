const pool = require('../Model/database')
const { v4:uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

//config imports
let { salt } = require('../config/env')

async function register(req, res, next){
    let {username, password, public_key} = req.body;
    let uuid = uuidv4();

    //hashing
    salt = await bcrypt.genSalt(Number.parseInt(salt))
    password = await bcrypt.hash(password, salt)

    //database insertion
    let query = {
        method: 'INSERT',
        table: 'users',
        coulmns: `username, password, UUID, public_key, salt`,
        values: `'${username}', '${password}', '${uuid}', '${public_key}', '${salt}'`
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

        if(userData.rows[0]['?coulmn?'] == false){
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