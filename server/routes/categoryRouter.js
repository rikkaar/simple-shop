const Router = require('express')
const router = new Router()
const categoryController = require('../controllers/categoryController')
const CheckRoleMiddleware = require('../middleware/CheckRoleMiddleware')

router.post('/', CheckRoleMiddleware('ADMIN'), categoryController.create)
router.get('/', categoryController.get)
router.delete('/:id', CheckRoleMiddleware('ADMIN'), categoryController.delete)

module.exports = router