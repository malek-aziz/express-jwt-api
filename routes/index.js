var express = require('express');
var router = express.Router();

var userController = require('../controllers/UsersController');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.route('/users')
  .get(userController.index)
  .post(userController.new);

router.route('/users/:userId')
  .get(userController.view)
  .patch(userController.update)
  .put(userController.update)
  .delete(userController.delete);

module.exports = router;
