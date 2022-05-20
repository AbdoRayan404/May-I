const Pool = require('pg').Pool;
const {USER, HOST, DATABASE, PASSWORD, DBPORT} = require('../config/env');

//Database connection configuration
const pool = new Pool({
    user: USER,
    host: HOST,
    database: DATABASE,
    //password: PASSWORD, //uncomment if you have password in your database
    port: Number.parseInt(DBPORT)
})

module.exports = pool