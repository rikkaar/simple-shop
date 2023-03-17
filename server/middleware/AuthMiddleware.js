const jwt = require('jsonwebtoken')
const ApiError = require("../error/ApiError");
const TokenService = require('../service/token-service')
const UserService = require('../service/user-service')
const userController = require("../controllers/userController");

module.exports = async function (req, res, next) {
    if (req.method === 'OPTIONS') {
        next()
    }
    try {
        let token = req.headers.authorization.split(" ")[1]
        if (!token) {
            return next(ApiError.unauthorized("UserUnAuthorized", "Пользователь не авторизован"))
        }
        req.user = TokenService.validateAccessToken(token)
        next()
    } catch (e) {
        return next(ApiError.unauthorized("UserUnAuthorized", "Пользователь не авторизован"))
    }
}