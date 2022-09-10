var express = require('express');
var router = express.Router();
const ContatoController = require('../../src/controllers/ContatoController');
const isAuth = require('../middlewares/isAuth');

// GET contato Page
router.get('/', isAuth,ContatoController.index);

module.exports = router;