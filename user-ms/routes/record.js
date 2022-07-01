const pool = require('../model/database');

async function public_key_record(req, res, next){
    let query = {
        method: 'SELECT',
        coulmns: 'address, public_key',
        table: 'users',
        address: req.params.address
    }

    try{
        const record = await pool.query(`${query.method} ${query.coulmns} FROM ${query.table} WHERE address = '${query.address}'`)
        if(record.rowCount == 1){
            res.status(200).json(record.rows[0])
        }else{
            res.status(400).json({ error: 'this address doesnt exist'})
        }
        
    }catch(err){
        console.error(err)
        req.error = {status:500, msg:'there was an error reteriving the data'}
        next()
    }
}

module.exports = public_key_record