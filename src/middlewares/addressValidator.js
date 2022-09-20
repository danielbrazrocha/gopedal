const { check } = require('express-validator')

const addressValidator = [
  check('description')
    .notEmpty().withMessage('A descrição deve ser informado').bail()
    .isLength({ min: 5, max: 500 }).withMessage('O nome deve ter pelo entre 5 e 500 caracteres'),
  check('street')
    .notEmpty().withMessage('O endereço completo deve ser informado').bail()
    .isLength({ min: 5, max: 100 }).withMessage('O nome deve ter entre 5 e 100 caracteres'),
  check('number')
    .notEmpty().withMessage('O número deve ser informado').bail()
    .isInt().withMessage('O número deve ter entre 1 e 10 caracteres'),
  check('details')
    .isLength({ min: 5, max: 100 }).withMessage('Detalhes devem ter entre 5 e 100 caracteres'),
  check('CEP')
    .notEmpty().withMessage('O CEP deve ser informado').bail()
    .isLength({ min: 9, max: 9 }).withMessage('O CEP deve contem 9 caracteres no formato 11123-123'),
  check('country')
    .notEmpty().withMessage('O país deve ser informado').bail()
    .isLength({ min: 3, max: 20 }).withMessage('O país deve conter entre 3 e 20 caracteres')
]

module.exports = addressValidator
