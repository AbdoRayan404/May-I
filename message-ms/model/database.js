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

pool.on('connect', (client)=>{
    console.log(`[INFO] connected Successfuly to Database.`)
})

//forcing PG to connect to the Database.
pool.query('SELECT FROM users;')

module.exports = pool;