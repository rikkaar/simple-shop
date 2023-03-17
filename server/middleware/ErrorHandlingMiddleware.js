const ApiError = require('../error/ApiError')

module.exports = function (error, req, res, next) {
    if (error instanceof ApiError) {
        return res.status(error.status).json({name: error.name, message: error.message, errors: error.errors})
    }
    return res.status(500).json({name: error.name, message: error.message})
}