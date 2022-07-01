const pool = require('../../model/database')
const bcrypt = require('bcrypt');

async function verify(req, res, next){

    //Hash password
    try{
        const salt = await pool.query(`SELECT salt FROM users WHERE address = '${req.body.address}'`)
        if(salt.rowCount == 1){
            req.body.password = await bcrypt.hash(req.body.password, salt.rows[0]['salt'])
        }else{
            res.status(400).json({error:"this address doesnt exist"})
            return
        }
    }catch(err){
        console.error(err)
    }
    
    //Check if hash is correct
    try{
        const hashCheck = await pool.query(`SELECT password = '${req.body.password}' FROM users WHERE address = '${req.body.address}'`)
        if(hashCheck.rowCount == 1){
            if(hashCheck.rows[0]['?column?'] == true){
                next()
            }else if(hashCheck.rows[0]['?column?'] == false){ //password is incorrect
                res.status(400).json({error:"password is incorrect"})
            }
        }else{ //address is not correct
            res.status(400).json({error:"this address doesnt exist"})
        }
    }catch(err){
        console.error(err)
        res.status(500).json({error:"there was an error checking your password"})
    }
}

module.exports = verify