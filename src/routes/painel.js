const express = require('express')
const router = express.Router()
const PainelController = require('../controllers/PainelController')
const PainelCategoryController = require('../controllers/PainelCategoryController')
const PainelUsuariosController = require('../controllers/PainelUsuariosController')
const PainelProdutosController = require('../controllers/PainelProdutosController')
const PainelDescontoController = require('../controllers/PainelDescontoController')
const PainelInventarioController = require('../controllers/PainelInventarioController')
const PainelPedidoController = require('../controllers/PainelPedidoController')

// const isAuth = require('../middlewares/isAuth')
// const isAdmin = require('../middlewares/isAdmin')
const productValidator = require('../middlewares/productValidator')
const userValidator = require('../middlewares/userValidator')
const categoryValidator = require('../middlewares/categoryValidator')
const discountValidator = require('../middlewares/discountValidator')
const inventoryValidator = require('../middlewares/inventoryValidator')

// GET Página de Lista de categorias
// router.get('/', isAuth, isAdmin, PainelController.showPainel)
router.get('/', PainelController.show)

// GET Página de adição de categoria
router.get('/categoria', PainelCategoryController.show)
router.get('/categoria/:id', PainelCategoryController.edit)
router.post('/categoria/:id', categoryValidator, PainelCategoryController.submitEdit)
router.get('/categoria/deletar/:id', PainelCategoryController.delete)
router.get('/categoria/add/form', PainelCategoryController.add)

router.get('/usuario', PainelUsuariosController.show)
router.get('/usuario/:id', PainelUsuariosController.edit)
router.post('/usuario/:id', userValidator, PainelUsuariosController.submitEdit)
router.get('/usuario/deletar/:id', PainelUsuariosController.delete)

router.get('/produto', PainelProdutosController.show)
router.get('/produto/:id', PainelProdutosController.edit)
router.post('/produto/:id', productValidator, PainelProdutosController.submitEdit)
router.get('/produto/deletar/:id', PainelProdutosController.delete)
router.get('/produto/add/form', PainelProdutosController.add)

router.get('/desconto', PainelDescontoController.show)
router.get('/desconto/:id', PainelDescontoController.edit)
router.post('/desconto/:id', discountValidator, PainelDescontoController.submitEdit)
router.get('/desconto/deletar/:id', PainelDescontoController.delete)
router.get('/desconto/add/form', PainelDescontoController.add)

router.get('/inventario', PainelInventarioController.show)
router.get('/inventario/:id', PainelInventarioController.edit)
router.post('/inventario/:id', inventoryValidator, PainelInventarioController.submitEdit)
router.get('/inventario/deletar/:id', PainelInventarioController.delete)
router.get('/inventario/add/form', PainelInventarioController.add)

router.get('/pedido', PainelPedidoController.show)
router.get('/pedido/:id', PainelPedidoController.edit)

module.exports = router
