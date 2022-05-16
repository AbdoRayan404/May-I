const express = require('express');
const router = express.Router();
const pool = require('../Model/database');

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

router
    .get('/', public_key_record)

module.exports = router