const {User} = require('../models/models')
const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const MailService = require('./mail-service.js')
const TokenService = require('./token-service')

class UserService {
    async isUsernameValid(username, next) {
        const isUsernameTaken = await User.findOne({where: {username}})
        if (isUsernameTaken) {
            return next(ApiError.validation("UsernameTaken"))
        } else return true
    }

    async isEmailValid(email, next){
        const isUserExist = await User.findOne({where: {email}})
        if (isUserExist) {
            return next(ApiError.validation("UserAlreadyExist"))
        } else return true
    }

    async registration (username, email, password, role = 'USER', next) {
        if (await this.isEmailValid(email, next) && await this.isUsernameValid(username)) {
            const hashPassword = await bcrypt.hash(password, 5)
            const activationLink = uuid.v4()
            await MailService.sendActivationMail(email, `http://localhost:5000/api/user/activate/${activationLink}`)
            const user = await  User.create({username, email, password: hashPassword, activationLink})
            const tokens = TokenService.generateTokens({username, email, role})
            await TokenService.saveToken(user.id, tokens.refreshToken)

            return {...tokens, user}

        }
    }
}

module.exports = new UserService()