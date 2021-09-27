const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const pathToKey = path.join(__dirname, '../','cert/access_token_priv.pem')
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');
const pathToRefreshKey = path.join(__dirname, '../','cert/refresh_token_priv.pem')
const PRIV_KEY_REFRESH = fs.readFileSync(pathToRefreshKey, 'utf8');
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


const issueRefreshToken = (user) => {
    const id = user.id, expiredIn = '7d';
    const payload = {
        iss: ISSUER,
        sub: id,
        iat: Date.now(),
    };

    return jwt.sign(payload, PRIV_KEY_REFRESH, {expiresIn: expiredIn, algorithm: 'RS256'});
}

module.exports = {issueJWT,issueRefreshToken};
