const Pool = require('pg').Pool;

//env imports
const {POSTGRES_USER, POSTGRES_HOST, POSTGRES_DATABASE_NAME, POSTGRES_PASSWORD, POSTGRES_PORT} = require('../config/env');


//Database connection configurations
const pool = new Pool({
    user: POSTGRES_USER,
    host: POSTGRES_HOST,
    database: POSTGRES_DATABASE_NAME,
    password: POSTGRES_PASSWORD,
    port: POSTGRES_PORT,
    ssl: {rejectUnauthorized: false}
})

module.exports = pool;