const express = require('express')
const router = express.Router()
const ProdutoController = require('../controllers/ProdutoController')
const isAuth = require('../middlewares/isAuth')
const isAdmin = require('../middlewares/isAdmin')

// GET Product Details Page
router.get('/:id', isAuth, ProdutoController.detalhesProduto)

// GET to Delete Product
router.get('/deletar/:id', isAdmin, ProdutoController.deletarProduto)

module.exports = router
