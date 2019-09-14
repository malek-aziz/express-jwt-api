var express = require('express');
var router = express.Router();

var userController = require('../app/controllers/UsersController');

var passport = require('passport');
var passportConf = require('../app/middleware/passport');
var checkRole = require('../app/middleware/checkRole');

var middlewareJWT = passport.authenticate('jwt', { session: false });
var middlewareChekRole = checkRole('user');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.route('/users')
  .get(middlewareJWT, middlewareChekRole, userController.index)
  .post(userController.new);

router.route('/users/:userId')
  .get(userController.view)
  .patch(middlewareJWT, userController.update)
  .put(middlewareJWT, userController.update)
  .delete(middlewareJWT, userController.delete);

module.exports = router;
