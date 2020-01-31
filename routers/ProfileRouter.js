
var express = require('express'),
    app = express(),
    // router = express.Router(),
    UsersController = require('../controllers/UsersController'),
    auth = require('../middleware/auth');

/* url '/profile' */
app.route('/')
    .get(auth.cekToken, UsersController.profileUsers);
/* end url '/users/profile' */
// router.get('/', auth.cekToken, UsersController.dataUsers);
// router.get('/:id', auth.cekToken, UsersController.cariUsers);
module.exports = app;