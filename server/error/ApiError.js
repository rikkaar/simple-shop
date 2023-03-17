const Sequelize = require('sequelize')

class ApiError extends Sequelize.Error {
    constructor(status, name, message, errors = []) {
        super();
        this.status = status
        this.name = name
        this.message = message
        this.errors = errors
    }

    static badRequest(name, message, errors = []) {
        return new ApiError(400, name, message, errors)
    }

    static unauthorized(name, message, errors = []) {
        return new ApiError(401, name, message, errors)
    }

    static internal(name, message, errors = []) {
        return new ApiError(500, name, message, errors)
    }

}

module.exports = ApiError