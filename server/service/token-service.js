const jwt = require('jsonwebtoken')
const {Token, User} = require('../models/models')
const ApiError = require("../error/ApiError");

class TokenService {
    generateAccessToken(payload) {
        return  jwt.sign(payload, process.env.JWT_ACCESS_KEY, {
            expiresIn: '1m',
        })
    }

    generateRefreshToken(payload) {
        return jwt.sign(payload, process.env.JWT_REFRESH_KEY, {
            expiresIn: '15d'
        })
    }

    generateTokens(payload) {
        return {
            accessToken: this.generateAccessToken(payload),
            refreshToken: this.generateRefreshToken(payload)
        }
    }

    async saveToken(userId, refreshToken, prev) {
        if (prev) {
            const candidate = await Token.findOne({where: {userId, refreshToken: prev}})
            if (candidate) {
                candidate.refreshToken = refreshToken
                return await candidate.save()
            }
        }
        return await Token.create({userId, refreshToken})
    }

    async deleteRefreshToken(refreshToken) {
        await Token.destroy({where: {refreshToken}})
    }

    validateAccessToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_ACCESS_KEY)
        } catch (e) {
            throw ApiError.unauthorized("invalidToken", "Access token не прошел проверку")
        }
    }

    validateRefreshToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_REFRESH_KEY)
        } catch (e) {
            throw ApiError.unauthorized("invalidToken", "Refresh token не прошел проверку")
        }
    }

    async findToken(refreshToken) {
        return await Token.findOne({where: {refreshToken}})
    }
}

module.exports = new TokenService()
