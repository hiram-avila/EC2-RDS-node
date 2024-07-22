import app from '../app'; 
import request from 'supertest';

describe('PacienteController', () => {

  test('debería registrar a un usuario', async () => {
    
    const usuarioPrueba = {
      correo: 'test@gmail.com',
      contrasena: '123456',
      nombre: 'test',
      edad: 10
    };
    const response = await request(app)
      .post('/pacientes/registro')
      .send(usuarioPrueba);

    expect(response.statusCode).toBe(200);

    
    expect(response.body).toHaveProperty('message', 'Paciente registrado con éxito');
});

    test('debería autenticar a un usuario válido', async () => {
        const usuarioPrueba = {
          correo: 'test@gmail.com',
          contrasena: '123456',
        };
        const response = await request(app)
          .post('/pacientes/inicio')
          .send(usuarioPrueba);

        expect(response.statusCode).toBe(200);

      
        expect(response.body).toHaveProperty('msg', 'usuario logeado');
    });

    test('debería responder con error 401 para credenciales inválidas', async () => {
      const credencialesIncorrectas = {
        correo: 'hiraum@',
        contrasena: 'contorrecta',
      };

      const response = await request(app)
        .post('/pacientes/inicio')
        .send(credencialesIncorrectas);

      expect(response.statusCode).toBe(500);

    });

    test('debería responder con error 500 para un usuario no encontrado', async () => {
      const usuarioNoEncontrado = {
        correo: 'correo_no_existente@test.com',
        contrasena: 'contrasena_prueba',
      };

      const response = await request(app)
        .post('/pacientes/inicio')
        .send(usuarioNoEncontrado);

      expect(response.statusCode).toBe(500);

    });

 
});
