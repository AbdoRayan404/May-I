const express = require('express');

//Variables
const app = express();

// microservice configurations
app.use(express.json());

// exports
const logger = require('./middlewares/loggers/reqLogger')
const dbLogger = require('./middlewares/loggers/databaseLogger')
const errHandle = require('./middlewares/handlers/errHandler')
const recordRouter = require('./routes/record')
const userRouter = require('./routes/user');

//routes
app.use(logger)
app.use('/api/record', recordRouter, dbLogger)
app.use('/api/register', userRouter, dbLogger)
app.use('/api/login', userRouter, dbLogger)
app.use(errHandle)


app.listen(3000)