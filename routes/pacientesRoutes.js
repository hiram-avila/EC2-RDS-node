// Importar el módulo 'express' para manejar las rutas
import express from 'express';
const router = express.Router();

// Importar controladores para pacientes desde pacientesController.js
import {registrarPaciente, eliminarUsuario, iniciarSesion, getPacientes} from '../controllers/pacientesController.js';

// Rutas para el registro y el inicio de sesión de pacientes
router.post('/registro', registrarPaciente); // Ruta para registrar un nuevo paciente
router.post('/inicio', iniciarSesion); // Ruta para iniciar sesión de un paciente existente

// Ruta para eliminar un usuario específico
router.delete('/usuarios/:id', eliminarUsuario);

// Ruta para obtener todos los pacientes
router.get('/pacientes', getPacientes);

// Exportar el enrutador configurado
export default router;
