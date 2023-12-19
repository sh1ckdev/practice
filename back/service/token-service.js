const jwt = require('jsonwebtoken');
const TokenModel = require('../models/token-model');

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
        return {
            accessToken,
            refreshToken
        };
    }

    validateAccessToken(token){
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
            return userData
        } catch (e) {
            return null
        }
    }

    validateRefreshToken(token){
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
            return userData
        } catch (e) {
            return null
        }
    }


    async saveToken(userId, refreshToken) {
        try {
            let tokenData = await TokenModel.findOne({ user: userId });

            if (tokenData) {
                tokenData.refreshToken = refreshToken;
                await tokenData.save();
            } else {
                tokenData = await TokenModel.create({ user: userId, refreshToken });
            }

            return tokenData;
        } catch (error) {
            console.error('Error saving token:', error);
            throw error;
        }
    }
    async removeToken(refreshToken) {
        try {
            const tokenData = await TokenModel.deleteOne({ refreshToken });
            return tokenData;
        } catch (error) {
            console.error('Error removing token:', error);
            throw error;
        }
    }
    async findToken(refreshToken) {
        try {
            const tokenData = await TokenModel.findOne({ refreshToken });
            return tokenData;
        } catch (error) {
            console.error('Error removing token:', error);
            throw error;
        }
    }
}

module.exports = new TokenService();
