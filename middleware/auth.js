var express = require('express'),
    app = express(),
    jwt = require('jsonwebtoken'),
    secretKey = require('../config/secretKey');

app.set('secretKey', secretKey.secret);
module.exports = {
  cekToken: (req,res,next) => {
    var token = req.headers['authorization'];
    if(token){
        jwt.verify(token, app.get('secretKey'), function(err, decoded){
            if(err)
            return res.status(401).json({success:false, message: 'masalah dengan token'});
            else{
                req.user = decoded;
                
                // console.log(req.user);
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
  }
};