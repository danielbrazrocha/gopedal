const express = require('express')
const router = express.Router()

const PaymentController = require('../controllers/PaymentController')

const isAuth = require('../middlewares/isAuth')
// const isLogged = require('../middlewares/isLogged')

router.get('/', isAuth, PaymentController.show)
router.get('/confirmado', isAuth, PaymentController.success)
router.get('/cancelado', isAuth, PaymentController.cancel)

module.exports = router
