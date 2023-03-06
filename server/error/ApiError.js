const Sequelize = require('sequelize')

class ApiError extends Sequelize.Error {
    constructor(status, message) {
        super();
        this.status = status
        this.message = message
    }

    static badRequest (message) {
        return new ApiError(400, message)
    }

    static internal (message) {
        return new ApiError(500, message)
    }

    static validation (message) {
        return
    }

}

module.exports = ApiError