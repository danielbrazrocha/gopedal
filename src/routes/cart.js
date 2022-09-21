const express = require('express')
const router = express.Router()

const CartController = require('../controllers/CartController')

const isAuth = require('../middlewares/isAuth')

router.get('/', isAuth, CartController.show)
router.get('/add/:id', CartController.addProduct)
router.get('/del/:id', CartController.delProduct)
router.get('/remove/:id', CartController.removeProduct)
router.get('/include/:id', CartController.includeProduct)

// router.get('/enderecos/:id', UsuarioEnderecosController.edit)
// router.post('/enderecos/:id', UsuarioEnderecosController.submitEdit)
// router.get('/enderecos/deletar/:id', UsuarioEnderecosController.delete)
// router.get('/enderecos/add/form', UsuarioEnderecosController.add)

module.exports = router
