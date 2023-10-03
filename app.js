import express from 'express';
import pacientesRoutes from './routes/pacientesRoutes.js'
const app = express();

app.use(express.json()); 
 app.use('/pacientes', pacientesRoutes); // Utiliza la importación correcta

// Resto de la configuración de Express...


 

export default app