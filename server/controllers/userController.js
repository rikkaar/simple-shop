const {Basket} = require('../models/models')
const ApiError = require('../error/ApiError')
const UserService = require('../service/user-service')
const {validationResult} = require("express-validator");

class UserController {
    async login(req, res, next) {
        try {
            const {email, username, password} = req.body
            const loginField = Object.fromEntries(
                Object.entries({email, username}).filter((key) => {
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

    async registration(req, res, next) {
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
}

module.exports = new UserController()