import app from '../app'; // Asegúrate de importar tu aplicación express o servidor
import request from 'supertest';

describe('PacienteController', () => {
  test('POST /ruta_de_registro_paciente should respond with a 200 status code', async () => {
    const response = await request(app)
      .post('/pacientes/registro')
      .send({ nombre: 'Nombre de prueba', correo: 'correo@prueba.com', edad: 30 });
    expect(response.statusCode).toBe(200);
  });

});
