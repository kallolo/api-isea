'use strict';
var express     = require('express');
var app         = express();
var respon      = require('../respon');
var db          = require('../config/db');
var jwt         = require('jsonwebtoken');
var secretKey   = require('../config/secretKey');
var bcrypt      = require('bcrypt');

app.set('secretKey', secretKey.secret);

//Fungsi Tampilkan Semua Users
exports.getUsers = function(req, res) {
    var sql    = "SELECT username, email FROM users";
    db.query(sql, function (error, result, fields){
        if(error){
            console.log(error)
        } else {
            if(result.length > 0)
            {
                var message = "Berhasil Mangambil Semua Data User!";
                respon.berhasil(result, message, res)
            }
            else
            {
                var message = "Data User Tidak Ada!";
                respon.berhasil(result, message, res)
            }
        }
    });
};

//Fungsi Cari Users
exports.findUsers = function(req, res) {
    var id     = req.params.id;
    var sql    = "SELECT * FROM users where id = ?";
    db.query(sql,[ id ], function (error, result, fields){
        if(error){
            console.log(error)
        } else {
            if(result.length > 0)
            {
                var message = "Berhasil Mangambil Data User!";
                respon.berhasil(result, message, res)
            }
            else
            {
                var message = "Data User Tidak Ditemukan!";
                respon.berhasil(result, message, res)
            }
        }
    });
};

//Fungsi Tambah Users
exports.addUsers = function(req, res) {
    var username = req.body.username;
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    var password = hashedPassword;
    var sql      = "INSERT INTO users (username, password) values (?,?)";
    db.query(sql,[ username, password ],function (error, result, fields){
        if(error){
            console.log(error)
        } else {
            var message = "Berhasil Menambahkan User "+username+"!";
            respon.berhasil(result, message, res)
        }
    });
};

//Fungsi Ubah Users
exports.updateUsers = function(req, res) {
    var id       = req.params.id;
    var username = req.body.username;
    var password = req.body.password;
    var sql      = "UPDATE users SET username = ?, password = ? WHERE id = ?";
    db.query(sql,[ username, password, id ],function (error, result, fields){
        if(error){
            console.log(error)
        } else {
            if(result.affectedRows == 1){
                var message = "Berhasil Mengubah User!";
                respon.berhasil(result, message, res)
            }else{
                var message = "Gagal Mengubah User, Karena User Tidak Ditemukan!";
                respon.berhasil(result, message, res)
            }
        }
    });
};

//Fungsi Hapus Users
exports.deleteUsers = function(req, res) {
    var id       = req.params.id;
    var sql      = "DELETE FROM users WHERE id = ?";
    db.query(sql,[ id ], function (error, result, fields){
        if(error){
            console.log(error)
        } else {
            // console.log(result.affectedRows)
            if(result.affectedRows == 1){
                var message = "Berhasil Menghapus User!";
                respon.berhasil(result, message, res)
            }else{
                var message = "Gagal Menghapus User, Karena User Tidak Ditemukan!";
                respon.berhasil(result, message, res)
            }
            
        }
    });
};
//Fungsi Login Users
exports.loginUsers = function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    // console.log (req.body.email)
    var sql    = "SELECT * FROM users WHERE username= ?";
    db.query(sql,[username], function (error, result){
        if(error){
            console.log(error)
        }else{
            if(result.length >0)
            {
                var passwordIsValid = bcrypt.compareSync(password, result[0].password);
                if(!passwordIsValid)
                {
                    res.json({status: false, pesan:'Password Salah'});
                }
                else
                {
                    var token = jwt.sign({id: result[0].id, username: result[0].username, email: result[0].email , role: result[0].role}, app.get('secretKey'),{
                        expiresIn:"24h"
                    })
                    res.json({status: true, pesan:'Berhasil Login' , token: token});
                }
            }
            else
            {
                res.json({ status: false, pesan:'User Tidak Ditemukan'});
            }
            // respon.berhasil(result, res)
        }
    });
};

//Fungsi Profile Users
exports.profileUsers = function(req, res){
    // res.json(req.user);
    var result = req.user; // mengabil request login
    var message = "Berhasil Mendapatkan Profil "+req.user.username;
    respon.berhasil(result, message, res)
}