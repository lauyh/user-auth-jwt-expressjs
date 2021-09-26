'use strict';

// -------------- import module -----------------
const express = require('express');
const router = express.Router();
const {body, validationResult} = require('express-validator');
const {v4:uuid} = require('uuid');
// const {controller} = require('../../lib/controller');
const {db} = require('../../lib/sequelize');
const {User} = require('../../models/User');
const {generate,compare} = require('../../lib/pwdHelper');
const {issueJWT, issueRefreshToken} = require('../../lib/jwtHelper');


//---------------- route -----------------
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
            return res.status(500).json({error: '500', message:'Error in register user.'})
        }
});

router.post(
    '/login',
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({min: 6}),
    async (req,res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({error: errors.array()})
        }
        try {
            const {email, password} = req.body;
            let user = await User.findOne({where : {email:email}});
            if(user) {
                const validatePwd = compare(password, user.password);
                if(validatePwd) {
                    const accessToken = issueJWT(user);
                    const refreshToken = issueRefreshToken(user);
                    // to do store the refresh token in redis
                    
                    return res.status(200).json({ error:'', message: 'Access granted', accessToken: accessToken, refreshToken: refreshToken });
                }else {
                    return res.status(400).json({error: '400', message:'Invalid password'});
                }
            }else {
                return res.status(403).json({error: '403', message:'User not found'}); 
            }
        } catch (error) {
            console.log(`[ERR]\tAn error occurred at route - '/login': ${error.message}`);
            return res.status(500).json({error:'500', message:'Fail to login the user'})
        }
});


router.post(
    '/token',
    body('token'),
    async (req, res) => {
        const error = validationResult(req);
        if(!error.isEmpty()) {
            return res.status(400).json({error: error.array()});
        }
        try {
            const refreshToken = req.body.token;
            if(!refreshToken){return res.status(401).json({error:'401', message: 'Unauthorized'});}

        } catch (error) {
            console.log(`[ERR]\tAn error occurred in `)
        }
    })

module.exports = router;