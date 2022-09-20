const express = require('express')
const router = express.Router()

const UsuarioController = require('../controllers/UsuarioController')
const UsuarioDadosController = require('../controllers/UsuarioDadosController')
const UsuarioEnderecosController = require('../controllers/UsuarioEnderecosController')

const userValidator = require('../middlewares/validator')
const addressValidator = require('../middlewares/addressValidator')
const isAuth = require('../middlewares/isAuth')

router.get('/', isAuth, UsuarioController.index)

router.get('/dados', isAuth, UsuarioDadosController.show)
router.post('/dados/:id', isAuth, userValidator, UsuarioDadosController.submitEdit)
router.get('/dados/deletar/:id', isAuth, UsuarioDadosController.delete)

router.get('/enderecos', isAuth, UsuarioEnderecosController.show)
router.get('/enderecos/:id', isAuth, UsuarioEnderecosController.edit)
router.post('/enderecos/:id', isAuth, addressValidator, UsuarioEnderecosController.submitEdit)
router.get('/enderecos/deletar/:id', isAuth, UsuarioEnderecosController.delete)
router.get('/enderecos/add/form', UsuarioEnderecosController.add)

// router.get('/inventario', PainelInventarioController.show)
// router.get('/inventario/:id', PainelInventarioController.edit)
// router.post('/inventario/:id', inventoryValidator, PainelInventarioController.submitEdit)
// router.get('/inventario/deletar/:id', PainelInventarioController.delete)
// router.get('/inventario/add/form', PainelInventarioController.add)

module.exports = router
