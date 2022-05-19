const express = require('express');
const router = express.Router();

const {login, register, update} = require('../controllers/user');
const inputCheck = require('../middlewares/handlers/inputHandler');

router
    .post('/login', login)
    .post('/register', inputCheck, register)
    .put('/update', update)

module.exports = router