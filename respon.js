'use strict';

exports.berhasil = function(result, res) {
  var data = {
      'status': true,
      'code': 200,
      'pesan': "Berhasil",
      'data': result
  };
  res.json(data);
  res.end();
};
