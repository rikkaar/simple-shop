const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const AuthMiddleware = require('../middleware/AuthMiddleware')


router.post('/registration', userController.reg)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/activate/:link', userController.activate)
router.get('/refresh', userController.refresh)
router.post('/ismailtaken', userController.checkmail)
router.get('/users', userController.getUsers)

router.get('/auth', AuthMiddleware, userController.isAuth)

module.exports = router