var express         = require('express'),
    router          = express.Router(),
    UsersController = require('../controllers/UsersController');

    router.post('/', UsersController.loginUsers);

module.exports = router;