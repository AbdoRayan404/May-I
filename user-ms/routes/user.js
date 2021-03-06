const express = require('express');
const router = express.Router();

let register = require('../controllers/user/register')
let login = require('../controllers/user/login')
let inspect = require('../controllers/user/inspect')
let getUserMessages = require('../controllers/user/userMessages')
let updateSettings = require('../controllers/user/update.js')


//middlewares
let inputCheck = require('../middlewares/handlers/inputHandler');
let credVerify = require('../middlewares/handlers/credVerify')

router
    .post('/register', inputCheck, register)
    .post('/login', credVerify, login)
    .get('/user/inspect/:address', inspect)
    .post('/user/messages', credVerify, getUserMessages)
    .put('/user/settings', credVerify, updateSettings)

module.exports = router