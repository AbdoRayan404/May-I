const express = require('express');

//Variables
const app = express();

// microservice configurations
app.use(express.json());

// imports
const logger = require('./middlewares/loggers/reqLogger');
const miscCheck = require('./middlewares/handlers/inputCheck')
const errHandle = require('./middlewares/handlers/errHandler');
const rateLimiter = require('./middlewares/handlers/rateLimiter');
const record = require('./routes/record');
const userRouter = require('./routes/user');

//config
const { PORT } = require('./config/env');

//routes
app.use(logger)
app.use(miscCheck)
app.get('/api/record/:address', rateLimiter, record)
app.use('/api/', rateLimiter, userRouter)
app.use(errHandle)

let port = PORT || 3000;

app.listen(port, ()=> console.log(`Server is up and running at port ${port}`))