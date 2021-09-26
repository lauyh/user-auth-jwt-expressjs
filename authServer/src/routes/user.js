'use strict';

// ---------- import module -----------------
const express = require('express');
const router = express.Router();
const {body, validationResult} = require('express-validator');
const {v4:uuid} = require('uuid');
// const {controller} = require('../../lib/controller');
const {db} = require('../../lib/sequelize');
const {User} = require('../../models/User');
const {generate,compare} = require('../../lib/pwdHelper');

//--------- route -----
router.post(
    '/register', 
    body('username').isAlphanumeric(),
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({min: 6}),
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }
        try {
            const {username, email, password} = req.body;
            let user = await User.findOne({where : {email:email}});
            if(!user){
                console.log('creating user')
                const hash = generate(password);
                const userid = uuid();
                console.log('hash', hash);
                console.log('uuid', userid);
                const result = db.transaction(async (t) => {
                    user = await User.create({id: userid,username:username, email: email, hash:hash}, {transaction: t});
                    return user;

                });
                if(result){
                    return res.status(201).json({error: '', message: 'Successfully register user.'});
                }else{
                    // await t.rollback();
                    return res.status(400).json({error: '500', message: 'Fail to register user.'})
                }
            }else{
                return res.status(400).json({error: '403', message: 'User already exist.'})
            }
        } catch (error) {
            console.log(`error occurs when creating user: ${error}`)
            // await t.rollback();
        }
});

router.post(
    '/login',
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({min: 6}),
    async (req,res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }
        try {
            const {email, password} = req.body;
            let user = await User.findOne({where : {email:email}});
            if(user) {
                
            }
        } catch (error) {
            
        }
});


module.exports = router;