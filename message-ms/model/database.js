const Pool = require('pg').Pool;

//exports
const {USER, DATABASE, HOST, DBPORT, PASSWORD} = require('../config/env');


//Database connection configurations
const pool = new Pool({
    user: USER,
    host: HOST,
    database: DATABASE,
    //password: PASSWORD,
    port: DBPORT,
})

module.exports = pool;