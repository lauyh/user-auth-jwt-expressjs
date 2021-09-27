const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

// ------------------------------ Priv Key ----------------------------------
const pathToKey = path.join(__dirname, '../','cert/access_token_priv.pem')
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');
const pathToRefreshKey = path.join(__dirname, '../','cert/refresh_token_priv.pem')
const PRIV_KEY_REFRESH = fs.readFileSync(pathToRefreshKey, 'utf8');

//------------------------------ Public Key --------------------------------
const pathToCert = path.join(__dirname, '../','cert/access_token_pub.pem')
const ACCESS_CERT = fs.readFileSync(pathToCert, 'utf8');
const pathToRefreshCert = path.join(__dirname, '../','cert/refresh_token_pub.pem')
const REFRESH_CERT = fs.readFileSync(pathToRefreshCert, 'utf8');

// ------------------------------ Issuer -------------------------
const ISSUER = 'ecomm-inhouse.net'

const issueJWT = (user) => {
    const id = user.id, expiredIn = '15s';
    const payload = {
        iss: ISSUER,
        sub: id,
        iat: Date.now(),
    };

    return jwt.sign(payload, PRIV_KEY, {expiresIn: expiredIn, algorithm: 'RS256'});
}

const verifyAccessToken = (accessToken) => {
    let response = {status: 'err', message: 'Fail to verify access token'}
    jwt.verify(accessToken, ACCESS_CERT, (err, decoded)=>{
        if(err){return response}else{return {status: 'ok', message: decoded}}
        
    })
}

const issueRefreshToken = (user) => {
    const id = user.id, expiredIn = '7d';
    const payload = {
        iss: ISSUER,
        sub: id,
        iat: Date.now(),
    };

    return jwt.sign(payload, PRIV_KEY_REFRESH, {expiresIn: expiredIn, algorithm: 'RS256'});
}

const verifyRefreshToken = (refreshToken) => {
    let response = {status: 'err', message: 'Fail to verify refresh token'}
    jwt.verify(refreshToken, REFRESH_CERT, (err, decoded)=>{
        if(err){return response}else{return {status: 'ok', message: decoded}}
        
    })
}
module.exports = {issueJWT,verifyAccessToken,issueRefreshToken,verifyRefreshToken};
