const pool = require('../../model/database')

async function inspect(req, res, next){
    let address = req.params.address;

    try{
        const userData = await pool.query(`SELECT address, username, bio, profile_picture, public_key, joined_at FROM profile WHERE address = '${address}'`)

        if(userData.rowCount == 1){
            res.status(200).json(userData.rows[0])
        }else{
            req.error = {status:400, msg:"this address doesn't exist"}
            next()
        }
    }catch(err){
        console.log(err)
        req.error = {status:500, msg:"there was error inspecting the user"}
        next()
    }

}

module.exports = inspect;