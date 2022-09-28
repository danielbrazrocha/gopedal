const { check } = require('express-validator')

const userValidator = [
  check('nome')
    .notEmpty().withMessage('O Nome deve ser informado').bail()
    .isLength({ min: 5, max: 200 }).withMessage('O nome deve ter pelo menos 5 caracteres'),
  check('cpf')
    .notEmpty().withMessage('O CPF deve ser informado').bail()
    .isLength({ min: 11 }).withMessage('O CPF deve ter 11 caracteres')
    .isTaxID('pt-BR').withMessage('CPF inválido'),
  check('email')
    .notEmpty().withMessage('O e-mail deve ser informado').bail()
    .isEmail().withMessage('E-mail não informado'),
  check('tel')
    .notEmpty().withMessage('O telefone deve ser informado').bail()
    .isLength({ min: 8, max: 15 }).withMessage('O telefone deve ter no mínimo 8 caracteres')
    .isMobilePhone('pt-BR').withMessage('Telefone inválido')
]

module.exports = userValidator
