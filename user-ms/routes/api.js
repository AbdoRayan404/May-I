const { v4:uuidv4 } = require('uuid');
const pool = require('../Model/database')

async function public_key_record(req, res, next){
    let query = {
        method: 'SELECT',
        coulmns: 'username, public_key',
        table: 'users',
        limit: '100'
    }

    const record = await pool.query(`${query.method} ${query.coulmns} FROM ${query.table} LIMIT ${query.limit}`)

    try{
        res.status(200).json(record.rows)

        next(query)
    }catch(err){
        next({
            method: 'error',
            status: 500,
            msg: 'there was error reteriving the data.'
        })
    }
}

async function register(req, res, next){
    let {username, password, public_key} = req.body;
    let uuid = uuidv4();

    //INPUT CHECK
    if(!username.match(/^[A-z]{4,36}$/g)) next({
        method: 'error',
        status: 401,
        msg:'username should be between 4-36 A-Z'
    })

    if(!password.match(/^.{8,32}$/gi)) next({
        method: 'error',
        status: 401,
        msg: 'password should be between 8-32'
    })

    if(public_key.length > 145) next({
        method: 'error',
        status: 401,
        msg: 'public key cannot be more than 145 chars'
    })

    //database insertion
    let query = {
        method: 'INSERT',
        table: 'users',
        coulmns: `username, password, UUID, public_key`,
        values: `'${username}', '${password}', '${uuid}', '${public_key}'`
    }

    const registerData = await pool.query(`${query.method} INTO ${query.table}(${query.coulmns}) VALUES(${query.values})`)

    try{
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

    const userData = await pool.query(`${query.method} ${query.coulmns} FROM ${query.table} WHERE ${query.conditionKey} = ${query.conditionValue}`)

    try{
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

module.exports = {
    public_record : public_key_record,
    register: register,
    login: login
}