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

const a = ('/api/register', (req,res)=>{
    let {username, password, public_key} = req.body;
    let uuid = uuidv4();

    //INPUT CHECK
    if(username.length > 36 || username.length < 4){
        res.status(401).json({'error':'username is too short or too long'})
        return
    }
    if(password.length > 32 || password.length < 8){
        res.status(401).json({'error':'password is too short or too long.'})
        return
    }
    if(!public_key){
        res.status(401).json({'error':'you should provide a public_key'})
        return
    }

    pool.query(`INSERT INTO users(username, password, UUID, public_key) VALUES('${username}', '${password}', '${uuid}', '${public_key}')`, (err, data)=>{
        if(err){
            res.status(401).json({'error':err.detail})
        }
        else{
            pool.query(`SELECT username, public_key FROM users WHERE username = '${username}'`, (error, saved)=>{
                if(error){
                    console.log(error)
                    res.status(500).json({'error':"your data was inserted but couldn't reterive it."})
                }else{
                    res.status(200).json(saved.rows)
                }
            })
        }
    })
})

const e = ('/api/login', (req, res)=>{
    let {username, password} = req.body;

    pool.query(`SELECT password = '${password}', username, public_key FROM users WHERE username = '${username}'`, (err, data)=>{
        if(err){
            res.status(401).json({'error': err.detail})
        }else{
            //if password is wrong
            if(data.rows[0]['?column?'] == false){
                res.status(401).json({'unauthorized': 'password is wrong.'})
            }else{
                res.status(200).json({'username': data.rows[0]['username'], 'public_key': data.rows[0]['public_key']})
            }
        }
    })
})

module.exports = {
    public_record : public_key_record
}