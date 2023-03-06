const {Item, ItemInfo, Rating} = require('../models/models')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')
const sequelize = require('sequelize')


class ItemController {
    async create(req, res, next) {
        try {
            let {name, price, brandId, categoryId, info} = req.body
            const {img} = req.files //  express-fileupload
            let fileName = uuid.v4() + ".jpg" // uuid
            await img.mv(path.resolve(__dirname, '..', 'static', fileName)) //    path

            const item = await Item.create({name, price, categoryId, brandId, img: fileName})

            if (info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    ItemInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: item.id
                    })
                )
            }
            return res.json(item)
        } catch (e) {
            if (e.name === "SequelizeValidationError")
                return next(ApiError.badRequest(e.name))
        }
    }

    async get(req, res, next) {
        const keys = Object.keys(Item.getAttributes())

        function ItemOrder(order, direction) {
            if (keys.includes(order)) {
                return [[order, direction]]
            } else console.log(order + " не находится в списке возможных атрибутов")
            return []
        }

        let {limit, offset, page, order, direction, ...params} = req.query
        limit = limit || 9
        page = page || 1
        offset = offset || page * limit - limit
        direction = direction || "ASC"
        order = ItemOrder(order, direction)


        console.log(limit, offset, page, order, params)
        const filter = Object.fromEntries(
            Object.entries(params).filter(([key]) => keys.includes(key))
        )

        try {
            const items = await Item.findAndCountAll({where: filter, order, limit, offset})
            return res.json(items)
        } catch (e) {
            if (e.name === "SequelizeDatabaseError")
                return next(ApiError.badRequest(e.name))
            else return next(ApiError.badRequest(e.name))
        }
    }

    async getById(req, res, next) {
        const {id} = req.params
        if (!id) {
            return next(ApiError.badRequest("В запросе не указан id!"))
        }
        const item = await Item.findOne({where: {id}, include: [{model: ItemInfo, as: 'info'}]})
        res.json(item)
    }

    async delete(req, res, next) {
        const {id} = req.params
        if (!id) {
            return next(ApiError.badRequest("В запросе не указан id!"))
        }
        const item = await Item.destroy({where: {id}})
        if (item === 0) {
            return next(ApiError.badRequest("Такой записи не существует. Нечего удалять!"))
        }
        return res.json(item)
    }

    async rate(req, res, next) {
        const {itemId, rating} = req.body
        const isRated = await Rating.findOne({where: {itemId, userId: req.user.id}})

        if (isRated) {
            const rate = await isRated.update({rate: rating})
            return res.json(rate)
        } else {
            const rate = await Rating.create({rate: rating, userId: req.user.id, itemId})
            return res.json(rate)
        }

        // отобразить оценку залогиненого юзера
        // проверить, ставил ли он оценку уже
        //
    }

    async getRating(req, res, next) {
        const {itemId} = req.params

        // const item = await Item.findOne({
        //     where: {id: itemId},
        //     include: Rating
        // })

        // [sequelize.fn('avg', sequelize.col(Rating.rate)), 'calc']

        // [sequelize.fn('avg', sequelize.col('rate')),'calc']

        // const item = await Item.findOne({
        //     where: {id: itemId},
        //     include: [
        //         {
        //             model: Rating,
        //             attributes: ['rate']
        //         }
        //     ],
        //     group: ["item.id", "ratings.id"]
        // })


        // const item = await Item.findOne({
        //     where: {id: itemId},
        //     include: [
        //         {
        //             model: Rating,
        //             as: "ratings",
        //             attributes: ['rate']
        //         }
        //     ],
        //     attributes: ["item.id", 'ratings.rate'],
        //     group: ["item.id", "ratings.id"]
        // })

        const item = await Item.findOne({
            where: {id: itemId},
            attributes: {
                include: [
                    [sequelize.fn('AVG', sequelize.col('rate')), 'avgRating'],
                ]
            },
            include: [
                {
                    model: Rating,
                    attributes: [],
                },
            ],
            group: ['item.id'],
        })


        // const item = await Item.findOne({
        //     where: {id: itemId},
        //     include: [
        //         {
        //             model: Rating,
        //             as: "newrate",
        //             attributes: []
        //         },
        //     ],
        //     attributes:{
        //         include: [
        //             [sequelize.fn('avg', sequelize.col('newrate.rate')), 'calced'],
        //         ],
        //     },
        //     group: ['Item.id']
        // })
        console.log(item)
        return res.json(item)


    }
}

module.exports = new ItemController()