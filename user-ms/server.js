const Pool = require('pg').Pool;
const express = require('express');

//Variables
const app = express();
const { v4:uuidv4 } = require('uuid');

// microservice configurations
app.use(express.json());
require('dotenv').config();

//Database connection configuration
const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    //password: process.env.PASSWORD, //uncomment if you have password in your database
    port: Number.parseInt(process.env.PORT)
})


app.get('/api/record', (req,res)=>{
    pool.query('SELECT username, public_key FROM users', (err, data)=>{
        if(err){
            console.log(err)
            res.json({'error':err.detail})
        }else{
            res.status(200).json(data.rows)
        }
    })
})

app.post('/api/register', (req,res)=>{
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


app.listen(3000)