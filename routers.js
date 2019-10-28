module.exports = function(app) {
    var auth = require('./middleware/auth'),
        IndexController = require('./controllers/IndexController'),
        UsersController   = require('./controllers/UsersController');

    //index RestAPI
    /* url '/' */
    app.route('/').get(IndexController.index);
     /* end url '/' */

    /* url '/login' */
    app.route('/login')
        .post(UsersController.loginUsers);
    /* end url '/login' */

    /* url '/user' */
    app.route('/users')
        //Ambil data semua user
        .get(auth.cekToken, UsersController.dataUsers)
        //Tambah data user
        .post(auth.cekToken, UsersController.tambahUsers)
        //Ubah data user
        .put(auth.cekToken, UsersController.ubahUsers)
        //Hapus data user
        .delete(auth.cekToken, UsersController.hapusUsers);
    /* end url '/user' */

    /* url '/user/id' */
    app.route('/users/:id')
        .get(auth.cekToken, UsersController.cariUsers);
    /* end url '/user/id' */

};