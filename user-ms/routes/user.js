const express = require('express');
const router = express.Router();

const {login, register, update} = require('../controllers/user');


router
    .post('/login', login)
    .post('/register', register)
    .put('/update', update)

module.exports = router