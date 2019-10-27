'use strict';
var express = require('express');
var app = express();
var response = require('../respon');
var connection = require('../config/db');
var jwt  = require('jsonwebtoken');
var secretKey = require('../config/secretKey');

app.set('secretKey', secretKey.secret);
exports.list = function(req, res) {
    connection.query('SELECT * FROM users', function (error, rows, fields){
        if(error){
            console.log(error)
        } else {
            response.berhasil(rows, res)
        }
    });
};

exports.login = function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    // console.log (req.body.email)
    connection.query('SELECT * FROM users WHERE username= ?',[username], function (error, result){
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