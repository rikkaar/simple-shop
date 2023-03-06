const Router = require('express')
const router = new Router()
const itemController = require('../controllers/itemController')
const CheckRoleMiddleware = require('../middleware/CheckRoleMiddleware')
const AuthMiddleware = require('../middleware/AuthMiddleware')

router.post('/', CheckRoleMiddleware('ADMIN'), itemController.create)
router.get('/', itemController.get)
router.get('/:id', itemController.getById)
router.delete('/:id', CheckRoleMiddleware('ADMIN'), itemController.delete)

router.post('/rating/:itemId', itemController.getRating)
router.post('/rate', AuthMiddleware, itemController.rate)

module.exports = router