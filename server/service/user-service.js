const {User} = require('../models/models')
const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const MailService = require('./mail-service.js')
const TokenService = require('./token-service')
const { param } = require('express-validator');

class UserService {


    async isUsernameValid(username) {
        const isUsernameTaken = await User.findOne({where: {username}})
        if (isUsernameTaken) {
            throw ApiError.internal("UsernameTaken", "username уже занят")
        } else return true
    }

    async isEmailValid(email) {
        const isUserExist = await User.findOne({where: {email}})
        if (isUserExist) {
            throw ApiError.internal("UserAlreadyExist", "Почта уже использована")
        } else return true
    }

    async activate(activationLink) {
        const user = await User.findOne({where: {activationLink}})
        if (!user) {
            throw ApiError.badRequest("invalidEndPoint", "Некорректная ссылка активации")
        }
        if (!user.isActivated) {
            await user.update({isActivated: true})
        } // если ничего не крашится, значит по валидирующей сслыке прошел пользователь (любой)
    }


    async login(login, password) {
        const user = await User.findOne({where: login})
        if (!user) {
            throw ApiError.badRequest("UserDoesntExist", "Такого пользователя не существует")
        }
        const tokens = TokenService.generateTokens({
            id: user.id,
            user: user.username,
            email: user.email,
            role: user.role
        })
        await TokenService.saveToken(user.id, tokens.refreshToken)

        if (!await bcrypt.compareSync(password, user.password)) {
            throw ApiError.internal("WrongPassword", "Пароль неверен")
        }
        return {...tokens, id: user.id, user: user.username, email: user.email, role: user.role}
    }

    async logout(refreshToken) {
        await TokenService.deleteRefreshToken(refreshToken)
    }

    async registration(username, email, password, role = 'USER') {
        console.log("ERROR")
        if (await this.isEmailValid(email) && await this.isUsernameValid(username)) {
            const hashPassword = await bcrypt.hash(password, 5)
            const user = await User.create({username, email, password: hashPassword})
            await MailService.sendActivationMail(email)

            const tokens = TokenService.generateTokens({id: user.id, username, email, role})
            await TokenService.saveToken(user.id, tokens.refreshToken)

            return {...tokens, id: user.id, user: user.username, email: user.email, role: user.role}
        }
    }

    async refresh(refreshToken) {
        const userData = TokenService.validateRefreshToken(refreshToken)
        const token = await TokenService.findToken(refreshToken)
        if (token) {
            const user = await User.findByPk(userData.id)
            const tokens = TokenService.generateTokens({
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            })
            await TokenService.saveToken(user.id, tokens.refreshToken)
            await TokenService.deleteRefreshToken(token.refreshToken)
            return tokens
        } else {
            throw ApiError.unauthorized("TokenDoesntExist", "Токена нет в бд. Перелогиньтесь")
        }
    }
}

module.exports = new UserService()