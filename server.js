var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt  = require('jsonwebtoken');
var cors = require('cors');
var app = express();
var router = express.Router();
var port = process.env.PORT || 3000;

//set up local
var config = require('./app/config');
var User = require('./app/model/user');

//      Konfigurasi bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//conect db
mongoose.connect(config.database, {
   useNewUrlParser:true
});
app.set('secretKey', config.secret);
app.use(cors());

//router

//home
router.get('/', function (req, res) {
    res.json({ message: "berada dihome" });
});
//user
router.get('/users', function (req, res) {
    User.find({}, function(err, users){
        res.json(users);
    });
});
//login
router.post('/login', function(req,res){
    User.findOne({
       email : req.body.email 
    }, function(err, user){
        if(err) throw err;

        if(!user){
            res.json({ succes: false, message:'User Tidak Ditemukan'});
        }
        else
        {
            //harusnya passowrd dihash
            if(user.password != req.body.password)
            {
                res.json({succes: false, message:'Password Salah'});
            }
            else
            {
                //membuat token
                var token = jwt.sign({user}, app.get('secretKey'), {
                    expiresIn:"24h"
                });

                //ngirim balik token
                res.json({
                    succes : true,
                    message : 'Token Berhasil Didapatkan !',
                    token : token
                })
            }
        }
    });
});

//prefix /api
app.use('/api', router);

app.listen(port);
console.log('port run on ' + port);
