const express = require('express')
const router = express.Router()
const ContatoController = require('../../src/controllers/ContatoController')
const isAuth = require('../middlewares/isAuth')

// GET contato Page
router.get('/', isAuth, ContatoController.index)

module.exports = router
