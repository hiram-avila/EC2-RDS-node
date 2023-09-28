// pacienteController.js
import db from '../conexionMySQL.js';

const registrarPaciente = (req, res) => {
  const { nombre, correo, edad } = req.body;

  // Validar los datos del paciente (agregar validación adicional según sea necesario)
  // Insertar el paciente en la base de datos
  const sql = 'INSERT INTO usuarios (nombre, correo, edad) VALUES (?, ?, ?)';
  const values = [nombre, correo, edad];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error al registrar al paciente: ', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      console.log('Paciente registrado con éxito');
      res.json({ message: 'Paciente registrado con éxito' });
    }
  });
}

const eliminarUsuario = (req, res) => {
    const { id } = req.params; // Captura el ID desde los parámetros de la URL
  
    // Realiza una consulta SQL para eliminar al usuario con el ID proporcionado
    const sql = 'DELETE FROM usuarios WHERE id = ?';
  
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error('Error al eliminar el usuario: ', err);
        res.status(500).json({ error: 'Error interno del servidor' });
      } else {
        if (result.affectedRows > 0) {
          console.log('Usuario eliminado con éxito');
          res.json({ message: 'Usuario eliminado con éxito' });
        } else {
          // Si no se encontró ningún usuario con ese ID
          res.status(404).json({ error: 'Usuario no encontrado' });
        }
      }
    });
  };

  const buscarUsuarios = (req, res) => {
    const { nombre } = req.query; // Captura el parámetro de consulta 'nombre'
  
    // Realiza una consulta SQL para buscar usuarios por nombre
    const sql = 'SELECT * FROM usuarios WHERE nombre LIKE ?';
    const searchTerm = `%${nombre}%`; // Usamos % para buscar coincidencias parciales
  
    db.query(sql, [searchTerm], (err, result) => {
      if (err) {
        console.error('Error al buscar usuarios: ', err);
        res.status(500).json({ error: 'Error interno del servidor' });
      } else {
        // Retorna la lista de usuarios encontrados
        res.json(result);
      }
    });
  };
  

// Otras funciones de controlador relacionadas con pacientes aquí...

export { registrarPaciente, eliminarUsuario, buscarUsuarios }; // Exporta directamente la función en lugar de un objeto
