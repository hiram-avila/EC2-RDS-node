// Importa el módulo 'db' desde conexionMySQL.js para realizar operaciones en la base de datos
import db from '../conexionMySQL.js';
import bcrypt from 'bcrypt'; // Importa el módulo bcrypt para el hashing de contraseñas
import jwt from 'jsonwebtoken'; // Importa el módulo jwt si estás utilizando ES6 modules

// Función para registrar un nuevo paciente
const registrarPaciente = async (req, res) => {
    try {
        // Extrae los datos del cuerpo de la solicitud
        const { nombre, correo, edad, contrasena } = req.body;

        // Genera un salt y encripta la contraseña de forma asincrónica
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(contrasena, salt);

        // Inserta el usuario en la base de datos con la contraseña encriptada
        const sql = 'INSERT INTO usuarios (nombre, correo, edad, contrasena) VALUES (?, ?, ?, ?)';
        const values = [nombre, correo, edad, hash];

        await db.query(sql, values);

        console.log('Paciente registrado con éxito');
        res.json({ message: 'Paciente registrado con éxito' });
    } catch (error) {
        console.error('Error al registrar al paciente: ', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const getPacientes = async(req, res) => {
    try {
        // Realizar una consulta para obtener todos los pacientes de la base de datos
        const sql = 'SELECT * FROM usuarios';
        const pacientes = await db.query(sql);

        // Verificar si se encontraron pacientes
        if (pacientes.length > 0) {
            res.json({ pacientes }); // Devolver la lista de pacientes en formato JSON
        } else {
           res.json({ message: 'No se encontraron pacientes' }); // Manejo si no se encuentran pacientes
        }
    } catch (error) {
        console.error('Error al obtener pacientes: ', error);
        res.status(500).json({ error: 'Error interno del servidor al obtener pacientes' });
  }
}


// Función para iniciar sesión de un paciente existente
const iniciarSesion = async (req, res) => {
  // Extrae correo y contraseña del cuerpo de la solicitud
  const { correo, contrasena } = req.body;

  try {
    // Busca al usuario en la base de datos por su correo electrónico
    const sql = 'SELECT id, nombre, contrasena FROM usuarios WHERE correo = ?';
    const result = await db.query(sql, [correo]);

    // Comprueba si el usuario existe en la base de datos
    if (!result || result.length === 0) {
      return res.status(403).json({ message: 'Usuario no encontrado' });
    }

    const usuario = await result[0]; // Obtiene el primer resultado
    const contrasenaValida = await bcrypt.compare(contrasena, usuario.contrasena);

    if (contrasenaValida) {
      // Las credenciales son válidas, genera un token de autenticación
      const token = jwt.sign({ id: usuario.id, nombre: usuario.nombre }, 'secreto', { expiresIn: '1h' });
      console.log('me ejecuté');
      res.json({
        token,
        msg: 'usuario logeado'
      });
    } else {
      // Credenciales inválidas
      res.status(401).json({ error: 'Credenciales inválidas' });
    }
  } catch (error) {
    console.error('Error al autenticar al usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Función para eliminar un usuario específico
const eliminarUsuario = (req, res) => {
    const { id } = req.params; // Captura el ID desde los parámetros de la URL
    const sql = 'DELETE FROM usuarios WHERE id = ?';
  
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error('Error al eliminar el usuario: ', err);
        return res.status(500).json({ error: 'Error interno del servidor al eliminar el usuario' });
      }
      
      if (result.affectedRows > 0) {
        console.log('Usuario eliminado con éxito');
        res.status(200).json({ message: 'Usuario eliminado con éxito' });
      } else {
        res.status(404).json({ error: 'No se encontró ningún usuario con ese ID' });
      }
    });
  };



// Exporta las funciones directamente en lugar de un objeto
export { registrarPaciente,
         eliminarUsuario,
          iniciarSesion,
          getPacientes
       };
