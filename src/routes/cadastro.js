const express = require('express')
const router = express.Router()
const CadastroController = require('../controllers/CadastroController')
const validator = require('../middlewares/validator')

// GET Cadastro Page
router.get('/', CadastroController.showRegister)

// POST Enviando os dados do formulário para cadastro do usuário
router.post('/', validator, CadastroController.register)

module.exports = router
