const express = require('express');
const router = express.Router();
const pool = require('../Model/database');

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

        next(query)
    }catch(err){
        next({
            method: 'error',
            status: 500,
            msg: 'there was error reteriving the data.'
        })
    }
}

router
    .get('/:address', public_key_record)

module.exports = router