var express = require('express');
var router = express.Router();

var userController = require('../app/controllers/UsersController');
var checkAuth = require('../app/middleware/check-auth');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.route('/users')
  .get(checkAuth, userController.index)
  .post(userController.new);

router.route('/users/:userId')
  .get(userController.view)
  .patch(checkAuth, userController.update)
  .put(checkAuth, userController.update)
  .delete(checkAuth, userController.delete);

module.exports = router;
