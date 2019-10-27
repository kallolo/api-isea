'use strict';

var response = require('./respon');
var connection = require('./config/db');

exports.users = function(req, res) {
    connection.query('SELECT * FROM users', function (error, result, fields){
        if(error){
            console.log(error)
        } else {
            response.berhasil(result, res)
        }
    });
};

exports.index = function(req, res) {
    response.berhasil("API ISEA Terhubung", res)
};