const express = require('express');

//Variables
const app = express();

// microservice configurations
app.use(express.json());

// exports
const {logger, dbLogger, errHandle} = require('./routes/middlewares');
const {public_record, register, login} = require('./routes/api')

//routes
app.use(logger)
app.use('/api/record', public_record, dbLogger)
app.use('/api/register', register, dbLogger)
app.use('/api/login', login, dbLogger)
app.use(errHandle)


app.listen(3000)