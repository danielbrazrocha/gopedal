/* eslint-disable no-undef */
const request = require('supertest')
const models = require('../../src/models/index')
const app = require('../../app.js')

describe('Integration Test LoginController', function () {
  afterAll(() => {
    models.sequelize.close()
  })
  afterEach(() => {
    models.User.destroy({ where: {} })
  })

  test('should receive a 200 when access /login', async () => {
    // Arrange
    // Act
    const res = await request(app).get('/login')
    // Assert
    expect(res.statusCode).toBe(200)
  })

  test('should receive a redirect 302 when logged and try to access /login', async () => {
    // Arrange
    await request(app)
      .post('/cadastro')
      .send({ nome: 'Daniel Gustavo', cpf: '29432901653', tel: '1111111111', email: '1234@teste.com', senha: 'ABCd123456', repeteSenha: 'ABCd123456' })
    await request(app)
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })
    // Act
    const res = await request(app)
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })
    // Assert
    expect(res.statusCode).toBe(302)
  })

  test('should receive a 302 when do login with correct data', async () => {
    // Arrange
    await request(app)
      .post('/cadastro')
      .send({ nome: 'Daniel Gustavo', cpf: '29432901653', tel: '1111111111', email: '1234@teste.com', senha: 'ABCd123456', repeteSenha: 'ABCd123456' })
    // Act
    const res = await request(app)
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })
    // Assert
    expect(res.statusCode).toBe(302)
  })

  test('should receive a 422 when do login with incorrect password', async () => {
    // Arrange
    await request(app)
      .post('/cadastro')
      .send({ nome: 'Daniel Gustavo', cpf: '29432901653', tel: '1111111111', email: '1234@teste.com', senha: 'ABCd123456', repeteSenha: 'ABCd123456' })
    // Act
    const res = await request(app)
      .post('/login')
      .send({ email: '1234@teste.com', password: 'wrong_password' })
    // Assert
    expect(res.statusCode).toBe(422)
  })

  test('should receive a 422 when do login with incorrect email', async () => {
    // Arrange
    await request(app)
      .post('/cadastro')
      .send({ nome: 'Daniel Gustavo', cpf: '29432901653', tel: '1111111111', email: '1234@teste.com', senha: 'ABCd123456', repeteSenha: 'ABCd123456' })
    // Act
    const res = await request(app)
      .post('/login')
      .send({ email: 'wrong_email', password: 'wrong_password' })
    // Assert
    expect(res.statusCode).toBe(422)
  })

  test('should redirect 302 when logout', async () => {
    // Arrange
    await request(app)
      .post('/cadastro')
      .send({ nome: 'Daniel Gustavo', cpf: '29432901653', tel: '1111111111', email: '1234@teste.com', senha: 'ABCd123456', repeteSenha: 'ABCd123456' })
    await request(app)
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })
    // Act
    const res = await request(app)
      .get('/login/logout')
    // Assert
    expect(res.statusCode).toBe(302)
  })
  // todo make a test with auth user accessing /usuario
})
