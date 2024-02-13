// Importar módulos y configuraciones necesarias
import express from 'express';
import pacientesRoutes from './routes/pacientesRoutes.js';

// Inicializar la aplicación Express
const app = express();

// Configuración de middleware para analizar las solicitudes entrantes en formato JSON
app.use(express.json());

// Configuración de las rutas para el manejo de pacientes
app.use('/pacientes', pacientesRoutes);

// Configuración adicional de Express...
// ...

// Exportar la aplicación configurada
export default app;
