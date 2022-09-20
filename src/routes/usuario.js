const express = require('express')
const router = express.Router()

const UsuarioController = require('../controllers/UsuarioController')
const UsuarioDadosController = require('../controllers/UsuarioDadosController')
const UsuarioEnderecosController = require('../controllers/UsuarioEnderecosController')
const UsuarioPagamentosController = require('../controllers/UsuarioPagamentosController')
const UsuarioPedidoController = require('../controllers/UsuarioPedidoController')

const userValidator = require('../middlewares/validator')
const addressValidator = require('../middlewares/addressValidator')
const cardValidator = require('../middlewares/cardValidator')

const isAuth = require('../middlewares/isAuth')

router.get('/', isAuth, UsuarioController.index)

router.get('/dados', isAuth, UsuarioDadosController.show)
router.post('/dados/:id', isAuth, userValidator, UsuarioDadosController.submitEdit)
router.get('/dados/deletar/:id', isAuth, UsuarioDadosController.delete)

router.get('/enderecos', isAuth, UsuarioEnderecosController.show)
router.get('/enderecos/:id', isAuth, UsuarioEnderecosController.edit)
router.post('/enderecos/:id', isAuth, addressValidator, UsuarioEnderecosController.submitEdit)
router.get('/enderecos/deletar/:id', isAuth, UsuarioEnderecosController.delete)
router.get('/enderecos/add/form', isAuth, UsuarioEnderecosController.add)

router.get('/pagamentos', isAuth, UsuarioPagamentosController.show)
router.get('/pagamentos/:id', isAuth, UsuarioPagamentosController.edit)
router.post('/pagamentos/:id', isAuth, cardValidator, UsuarioPagamentosController.submitEdit)
router.get('/pagamentos/deletar/:id', isAuth, UsuarioPagamentosController.delete)
router.get('/pagamentos/add/form', isAuth, UsuarioPagamentosController.add)

router.get('/pedidos', UsuarioPedidoController.show)
router.get('/pedidos/:id', UsuarioPedidoController.edit)

module.exports = router
