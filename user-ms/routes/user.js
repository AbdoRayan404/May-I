const express = require('express');
const router = express.Router();

const {login, register, updatePubKey, updateSettings, getUserMessages} = require('../controllers/user');
const inputCheck = require('../middlewares/handlers/inputHandler');

router
    .post('/login', login)
    .post('/register', inputCheck, register)
    .put('/update/pubkey', updatePubKey)
    .put('/update/settings', updateSettings)
    .post('/user/messages', getUserMessages)

module.exports = router