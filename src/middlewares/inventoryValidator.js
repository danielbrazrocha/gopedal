const { check } = require('express-validator')

const inventoryValidator = [
  check('quantity')
    .notEmpty().isInt().withMessage('A quantidade deve ser um número inteiro.').bail()
]

module.exports = inventoryValidator
