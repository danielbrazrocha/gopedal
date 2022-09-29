const express = require('express')
const router = express.Router()
const ProdutoController = require('../controllers/ProdutoController')

// GET Product Details Page
router.get('/:id', ProdutoController.detalhesProduto)

module.exports = router
