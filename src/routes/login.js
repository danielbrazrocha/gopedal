var express = require('express');
var router = express.Router();
const LoginController = require('../controllers/LoginController');
const isAuth = require('../middlewares/isAuth');

// GET Login Page
router.get('/', isAuth, LoginController.showLogin);
// Post para processar os dados do formulário de Login
router.post('/', LoginController.logon);
// GET Logout Page
router.get('/logout', LoginController.logoff);


module.exports = router;