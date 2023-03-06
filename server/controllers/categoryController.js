const {Category} = require('../models/models')
const ApiError = require('../error/ApiError')

class CategoryController {
    async create (req, res) {
        const {name} = req.body
        const category = await Category.create({name})
        return res.json(category)
    }

    async get (req, res) {
        const categories = await Category.findAll()
        return res.json(categories)
    }

    async delete (req, res, next) {
        const {id} = req.params
        if (!id) {
            return next(ApiError.badRequest("В запросе не указан id!"))
        }
        const category = await Category.destroy({where: {id: id}})
        if (category === 0) {
            return next(ApiError.badRequest("Такой записи не существует. Нечего удалять!"))
        }
        return res.json(category)
    }
}

module.exports = new CategoryController()