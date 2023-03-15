const Router = require('express').Router
const router = new Router()


const itemRouter = require('./itemRouter')
const brandRouter = require('./brandRouter')
const userRouter = require('./userRouter')
const categoryRouter = require('./categoryRouter')
const basketRouter = require('./basketRouter')


router.use('/user', userRouter)
router.use('/item', itemRouter)
router.use('/brand', brandRouter)
router.use('/category', categoryRouter)

router.use('/basket', basketRouter)

module.exports = router