// conexionMySQL.js
import mysql from 'mysql2';

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'registrousuarios',
  port: 3306
});

db.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos MySQL: ', err);
  } else {
    console.log('Conexión exitosa a la base de datos MySQL');
  }
});

export default db;
