const express = require('express')
const router = express.Router()
const IndexController = require('../controllers/IndexController')

// GET Login Page
router.get('/', IndexController.index)
router.post('/busca', IndexController.searchResults)

module.exports = router
