const { check } = require('express-validator')

const productValidator = [
  check('nome')
    .notEmpty().withMessage('O Nome deve ser informado').bail(),
  check('category')
    .notEmpty().withMessage('A categoria deve ser informada').bail(),
  check('description')
    .notEmpty().withMessage('A descrição deve ser informada').bail(),
  check('SKU')
    .notEmpty().withMessage('O SKU deve ser informado').bail(),
  check('price')
    .notEmpty().isFloat().withMessage('O preço deve ser informado no formato 123.00').bail()
]

module.exports = productValidator
