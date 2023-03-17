const {User, Basket, BasketItems} = require('../models/models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const ApiError = require('../error/ApiError')
const UserService = require('../service/user-service')
const {validationResult, param} = require("express-validator");

const generateJWT = (id, email, role) => {
    return jwt.sign(
        {id: id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'})
}

class UserController {
    async registration(req, res, next) {
        const {email, password, username, role} = req.body
        if (!email || !password) {
            return next(ApiError.badRequest("IncompleteFields"))
        }

        const isUserExist = await User.findOne({where: {email}})
        if (isUserExist) {
            return next(ApiError.badRequest("UserExistAlready"))
        }

        const isUsernameTaken = await User.findOne({where: {username}})
        if (isUsernameTaken) {
            return next(ApiError.badRequest("UsernameTaken"))
        }

        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({username, email, password: hashPassword, role})
        const basket = await Basket.create({userId: user.id})
        const token = generateJWT(user.id, email, role)
        return res.json(token)
    }


    async login(req, res, next) {
        const {email, username, password} = req.body
        const loginField = Object.fromEntries(
            Object.entries({email, username}).filter((key, value) => {
                if (key !== undefined && key[1] !== undefined) {
                    return key[1]
                }
            })
        )
        console.log(loginField)
        const user = await User.findOne({where: loginField})

        let comparePasswords = await bcrypt.compareSync(password, user.password)

        if (!comparePasswords) {
            return next(ApiError.internal("WrongPassword"))
        }

        const token = generateJWT(user.id, user.email, user.role)
        return res.json(token)
    }

    async log(req, res, next) {
        try {
            const {email, username, password} = req.body
            const loginField = Object.fromEntries(
                Object.entries({email, username}).filter((key, value) => {
                    if (key !== undefined && key[1] !== undefined) {
                        return key[1]
                    }
                })
            )
            const userData = await UserService.login(loginField, password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 15 * 24 * 60 * 60 * 1000, httpOnly: true})
            res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies
            await UserService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.json({message: "done"})
        } catch (e) {
            next(e)
        }
    }

    async checkEmail(req, res, next) {
        try {
            const {email} = req.params
            res.json(await UserService.isEmailValid(email))
        } catch (e) {
            next(e)
        }
    }

    async checkPassword(req, res, next) {
        try {
            return res.json({message: "done"})
        } catch (e) {
            next(e)
        }
    }

    async checkUsername(req, res, next) {
        try {
            const {username} = req.params
            res.json(await UserService.isUsernameValid(username))
        } catch (e) {
            next(e)
        }
    }

    async activate(req, res, next) {
        try {
            const {link} = req.params
            await UserService.activate(link)
            return res.json({message: true})
        } catch (e) {
            next(e)
        }
    }

    async reg(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.internal("validationError", "Ошибка валидации"), errors.array())
            }
            let {email, password, username, role} = req.body
            role = role || "USER"
            const userData = await UserService.registration(username, email, password, role, next)
            await Basket.create({userId: userData.id})
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 15 * 24 * 60 * 60 * 1000, httpOnly: true})
            res.json(userData)

        } catch (e) {
            next(e)
        }
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies
            if (!refreshToken) {
                next(ApiError.unauthorized("invalidToken", "Токен обновления невалиден"))
            }
            const tokens = await UserService.refresh(refreshToken)
            await res.cookie('refreshToken', tokens.refreshToken, {maxAge: 15 * 24 * 60 * 60 * 1000, httpOnly: true})

            return res.json(tokens)
        } catch (e) {
            next(e)
        }
    }

    async getUsers(req, res, next) {
        try {
            return res.json({message: "HELLO!"})
        } catch (e) {
            next(e)
        }
    }


    async isAuth(req, res) {
        const token = generateJWT(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }

}

module.exports = new UserController()