const {Brand} = require('../models/models')
const ApiError = require('../error/ApiError')

class BrandController {
    async create (req, res) {
        const {name} = req.body
        const brand = await Brand.create({name})
        return res.json(brand)
    }

    async get (req, res) {
        const brands = await Brand.findAll()
        return res.json(brands)
    }

    async delete (req, res, next) {
        const {id} = req.params
        if (!id) {
            return next(ApiError.badRequest("В запросе не указан id!"))
        }
        const brand = await Brand.destroy({where: {id: id}})
        if (brand === 0) {
            return next(ApiError.badRequest("Такой записи не существует. Нечего удалять!"))
        }
        return res.json(brand)
    }
}

module.exports = new BrandController()