var mysql = require('mysql');

var db = mysql.createConnection({
    host: "192.168.10.66",
    user: "root",
    password: "P@ssw0rd",
    database: "isea",
    // socketPath: "/opt/lampp/var/mysql/mysql.sock"
});

db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});
module.exports = db;