const express = require('express');
const router = express.Router();

let register = require('../controllers/user/register')
let login = require('../controllers/user/login')
let updatePubKey = require('../controllers/user/update')
let updateSettings = require('../controllers/user/updateSettings')
let getUserMessages = require('../controllers/user/userMessages')

//middlewares
let inputCheck = require('../middlewares/handlers/inputHandler');
let credVerify = require('../middlewares/handlers/credVerify')

router
    .post('/register', inputCheck, register)
    .post('/login', credVerify, login)
    .post('/user/messages', credVerify, getUserMessages)
    .put('/update/pubkey', credVerify, updatePubKey)
    .put('/update/settings', credVerify, updateSettings)

module.exports = router