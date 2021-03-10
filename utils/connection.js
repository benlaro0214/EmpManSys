const mysql = require('mysql');
// Connection for SQL database
module.exports = mysql.createConnection({
    host: "localhost",
    port: 3306,
  
    // Your username
    user: 'root',
  
    // Your password
    password: '1234',
    database: 'employee_db'
  });