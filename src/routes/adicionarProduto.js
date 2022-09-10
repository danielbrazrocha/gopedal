const express = require('express')
const router = express.Router()
const AdicionarProdutoController = require('../controllers/AdicionarProdutoController')
const isAuth = require('../middlewares/isAuth')
const isAdmin = require('../middlewares/isAdmin')
const productvalidator = require('../middlewares/productvalidator')

// GET Página de Cadastro de Produto
router.get('/', isAuth, isAdmin, AdicionarProdutoController.showAddProduct)

// POST Enviando os dados do formulário para cadastro do produto
router.post('/', productvalidator, AdicionarProdutoController.registerProduct)

module.exports = router
