const Pool = require('pg').Pool;
const {DBUSER, HOST, DATABASE, PASSWORD, DBPORT} = require('../config/env');

//Database connection configuration
const pool = new Pool({
    user: DBUSER,
    host: HOST,
    database: DATABASE,
    password: PASSWORD,
    port: Number.parseInt(DBPORT),
    ssl: {rejectUnauthorized: false}
})

module.exports = pool