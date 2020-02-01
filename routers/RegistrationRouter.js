var express         = require('express'),
    router          = express.Router(),
    UsersController = require('../controllers/UsersController');

    router.post('/', UsersController.registrationUsers);

module.exports = router;