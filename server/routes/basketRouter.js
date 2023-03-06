const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basketController')
const AuthMiddleware = require('../middleware/AuthMiddleware')
const CheckRoleMiddleware = require('../middleware/CheckRoleMiddleware')

router.get('/', AuthMiddleware, basketController.getBasket)
router.post('/item/:itemId', AuthMiddleware, basketController.findBasketItem)
router.post('/add', AuthMiddleware, basketController.addBasketItem)
router.post('/update', AuthMiddleware, basketController.updateBasketItem) //добавление нового элемента в корзину или изменение его количества
router.delete('/delete/:BasketItemId', AuthMiddleware, basketController.deleteBasketItem)

// нужнен маршрут по которому можно проверить есть ли предмет в корзине. Поиск предмета по ItemId. возвращает свзять по itemId -- BasketItem

module.exports = router