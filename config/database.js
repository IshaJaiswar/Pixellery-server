const mysql = require('mysql2');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "isha@1",
    database: "pixellery"
});

module.exports = con;