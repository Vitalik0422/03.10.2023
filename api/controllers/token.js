const webToken = require('jsonwebtoken');
const createError = require('http-errors')

const tokenModel = require('../models/token');

ACCESS_SECRET_KEY = 'my-first-jwt-auth'
REFRESH_SECRET_KEY = 'my-first-jwt-auth'


// const createToken = (payload) => {
//     const accessToken = webToken.sign(payload, ACCESS_SECRET_KEY, { expiresIn: '15m' })
//     const refreshToken = webToken.sign(payload, REFRESH_SECRET_KEY, { expiresIn: '30d' })
//     return {
//         accessToken,
//         refreshToken
//     };
// };

const saveToken = async (payload) => {
    const accessToken = webToken.sign(payload, ACCESS_SECRET_KEY, { expiresIn: '30s' })
    const refreshToken = webToken.sign(payload, REFRESH_SECRET_KEY, { expiresIn: '30d' })
    const checkTokenData = await tokenModel.findOneToken(payload.userId)
    console.log(checkTokenData);
    if (checkTokenData) {
        console.log(payload.userId);
        tokenModel.updateOne(payload.userId, refreshToken)
        return {
            accessToken,
            refreshToken
        };
    }
    const token = tokenModel.RegUser(payload.userId, refreshToken)
    return {
        accessToken,
        refreshToken
    };
}

const removeToken = async (refreshToken) => {
    const tokenInfo = await tokenModel.deleteOne(refreshToken)
    return tokenInfo
}

const findToken = async (refreshToken) => {
    const tokenInfo = await tokenModel.findOneToken(refreshToken)
    return tokenInfo
}

const validateAccessToken = (token) => {

    try {
        const userData = webToken.verify(token, ACCESS_SECRET_KEY)
        return userData
    } catch (error) {
        return null;
    }
}

const validateRefreshToken = (token) => {
    try {
        const userData = webToken.verify(token, REFRESH_SECRET_KEY)
        return userData
    } catch (error) {
        return null;
    }
}



module.exports = {
    saveToken,
    removeToken,
    validateAccessToken,
    validateRefreshToken,
    findToken
};