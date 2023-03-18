const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const AuthMiddleware = require('../middleware/AuthMiddleware')
const {validadtePassword, validateEmail} = require('../service/validators/validateFields');
const validate = require('../service/validators/validate')


router.post('/registration', validate([
    validateEmail,
    validadtePassword,
]), userController.registration)

router.post('/login', userController.login)
router.get('/logout', userController.logout)
router.get('/activate/:link', userController.activate)
router.get('/refresh', userController.refresh)

router.get('/checkEmail/:email', validate([
    validateEmail
    ]), userController.checkEmail)

router.get('/checkUsername/:username', userController.checkUsername)
router.get('/users', AuthMiddleware, userController.getUsers)


module.exports = router