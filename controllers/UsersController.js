'use strict';
var express     = require('express');
var app         = express();
var response    = require('../respon');
var connection  = require('../config/db');
var jwt         = require('jsonwebtoken');
var secretKey   = require('../config/secretKey');

app.set('secretKey', secretKey.secret);

//Fungsi Tampilkan Semua Users
exports.dataUsers = function(req, res) {
    var sql    = "SELECT * FROM users";
    connection.query(sql, function (error, result, fields){
        if(error){
            console.log(error)
        } else {
            response.berhasil(result, res)
        }
    });
};

//Fungsi Cari Users
exports.cariUsers = function(req, res) {
    var user_id     = req.params.user_id;
    var sql         = "SELECT * FROM users where id = ?";
    connection.query(sql,[ user_id ], function (error, result, fields){
        if(error){
            console.log(error)
        } else{
            response.berhasil(result, res)
        }
    });
};

//Fungsi Tambah Users
exports.tambahUsers = function(req, res) { 
    var username = req.body.username;
    var password = req.body.password;
    var sql    = "INSERT INTO users (username, password) values (?,?)";
    connection.query(sql,[ username, password ],function (error, result, fields){
        if(error){
            console.log(error)
        } else{
            response.berhasil("Berhasil menambahkan user!", res)
        }
    });
};

//Fungsi Login Users
exports.loginUsers = function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    // console.log (req.body.email)
    var sql    = "SELECT * FROM users WHERE username= ?";
    connection.query(sql,[username], function (error, result){
        if(error){
            console.log(error)
        }else{
            if(result.length >0)
            {
                if(result[0].password != password)
                {
                    res.json({status: false, pesan:'Password Salah'});
                }
                else
                {
                    var token = jwt.sign({result}, app.get('secretKey'),{
                        expiresIn:"24h"
                    })
                    res.json({status: true, pesan:'Berhasil Login' , token: token});
                }
            }
            else
            {
                res.json({ status: false, pesan:'User Tidak Ditemukan'});
            }
            // response.berhasil(result, res)
        }
    });
};