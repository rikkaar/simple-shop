const {check, validationResult} = require('express-validator');
const ApiError = require("../../error/ApiError");

exports.validadtePassword =
    check('password')
        .isLength({min: 5})
        .withMessage('Минимальная длина пароля: 5 символов')
        .matches(/\d/)
        .withMessage('Пароль должен содержать хотя бы одну цифру');
    // (req, res, next) => {
    //     const errors = validationResult(req);
    //     console.log("inside validate")
    //     if (!errors.isEmpty())
    //         throw ApiError.internal("ValidationError", "Ошибка валидиции", errors.errors)
    //     next()
    // }
    // (req, res, next) => {
    //     const errors = validationResult(req);
    //     if (!errors.isEmpty())
    //         throw ApiError.internal("ValidationError", "Ошибка валидиции", errors.errors)
    //     next();
    // },

exports.validateEmail =
    check('email')
        .isEmail()
        .withMessage('Почта недействительна');
