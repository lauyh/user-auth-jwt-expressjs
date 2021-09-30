const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const refreshTokenSchema = Schema({
    userId: String,
    refreshToken: String,
    expireAt: {
        type: Date,
        default: Date.now,
        index: {expires: '5m'}
    }
})

const RefreshToken = mongoose.model('RefreshToken', refreshTokenSchema);

module.exports = RefreshToken;