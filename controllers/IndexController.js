'use strict';
var respon = require('../respon');

exports.index = function(req, res) {
    var message = "API ISEA Terhubung";
    res.json({ status: true, code: 200, pesan:message});
};