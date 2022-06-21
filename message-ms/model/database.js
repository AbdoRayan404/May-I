const Pool = require('pg').Pool;

//exports
const {DBUSER, DATABASE, HOST, DBPORT, PASSWORD} = require('../config/env');


//Database connection configurations
const pool = new Pool({
    user: DBUSER,
    host: HOST,
    database: DATABASE,
    password: PASSWORD,
    port: DBPORT,
    ssl: {rejectUnauthorized: false}
})

module.exports = pool;