var express = require('express');
var router = express.Router();
var passport = require('passport');
var passportConf = require('../app/middleware/passport');


var userController = require('../app/controllers/UsersController');

router.post('/login', passport.authenticate('local', { session: false }), userController.login);
router.get('/google-auth-callback', userController.ggAuth);

module.exports = router;