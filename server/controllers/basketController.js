const {Basket, BasketItems} = require('../models/models')
const ApiError = require('../error/ApiError')

class BasketController {
    async getBasket(req, res, next) {
        try {
            const basket = await Basket.findOne({where: {userId: req.user.id}, include: [BasketItems]})
            res.json(basket)
        } catch (e) {
            return next(ApiError.badRequest("Непредвиденная ошибка"))
        }
    }


    async findBasketItem(req, res, next) {
        try {
            const basketId = await Basket.findOne({where: {userId: req.user.id}, attributes: ['id']})
            const {itemId} = req.params
            if (!basketId.id) {
                return next(ApiError.badRequest("В запросе не указан id!"))
            }
            const basketItem = await BasketItems.findOne({where: {basketId: basketId.id, itemId}})
            return res.json(basketItem)

        } catch (e) {
            return next(ApiError.badRequest("Непредвиденная ошибка"))
        }
    }


    async deleteBasketItem(req, res, next) {
        try {
            const {BasketItemId} = req.params
            if (!BasketItemId) {
                return next(ApiError.badRequest("В запросе не указан id!"))
            }
            const basketItem = await BasketItems.destroy({where: {id: BasketItemId}})
            if (basketItem === 0) {
                return next(ApiError.badRequest("Такой записи не существует. Нечего удалять!"))
            }
            return res.json(basketItem)
        } catch (e) {
            return next(ApiError.badRequest("Непредвиденная ошибка"))
        }
    }


    async addBasketItem(req, res, next) {
        try {
            const basketId = await Basket.findOne({where: {userId: req.user.id}, attributes: ['id']})
            let {itemId, quantity} = req.body
            quantity = quantity || 1
            if (!basketId.id) {
                return next(ApiError.badRequest("В запросе не указан id!"))
            }
            const isBasket = await BasketItems.findOne({where: {basketId: basketId.id, itemId}})
            if (isBasket) {
                return next(ApiError.badRequest("товар уже нахрдится в корзине"))
            }
            const basketItem = await BasketItems.create({basketId: basketId.id, itemId, quantity})
            return res.json(basketItem)
        } catch (e) {
            return next(ApiError.badRequest("Непредвиденная ошибка"))
        }
    }


    async updateBasketItem(req, res, next) {
        try {
            const {BasketItemId, quantity} = req.body
            if (!BasketItemId) {
                return next(ApiError.badRequest("В запросе не указан id!"))
            }
            if (quantity === 0) {
                await this.deleteBasketItem(req, res, next)
            }
            const basketItem = await BasketItems.update({quantity}, {where: {id: BasketItemId}})
            return res.json(basketItem)
        } catch (e) {
            return next(ApiError.badRequest("Непредвиденная ошибка"))
        }
    }
}

module.exports = new BasketController()