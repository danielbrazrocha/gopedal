const express = require('express')
const router = express.Router()
const PainelController = require('../controllers/PainelController')
const PainelCategoryController = require('../controllers/PainelCategoryController')
const PainelUsuariosController = require('../controllers/PainelUsuariosController')
const PainelProdutosController = require('../controllers/PainelProdutosController')
const PainelDescontoController = require('../controllers/PainelDescontoController')
const PainelInventarioController = require('../controllers/PainelInventarioController')
const PainelPedidoController = require('../controllers/PainelPedidoController')

const isAuth = require('../middlewares/isAuth')
const isAdmin = require('../middlewares/isAdmin')

const productValidator = require('../middlewares/productValidator')
const userValidator = require('../middlewares/userValidator')
const categoryValidator = require('../middlewares/categoryValidator')
const discountValidator = require('../middlewares/discountValidator')
const inventoryValidator = require('../middlewares/inventoryValidator')

// GET Página de Lista de categorias
// router.get('/', isAuth, isAdmin, PainelController.showPainel)
router.get('/', isAuth, isAdmin, PainelController.show)

// GET Página de adição de categoria
router.get('/categoria', isAuth, isAdmin, PainelCategoryController.show)
router.get('/categoria/:id', isAuth, isAdmin, PainelCategoryController.edit)
router.post('/categoria/:id', isAuth, isAdmin, categoryValidator, isAuth, isAdmin, PainelCategoryController.submitEdit)
router.get('/categoria/deletar/:id', isAuth, isAdmin, PainelCategoryController.delete)
router.get('/categoria/add/form', isAuth, isAdmin, PainelCategoryController.add)

router.get('/usuario', isAuth, isAdmin, PainelUsuariosController.show)
router.get('/usuario/:id', isAuth, isAdmin, PainelUsuariosController.edit)
router.post('/usuario/:id', isAuth, isAdmin, userValidator, PainelUsuariosController.submitEdit)
router.get('/usuario/deletar/:id', isAuth, isAdmin, PainelUsuariosController.delete)

router.get('/produto', isAuth, isAdmin, PainelProdutosController.show)
router.get('/produto/:id', isAuth, isAdmin, PainelProdutosController.edit)
router.post('/produto/:id', isAuth, isAdmin, productValidator, PainelProdutosController.submitEdit)
router.get('/produto/deletar/:id', isAuth, isAdmin, PainelProdutosController.delete)
router.get('/produto/add/form', isAuth, isAdmin, PainelProdutosController.add)

router.get('/desconto', isAuth, isAdmin, PainelDescontoController.show)
router.get('/desconto/:id', isAuth, isAdmin, PainelDescontoController.edit)
router.post('/desconto/:id', isAuth, isAdmin, discountValidator, PainelDescontoController.submitEdit)
router.get('/desconto/deletar/:id', isAuth, isAdmin, PainelDescontoController.delete)
router.get('/desconto/add/form', isAuth, isAdmin, PainelDescontoController.add)

router.get('/inventario', isAuth, isAdmin, PainelInventarioController.show)
router.get('/inventario/:id', isAuth, isAdmin, PainelInventarioController.edit)
router.post('/inventario/:id', isAuth, isAdmin, inventoryValidator, PainelInventarioController.submitEdit)
router.get('/inventario/deletar/:id', isAuth, isAdmin, PainelInventarioController.delete)
router.get('/inventario/add/form', isAuth, isAdmin, PainelInventarioController.add)

router.get('/pedido', isAuth, isAdmin, PainelPedidoController.show)
router.get('/pedido/:id', isAuth, isAdmin, PainelPedidoController.edit)

module.exports = router
