// conexionMySQL.js
import mysql from 'mysql2/promise';


const db = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'registrousuarios',
  port: 3306

});

console.log("conexion exitosa")

export default db;