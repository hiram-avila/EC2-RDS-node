// pacienteRoutes.js
import express from 'express';
const router = express.Router();

import {registrarPaciente, eliminarUsuario, buscarUsuarios} from '../controllers/pacientesController.js';

// Ruta para el registro de pacientes
router.post('/registro', registrarPaciente);
router.delete('/usuarios/:id', eliminarUsuario);
router.get('/buscar', buscarUsuarios);


// Otras rutas relacionadas con pacientes aquí...

export default router;
