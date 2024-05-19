// conexionMySQL.js
import mysql from 'mysql2/promise';


async function conectarDB() {
  const db = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'registrousuarios',
    port: 3306
  });
  
  return db;
}

export default conectarDB;