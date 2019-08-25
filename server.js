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
//login
router.post('/login', function(req,res){
    User.findOne({
       email : req.body.email 
    }, function(err, user){
        if(err) throw err;

        if(!user){
            res.json({ success: false, message:'User Tidak Ditemukan'});
        }
        else
        {
            //harusnya passowrd dihash
            if(user.password != req.body.password)
            {
                res.json({success: false, message:'Password Salah'});
            }
            else
            {
                //membuat token
                var token = jwt.sign({user}, app.get('secretKey'), {
                    expiresIn:"24h"
                });

                //ngirim balik token
                res.json({
                    success : true,
                    message : 'Token Berhasil Didapatkan !',
                    token : token
                })
            }
        }
    });
});

//home
router.get('/', function (req, res) {
    res.json({ message: "berada dihome" });
});

//.midelware verifikasi token
//Protecksi route dengan token
router.use(function(req, res, next){
    // mengambil token ada beberapa Cara
// req.body.token || req.query.token || req.headers['authorization']
    var token = req.headers['authorization'];

    //decode token
    if(token){
        jwt.verify(token, app.get('secretKey'), function(err, decoded){
            if(err)
            return res.json({success:false, message: 'masalah dengan token'});
            else{
                req.decoded =decoded;

                // cek apakah token sudah expired
                if(decoded.exp <= Date.now()/1000){
                    return res.status(400).send({
                        success :false,
                        message :'token sudah expire',
                        date    : Date.now()/1000,
                        exp     : decoded.exp
                    });
                }
                next();
            }
        });
    }else{
        return res.status(403).send({
            success:false,
            message:'token tidak tersedia'
        });
    }
});

//daftar users
router.get('/users', function (req, res) {
    User.find({}, function(err, users){
        res.json(users);
    });
});

//lihat profil yang login
router.get('/profile', function(req, res){
    // res.json({ message: "cekfungsi" });
    res.json(req.decoded.user);
});
//prefix /api
app.use('/api', router);

app.listen(port);
console.log('port run on ' + port);
