'use strict';

exports.berhasil = function(result, message, res) {
  var data = {
      'status': true,
      'code': 200,
      'pesan': message,
      'data': result
  };
  res.json(data);
  res.end();
};
