const express = require('express')
const router = express.Router()
const ContatoController = require('../../src/controllers/ContatoController')

// GET contato Page
router.get('/', ContatoController.index)

module.exports = router
