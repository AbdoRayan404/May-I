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

        res.status(200).json(record.rows[0])
    }catch(err){
        console.error(err)
        req.error = {status:500, msg:'there was an error reteriving the data'}
        next()
    }
}

module.exports = public_key_record