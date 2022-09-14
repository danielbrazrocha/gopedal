const express = require('express')
const router = express.Router()
const PainelController = require('../controllers/PainelController')
const PainelCategoryController = require('../controllers/PainelCategoryController')
const PainelUsuariosController = require('../controllers/PainelUsuariosController')

const PainelProdutosController = require('../controllers/PainelProdutosController')
const PainelDescontoController = require('../controllers/PainelDescontoController')
const PainelInventarioController = require('../controllers/PainelInventarioController')

// const isAuth = require('../middlewares/isAuth')
// const isAdmin = require('../middlewares/isAdmin')
// const productvalidator = require('../middlewares/productvalidator')

// GET Página de Lista de categorias
// router.get('/', isAuth, isAdmin, PainelController.showPainel)
router.get('/', PainelController.show)

// GET Página de adição de categoria
router.get('/categoria', PainelCategoryController.show)
// router.get('/add', CategoryController.addCategory)

router.get('/usuario', PainelUsuariosController.show)

router.get('/produto', PainelProdutosController.show)

router.get('/desconto', PainelDescontoController.show)
router.get('/inventario', PainelInventarioController.show)

// POST Enviando os dados do formulário para cadastro do produto
// router.post('/', productvalidator, AdicionarProdutoController.registerProduct)

module.exports = router
