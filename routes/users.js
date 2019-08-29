var express = require('express');
var router = express.Router();

var userController = require('../controllers/UsersController');

/* GET users listing. */
router.get('/', userController.get);
router.get('/:userId', userController.get);
router.post('/', userController.create);
router.put('/:userId', userController.update);
router.delete('/:userId', userController.delete);

module.exports = router;
