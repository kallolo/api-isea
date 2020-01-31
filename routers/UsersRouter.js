
var express = require('express'),
    app = express(),
    // router = express.Router(),
    UsersController = require('../controllers/UsersController'),
    auth = require('../middleware/auth');

/* url '/users' */
app.route('/')
    //Ambil data semua user
    .get(auth.cekToken, UsersController.getUsers)
    //Tambah data user
    .post(auth.cekToken, UsersController.addUsers)
/* end url '/users' */

/* url '/users/id' */
app.route('/:id')
    // Cari user dengan parameter id
    .get(auth.cekToken, UsersController.findUsers)
    //Ubah data user dengan parameter id
    .put(auth.cekToken, UsersController.updateUsers)
    //Hapus data user dengan parameter id
    .delete(auth.cekToken, UsersController.deleteUsers);
/* end url '/users/id' */


// router.get('/', auth.cekToken, UsersController.dataUsers);
// router.get('/:id', auth.cekToken, UsersController.cariUsers);
module.exports = app;