import express from 'express';
const router = express.Router();

import {registrarPaciente, eliminarUsuario, iniciarSesion, getPacientes} from '../controllers/pacientesController.js';

router.post('/registro', registrarPaciente); 
router.post('/inicio', iniciarSesion); 

router.delete('/usuarios/:id', eliminarUsuario);

router.get('/pacientes', getPacientes);

router.get('/', (req, res) => {
    res.json({message: 'se ha  realizada con exito!!'});
});

export default router;
