var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var router = express.Router();
var port = process.env.PORT || 3000;

//      Konfigurasi bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//router
router.get('/', function (req, res) {
    res.json({ message: "berada dihome" });
});
router.get('/users', function (req, res) {
    res.json({ username: "mustajib" });
});

//prefix api
app.use('/api', router);

app.listen(port);
console.log('port run on ' + port);
