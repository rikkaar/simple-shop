const jwt = require('jsonwebtoken')
const {Token, User} = require('../models/models')

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_KEY, {
            expiresIn: '1m',
        })
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_KEY, {
            expiresIn: '15d'
        })

        return {
            accessToken,
            refreshToken
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


}

module.exports = new TokenService()