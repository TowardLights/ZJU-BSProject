const mysql = require('mysql');
const config = require('./dbconfig').db;

module.exports = mysql.createConnection(config);