// pacienteController.js
import db from '../conexionMySQL.js';

import bcrypt  from'bcrypt';
import jwt from 'jsonwebtoken'; // Importa jwt si estás utilizando ES6 modules


const registrarPaciente = async (req, res) => {
    try {
      const { nombre, correo, edad, contrasena } = req.body;
  
      // Generar un salt y encriptar la contraseña de forma asincrónica
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(contrasena, salt);
  
      // Insertar el usuario en la base de datos con la contraseña encriptada
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

    const iniciarSesion = async (req, res) => {
        const { correo, contrasena } = req.body;
    
        console.log(correo, contrasena);
        
        try {
        // Buscar al usuario en la base de datos por su correo electrónico
        const sql = 'SELECT id, nombre, contrasena FROM usuarios WHERE correo = ?';
        const result = await db.query(sql, [correo]);
    
        if (!result || result.length === 0) {
            return res.status(403).json({ message: 'Usuario no encontrado' });
        }
    
        const usuario = await result[0]; // Obtén el primer resultado
        console.log('estoy en usuario')
        console.log(usuario);
        const contrasenaValida = await bcrypt.compare(contrasena, usuario[0].contrasena);
    
        if (contrasenaValida) {
            // Las credenciales son válidas, generamos un token de autenticación
            const token = jwt.sign({ id: usuario.id, nombre: usuario.nombre }, 'secreto', { expiresIn: '1h' });
            console.log('me ejecuté');
            res.json({
                token,
                msg:'usuario logeado'
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

  
  

// Otras funciones de controlador relacionadas con pacientes aquí...

export { registrarPaciente, eliminarUsuario, iniciarSesion }; // Exporta directamente la función en lugar de un objeto
