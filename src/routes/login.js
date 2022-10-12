const express = require('express')
const router = express.Router()
const LoginController = require('../controllers/LoginController')
const isAuth = require('../middlewares/isAuth')

// GET Login Page
router.get('/', LoginController.showLogin)
// Post para processar os dados do formulário de Login
router.post('/', LoginController.logon)
// GET Logout Page
router.get('/logout', isAuth, LoginController.logoff)

module.exports = router
