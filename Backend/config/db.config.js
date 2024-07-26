const mysql = require("mysql2");
const dbConfig = require("./db.config.js");

const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "todo_app",
  dialect: "mysql2",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

module.exports = connection;
