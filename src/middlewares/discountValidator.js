const { check } = require('express-validator')

const discountValidator = [
  check('nome')
    .notEmpty().withMessage('O Nome deve ser informado').bail()
    .isLength({ min: 5, max: 200 }).withMessage('O nome deve ter pelo entre 5 e 200 caracteres'),
  check('description')
    .notEmpty().withMessage('A descrição do desconto deve ser informado').bail()
    .isLength({ min: 5, max: 200 }).withMessage('O nome deve ter pelo entre 5 e 200 caracteres'),
  check('discountpercent')
    .notEmpty().isFloat({ min: 0.01, max: 99.99 }).withMessage('O desconto deverá ser um número entre 0.01 e 99.99').bail(),
  check('active')
    .notEmpty().isBoolean().withMessage('Deverá ser true/false').bail()

]

module.exports = discountValidator
