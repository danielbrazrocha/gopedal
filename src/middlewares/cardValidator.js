const { check } = require('express-validator')

const cardValidator = [
  check('payment_type')
    .notEmpty().withMessage('O tipo de pagamento deve ser informado').bail()
    .isLength({ min: 5, max: 50 }).withMessage('O texto deve ter pelo entre 5 e 50 caracteres'),
  check('provider')
    .notEmpty().withMessage('O nome da bandeira deve ser informada').bail(),
  check('account_number')
    .notEmpty().withMessage('O número do cartão deve ser informado').bail()
    .isCreditCard().withMessage('O número do cartão não é válido'),
  check('expiry')
    .notEmpty().withMessage('O vencimento deve ser informado').bail()
    .isLength({ min: 7, max: 7 }).withMessage('O vencimento deve ser informado no formato mm/aaaa')
]

module.exports = cardValidator
