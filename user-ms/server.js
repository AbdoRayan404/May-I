const express = require('express');

//Variables
const app = express();

// microservice configurations
app.use(express.json());

// exports
const logger = require('./middlewares/loggers/reqLogger');
const miscCheck = require('./middlewares/handlers/inputCheck')
const dbLogger = require('./middlewares/loggers/databaseLogger');
const errHandle = require('./middlewares/handlers/errHandler');
const rateLimiter = require('./middlewares/handlers/rateLimiter');
const recordRouter = require('./routes/record');
const userRouter = require('./routes/user');
const { PORT } = require('./config/env');

//routes
app.use(logger)
app.use(miscCheck)
app.use('/api/record', rateLimiter, recordRouter, dbLogger)
app.use('/api/', rateLimiter, userRouter, dbLogger)
app.use(errHandle)

let port = PORT || 3000;

app.listen(port, ()=> console.log(`Server is up and running at port ${port}`))