var express = require('express');
var router = express.Router();
const UsuarioController = require('../controllers/UsuarioController');
const isAuth = require('../middlewares/isAuth');

router.get('/', isAuth, UsuarioController.index);

module.exports = router;