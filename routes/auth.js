var express = require('express');
var router = express.Router();

var userController = require('../app/controllers/UsersController');

router.post('/login', userController.login);
router.get('/google-auth-callback', userController.ggAuth);

module.exports = router;