var express = require('express');
var router = express.Router();
const SobreController = require('../controllers/SobreController');
const isAuth = require('../middlewares/isAuth');

// GET Sobre Page
router.get('/', isAuth, SobreController.index);

module.exports = router;