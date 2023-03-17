const express = require('express');
const {validationResult, ValidationChain} = require('express-validator');
const ApiError = require("../../error/ApiError");


const validate = validations => {
    return async (req, res, next) => {
        await Promise.all(validations.map(validation => validation.run(req)));

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            next(ApiError.internal("ValidationError", "Ошибка валидиции", errors.array()))
        }
        next()
    };
}

module.exports = validate