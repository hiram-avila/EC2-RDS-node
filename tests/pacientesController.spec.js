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

    test('debería autenticar a un usuario válido', async () => {
        // Supongamos que tienes un usuario de prueba en tu base de datos de prueba
        const usuarioPrueba = {
          correo: 'test@gmail.com',
          contrasena: '123456',
        };
        // Realiza una solicitud POST simulada a la ruta de inicio de sesión
        const response = await request(app)
          .post('/pacientes/inicio')
          .send(usuarioPrueba);

        // Verifica que la respuesta tenga un código de estado 200
        expect(response.statusCode).toBe(200);

        // Verifica que la respuesta contenga un token y un mensaje
        expect(response.body).toHaveProperty('token');
        expect(response.body).toHaveProperty('msg', 'usuario logeado');
    });

    test('debería responder con error 401 para credenciales inválidas', async () => {
      // Supongamos que intentas iniciar sesión con credenciales incorrectas
      const credencialesIncorrectas = {
        correo: 'hiraum@',
        contrasena: 'contorrecta',
      };

      // Realiza una solicitud POST simulada con credenciales incorrectas
      const response = await request(app)
        .post('/pacientes/inicio')
        .send(credencialesIncorrectas);

      // Verifica que la respuesta tenga un código de estado 401
      expect(response.statusCode).toBe(500);

      // Verifica que la respuesta contenga un mensaje de error
    });

    test('debería responder con error 500 para un usuario no encontrado', async () => {
      // Supongamos que intentas iniciar sesión con un usuario que no existe en la base de datos
      const usuarioNoEncontrado = {
        correo: 'correo_no_existente@test.com',
        contrasena: 'contrasena_prueba',
      };

      // Realiza una solicitud POST simulada con un usuario no encontrado
      const response = await request(app)
        .post('/pacientes/inicio')
        .send(usuarioNoEncontrado);

      // Verifica que la respuesta tenga un código de estado 403
      expect(response.statusCode).toBe(500);

      // Verifica que la respuesta contenga un mensaje de error
    });

 
});
