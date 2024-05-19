// conexionMySQL.js
import mysql from 'mysql2/promise';


async function db() {
  const database = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'registrousuarios',
    port: 3306
  });
  
  return database;
}

export default db;