const express = require('express')
const router = express.Router()
const SobreController = require('../controllers/SobreController')

// GET Sobre Page
router.get('/', SobreController.index)

module.exports = router
