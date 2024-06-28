import db from '../conexionMySQL.js';
import bcrypt from 'bcrypt'; 
import jwt from 'jsonwebtoken'; 

const registrarPaciente = async (req, res) => {

    try {
      
        const { nombre, correo, edad, contrasena } = req.body;

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(contrasena, salt);

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
        const sql = 'SELECT * FROM usuarios';
        const pacientes = await db.query(sql);

        if (pacientes.length > 0) {
            res.json({ pacientes }); 
        } else {
           res.json({ message: 'No se encontraron pacientes' }); 
        }
    } catch (error) {
        console.error('Error al obtener pacientes: ', error);
        res.status(500).json({ error: 'Error interno del servidor al obtener pacientes' });
  }
}


// Función para iniciar sesión de un paciente existente
async function iniciarSesion(req, res) {
  const { correo, contrasena } = req.body;

  try {
    console.log('Iniciando búsqueda de usuario con correo:', correo);
    const sql = 'SELECT id, nombre, contrasena FROM usuarios WHERE correo = ?';
    const [result] = await db.query(sql, [correo]);

    // Verificar el resultado de la consulta
    console.log('Resultado de la consulta:', result);

    if (!result || result.length === 0) {
      console.log('Usuario no encontrado');
      return res.status(403).json({ message: 'Usuario no encontrado' });
    }

    const usuario = result[0];
    console.log('Usuario encontrado:', usuario);

    if (!contrasena || !usuario.contrasena) {
      console.log('Contraseña proporcionada o almacenada no definida');
      return res.status(400).json({ error: 'Contraseña no proporcionada o almacenada incorrectamente' });
    }

    console.log('Contraseña proporcionada:', contrasena);
    console.log('Contraseña almacenada:', usuario.contrasena);

    const contrasenaValida = await bcrypt.compare(contrasena, usuario.contrasena);

    if (contrasenaValida) {
      const token = jwt.sign({ id: usuario.id, nombre: usuario.nombre }, 'secreto', { expiresIn: '1h' });
      console.log('Credenciales válidas, usuario logeado:', usuario.nombre);
      res.json({
        token,
        msg: 'usuario logeado'
      });
    } else {
      console.log('Credenciales inválidas');
      res.status(401).json({ error: 'Credenciales inválidas' });
    }
  } catch (error) {
    console.error('Error al autenticar al usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}


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
