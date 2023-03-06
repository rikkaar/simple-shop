const {User, Basket, BasketItems} = require('../models/models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const ApiError = require('../error/ApiError')

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

    async isAuth (req, res) {
        const token = generateJWT(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }

}

module.exports = new UserController()