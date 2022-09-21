const express = require('express')
const router = express.Router()
const ProdutoController = require('../controllers/ProdutoController')
const isAuth = require('../middlewares/isAuth')

// GET Product Details Page
router.get('/:id', isAuth, ProdutoController.detalhesProduto)

module.exports = router
