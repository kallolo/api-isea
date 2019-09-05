var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var cors = require('cors');

var app = express();
var router = require("./router");
var port = process.env.PORT || 4000;

//set up local
var config = require("./app/config");


//Konfigurasi bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//conect db
mongoose.connect(config.database, {
    useNewUrlParser: true
});
app.set('secretKey', config.secret);

app.use(cors());

//home
app.get('/', function (req, res) {
    res.json({ message: "berada dihome" });
});


// route restApi
//prefix /api
app.use('/api', router);

app.listen(port, function () {
    console.log('port run on ' + port);
});

