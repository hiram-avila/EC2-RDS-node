// conexionMySQL.js
import mysql from 'mysql2/promise';

const db = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'registrousuarios',
  port: 3306
});

// No es necesario llamar a db.connect() en este caso

export default db;