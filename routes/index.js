var express = require('express');
var router = express.Router();

var userController = require('../app/controllers/UsersController');

var passport = require('passport');
var passportConf = require('../app/middleware/passport');

var middlewareJWT = passport.authenticate('jwt', { session: false });
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.route('/users')
  .get(middlewareJWT, userController.index)
  .post(userController.new);

router.route('/users/:userId')
  .get(userController.view)
  .patch(middlewareJWT, userController.update)
  .put(middlewareJWT, userController.update)
  .delete(middlewareJWT, userController.delete);

module.exports = router;
