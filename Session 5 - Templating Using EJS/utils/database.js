// get the client
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost', // 127.0.0.1
    user: 'root',
    database: 'student_db'
});

module.exports = connection;

