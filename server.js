var express = require('express'),
    app = express(),
    port = process.env.PORT || 1234,
    bodyParser = require('body-parser'),
    cors = require('cors');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

//index webserver api
app.get('/',(req,res) =>{
    var message = "Rest API Terhubung";
    res.status(200).json({
        status: true,
        code: 200,
        pesan:message
    });
});

//router  /users
var UsersRouter = require('./routers/UsersRouter');
app.use('/users', UsersRouter);

//router  /login
var LoginRouter = require('./routers/LoginRouter');
app.use('/login', LoginRouter);

//router  /profile
var ProfileRouter = require('./routers/ProfileRouter');
app.use('/profile', ProfileRouter);

app.listen(port);
console.log('Server API ISEA: ' + port);