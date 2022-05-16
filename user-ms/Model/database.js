const Pool = require('pg').Pool;

//Database connection configuration
const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    //password: process.env.PASSWORD, //uncomment if you have password in your database
    port: Number.parseInt(process.env.PORT)
})