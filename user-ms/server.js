const Pool = require('pg').Pool;
const express = require('express');

//Variables
const app = express();
const { v4:uuidv4 } = require('uuid');

// microservice configurations
app.use(express.json());
require('dotenv').config();

//Database connection configuration
const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    //password: process.env.PASSWORD, //uncomment if you have password in your database
    port: Number.parseInt(process.env.PORT)
})



app.listen(3000)