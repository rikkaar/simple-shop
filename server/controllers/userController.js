const {User, Basket, BasketItems} = require('../models/models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const ApiError = require('../error/ApiError')
const UserService = require('../service/user-service')

const generateJWT = (id, email, role) => {
    return jwt.sign(
        {id: id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'})
}

class UserController {
    async registration (req, res, next) {
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


    async login (req, res, next) {
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

    async logout (req, res, next) {
        try {

        } catch (e) {
            console.log(e.message)
        }
    }

    async checkmail (req, res, next) {
        try {
            const {email} = req.body
            res.json(await UserService.isEmailValid(email, next))
        } catch (e) {
            console.log(e.message)
        }
    }

    async activate (req, res, next) {
        try {
            const {link} = req.params
            const user = await User.findOne({where: {activationLink: link}})
            res.json(await user.update({isActivated: true}))
        } catch (e) {
            console.log(e.message)
        }
    }

    async reg (req, res, next) {
        try {
            let {email, password, username, role} = req.body
            role = role || "USER"
            const userData = await UserService.registration(username, email, password, role, next)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 15 * 24 * 60 * 60 * 1000, httpOnly: true})
            res.json(userData)

        } catch (e) {
            console.log(e.message)
        }
    }

    async refresh (req, res, next) {
        try {

        } catch (e) {
            console.log(e.message)
        }
    }

    async getUsers (req, res, next) {
        try {

        } catch (e) {
            console.log(e.message)
        }
    }


    async isAuth (req, res) {
        const token = generateJWT(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }

}

module.exports = new UserController()