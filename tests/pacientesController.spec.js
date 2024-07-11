import app from '../app'; // Asegúrate de importar tu aplicación express o servidor
import request from 'supertest';

describe('PacienteController', () => {

  test('debería registrar a un usuario', async () => {
    // Supongamos que tienes un usuario de prueba en tu base de datos de prueba
    const usuarioPrueba = {
      correo: 'test@gmail.com',
      contrasena: '123456',
      nombre: 'test',
      edad: 10
    };
    // Realiza una solicitud POST simulada a la ruta de inicio de sesión
    const response = await request(app)
      .post('/pacientes/registro')
      .send(usuarioPrueba);

    // Verifica que la respuesta tenga un código de estado 200
    expect(response.statusCode).toBe(200);

    // Verifica que la respuesta contenga un token y un mensaje
    
    expect(response.body).toHaveProperty('message', 'Paciente registrado con éxito');
});

    
 
});
