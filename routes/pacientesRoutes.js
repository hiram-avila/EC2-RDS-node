// pacienteRoutes.js
import express from 'express';
const router = express.Router();

import {registrarPaciente, eliminarUsuario, iniciarSesion} from '../controllers/pacientesController.js';

// Ruta para el registro de pacientes
router.post('/registro', registrarPaciente);
router.post('/inicio', iniciarSesion);

router.delete('/usuarios/:id', eliminarUsuario);


// Otras rutas relacionadas con pacientes aquí...

export default router;
