const express = require('express')
const router = express.Router()
const IndexController = require('../controllers/IndexController')
const isAuth = require('../middlewares/isAuth')

// GET Login Page
router.get('/', isAuth, IndexController.index)
router.post('/busca', IndexController.searchResults)

module.exports = router
