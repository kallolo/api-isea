
User = require("../model/user");
exports.index = function (req, res) {
    User.find({}, function(err, users){
                res.json(users);
    });
 };