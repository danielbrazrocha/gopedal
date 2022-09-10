const { check } = require('express-validator')

const validateRegister = [
  check('nome')
    .notEmpty().withMessage('O Nome deve ser informado').bail(),
  // .isLength({min:5, max: 200}).withMessage('O nome deve ter pelo menos 5 caracteres'),
  check('category')
    .notEmpty().withMessage('A categoria deve ser informada').bail(),
  // .isLength({min:11}).withMessage('O CPF deve ter 11 caracteres')
  // .isTaxID('pt-BR').withMessage('CPF inválido'),
  check('description')
    .notEmpty().withMessage('A descrição deve ser informada').bail(),
  // .isEmail().withMessage('E-mail não informado'),
  check('SKU')
    .notEmpty().withMessage('O SKU deve ser informado').bail(),
  check('price')
    .notEmpty().withMessage('O preço deve ser informado').bail()
    // .isLength({min:8, max: 25}).withMessage('A senha não contem o número de caracteres'),
]

module.exports = validateRegister
