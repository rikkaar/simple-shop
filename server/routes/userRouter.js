const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const AuthMiddleware = require('../middleware/AuthMiddleware')
const {body, param, query} = require('express-validator')
const {validadtePassword, validateEmail} = require('../service/validators/validadtePassword');
const validate = require('../service/validators/validate')


router.post('/registration', validate([
    validateEmail,
    validadtePassword,
]), userController.reg)

router.post('/login', userController.log)
router.get('/logout', userController.logout)
router.get('/activate/:link', userController.activate)
router.get('/refresh', userController.refresh)

router.get('/checkEmail/:email', validate([
    validateEmail
    ]), userController.checkEmail)

router.post('/checkPassword', validate([
    validadtePassword
    ]), userController.checkPassword)

router.get('/checkUsername/:username', userController.checkUsername)
router.get('/users', AuthMiddleware, userController.getUsers)

router.get('/auth', AuthMiddleware, userController.isAuth)

module.exports = router