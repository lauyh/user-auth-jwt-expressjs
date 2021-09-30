'use strict';

// -------------- import module -----------------
const express = require('express');
const router = express.Router();
const {body, validationResult} = require('express-validator');
const {v4:uuid} = require('uuid');
const {db} = require('../../lib/sequelize');
const {User} = require('../models/User');
const {generate,compare} = require('../../lib/pwdHelper');
const {issueJWT, issueRefreshToken} = require('../../lib/jwtHelper');
require('dotenv').config({path: require('find-config')('.env')})
const RefreshToken = require('../models/RefreshToken');




//---------------- route -----------------
/**
 * Register user
 * @param {string} - username - name of the user
 * @param {string} - password - password of the user
 * @param {string} - email - email of the user
 * @returns {json} - status of registration
 */
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
                console.log('[INFO]\tcreating user')
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


/**
 * User login
 * @param {string} email
 * @param {string} password
 * @return {json} return access token and refresh token
 */
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
            if(user && user.dataValues.status === 'active') {
                const validatePwd = compare(password, user.dataValues.hash);
                console.log(validatePwd)
                if(validatePwd) {
                    const accessToken = issueJWT(user.dataValues);
                    // todo: store the accessToken to redis - set to 15s for testing purpose
                    const refreshToken = issueRefreshToken(user.dataValues);
                    const refreshTokenCollection = new RefreshToken({
                        userId: user.dataValues.id,
                        refreshToken: refreshToken
                    });
                    refreshTokenCollection.save()
                        .then(()=> {console.log('refresh token save')})
                        .catch((err)=>{console.log(`Err in insert the refresh token: ${err}`)});
                    // await redis_client.setex(`user-${user.dataValues.id}`, REFRESH_EXPIRE_TIMEOUT, refreshToken);

                    return res.status(200).json({ error:'', message: 'Access granted', accessToken: accessToken, refreshToken: refreshToken });
                }else {
                    return res.status(400).json({error: '400', message:'Invalid password'});
                }
            }else {
                return res.status(403).json({error: '403', message:'User not found'}); 
            }
        } catch (error) {
            console.log(`[ERR]\tAn error occurred at route - '/login': ${error}`);
            return res.status(500).json({error:'500', message:'Fail to login the user'})
        }
});


/**
 * Fetch new access tokens 
 * @param {string} - refreshToken 
 * @returns {json} - return access token
 */
router.post(
    '/token',
    body('token').isJWT(),
    async (req, res) => {
        const error = validationResult(req);
        if(!error.isEmpty()) {
            return res.status(400).json({error: error.array()});
        }
        try {
            const refreshToken = req.body.token;
            const grantType = req.body.grant_type;
            if(grantType !== "jwt-bearer") return res.status(401).json({error:'404', message: 'Invalid grant type'});
            
            const token = await RefreshToken.findOne({refreshToken: refreshToken});
            if(!refreshToken || !token) {return res.status(401).json({error:'401', message: 'Unauthorized'});}

        } catch (error) {
            console.log(`[ERR]\tAn error occurred in `)
        }
    })

module.exports = router;