'use strict';

const express = require('express');
const router = express.Router();
const {body} = require('express-validator')

router.post(
    '/register', 
    body('username').isAlphanumeric(),
    body('email').isEmail().normalizeEmail(),

    (req, res) => {

})

router.post(
    '/token',
    (req,res) => {

    })

    
module.exports = router;