const Pool = require('pg').Pool;
const {user, host, database, password, port} = require('../config/env');

//Database connection configuration
const pool = new Pool({
    user: user,
    host: host,
    database: database,
    //password: password, //uncomment if you have password in your database
    port: Number.parseInt(port)
})

module.exports = pool