var express = require('express');
var router = express.Router();

var userController = require('../app/controllers/UsersController');
var checkAuth = require('../app/middleware/check-auth');
var passport = require('passport');
var passportConf = require('../app/middleware/passport');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.route('/users')
  .get(passport.authenticate('jwt', {session: false}), userController.index)
  .post(userController.new);

router.route('/users/:userId')
  .get(userController.view)
  .patch(passport.authenticate('jwt', {session: false}), userController.update)
  .put(passport.authenticate('jwt', {session: false}), userController.update)
  .delete(passport.authenticate('jwt', {session: false}), userController.delete);

module.exports = router;
