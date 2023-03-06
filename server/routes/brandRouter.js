const Router = require('express')
const router = new Router()
const brandController = require('../controllers/brandController')
const CheckRoleMiddleware = require('../middleware/CheckRoleMiddleware')

router.post('/', CheckRoleMiddleware('ADMIN'), brandController.create)
router.get('/',brandController.get)
router.delete('/:id', CheckRoleMiddleware('ADMIN'), brandController.delete)

module.exports = router