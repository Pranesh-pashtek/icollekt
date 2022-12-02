const mysql = require("mysql2");
require('dotenv').config();

var mysqlConnection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DATABASE_NAME,
  multipleStatements: true
});

mysqlConnection.connect(err => {
  if (err) throw err;
  console.log("Database connected succesfully!..");
});

module.exports = mysqlConnection;