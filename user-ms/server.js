const express = require('express');

//Variables
const app = express();

// microservice configurations
app.use(express.json());

// exports
const logger = require('./middlewares/loggers/reqLogger');
const dbLogger = require('./middlewares/loggers/databaseLogger');
const errHandle = require('./middlewares/handlers/errHandler');
const rateLimiter = require('./middlewares/handlers/rateLimiter');
const recordRouter = require('./routes/record');
const userRouter = require('./routes/user');

//routes
app.use(logger)
app.use('/api/record', rateLimiter, recordRouter, dbLogger)
app.use('/api/', rateLimiter, userRouter, dbLogger)
app.use(errHandle)


app.listen(3000)