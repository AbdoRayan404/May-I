const Pool = require('pg').Pool;
const {USER, HOST, DATABASE, PASSWORD, DBPORT} = require('../config/env');

//Database connection configuration
const pool = new Pool({
    user: USER,
    host: HOST,
    database: DATABASE,
    password: PASSWORD,
    port: Number.parseInt(DBPORT)
})

module.exports = pool