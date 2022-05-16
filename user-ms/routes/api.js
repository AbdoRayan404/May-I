const { v4:uuidv4 } = require('uuid');

async function public_key_record (req, res, next){



    pool.query('SELECT username, public_key FROM users', (err, data)=>{
        if(err){
            console.log(err)
            res.json({'error':err.detail})
        }else{
            res.status(200).json(data.rows)
        }
    })
}

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

app.post('/api/login', (req, res)=>{
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