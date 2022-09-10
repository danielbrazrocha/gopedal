var express = require('express');
var router = express.Router();
const CadastroController = require('../controllers/CadastroController');
const isAuth = require('../middlewares/isAuth');
const validator = require('../middlewares/validator');

// GET Cadastro Page
router.get('/', isAuth, CadastroController.showRegister);

// POST Enviando os dados do formulário para cadastro do usuário
router.post('/', validator, CadastroController.register);

module.exports = router;
