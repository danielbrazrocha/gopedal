const express = require('express')
const router = express.Router()
const UsuarioController = require('../controllers/UsuarioController')
const UsuarioDadosController = require('../controllers/UsuarioDadosController')
const userValidator = require('../middlewares/validator')
const isAuth = require('../middlewares/isAuth')

router.get('/', isAuth, UsuarioController.index)

router.get('/dados', isAuth, UsuarioDadosController.show)
router.post('/dados/:id', isAuth, userValidator, UsuarioDadosController.submitEdit)
router.get('/dados/deletar/:id', isAuth, UsuarioDadosController.delete)

module.exports = router
