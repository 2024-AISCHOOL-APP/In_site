const mysql = require("mysql2");
require("dotenv").config();

// MySQL 연결 설정
const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

conn.connect((err) => {
  if (err) {
    console.error("MySQL 연결 오류:", err);
  } else {
    console.log("MySQL 연결 성공!");
  }
});

module.exports = conn;