const { check } = require('express-validator')

const categoryValidator = [
  check('nome')
    .notEmpty().withMessage('O Nome deve ser informado').bail()
    .isLength({ min: 5, max: 30 }).withMessage('O nome deve ter entre 5 e 30 caracteres'),
  check('description')
    .notEmpty().withMessage('A descrição do desconto deve ser informado').bail()
    .isLength({ min: 5, max: 500 }).withMessage('O nome deve ter pelo entre 5 e 500 caracteres')
]

module.exports = categoryValidator
