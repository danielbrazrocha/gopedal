const express = require('express')
const router = express.Router()

const CartController = require('../controllers/CartController')

const isAuth = require('../middlewares/isAuth')
// const isLogged = require('../middlewares/isLogged')

router.get('/', isAuth, CartController.show)
router.get('/add/:id', isAuth, CartController.addProduct)
router.get('/del/:id', isAuth, CartController.delProduct)
router.get('/remove/:id', isAuth, CartController.removeProduct)
router.get('/include/:id', isAuth, CartController.includeProduct)

module.exports = router
