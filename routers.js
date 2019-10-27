module.exports = function(app) {
    var auth = require('./middleware/auth'),
        controller = require('./controller'),
        UsersController   = require('./controllers/UsersController');

    app.route('/')
        .get(controller.index);

    app.route('/users')
        .get(auth.cekToken, controller.users);
    
    app.route('/pengguna')
        .get(auth.cekToken, UsersController.list);
    
    app.route('/login')
        .post(UsersController.login);
};