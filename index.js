// Importa la aplicación configurada desde el archivo app.js
import app from './app.js';

// Define el puerto en el que se va a ejecutar el servidor
const PORT = 3000;

// Inicia el servidor y escucha las solicitudes entrantes en el puerto especificado
app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});
