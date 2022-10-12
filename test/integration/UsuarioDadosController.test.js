/* eslint-disable no-undef */
const request = require('supertest')
const models = require('../../src/models/index')
const app = require('../../app.js')
const bcrypt = require('bcryptjs')

// Factory to make admin User
const makeAdminUser = (id) => {
  return models.User.create({
    id,
    kind: 'admin',
    name: 'Daniel Gustavo',
    password: bcrypt.hashSync('ABCd123456', 10),
    cpf: '29432901653',
    tel: '11999994444',
    email: '1234@teste.com',
    birthdate: '1980-01-01',
    createdAt: new Date(),
    updatedAt: new Date()
  })
}

describe('UsuarioEnderecosController Integration Tests', function () {
  beforeEach(() => {
    models.User.destroy({ where: {} })
  })
  afterAll(() => {
    models.sequelize.close()
  })
  afterEach(() => {
    models.User.destroy({ where: {} })
  })

  test('should receive a 200 when access /usuario/dados with admin user and userdata dont exists', async () => {
    // Arrange
    await makeAdminUser(32)
    const agent = request.agent(app)
    await agent
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })
    // Act
    const res = await agent.get('/usuario/dados')
    // Assert
    expect(res.status).toBe(200)
    expect(res.header['content-type']).toBe('text/html; charset=utf-8')
  })

  test('should receive a 302 when access /usuario/dados with unautenticated user ', async () => {
    // Arrange

    // Act
    const res = await request(app).get('/usuario/dados')
    // Assert
    expect(res.statusCode).toBe(302)
    // expect(res.header['content-type']).toBe('text/plain; charset=utf-8')
  })

  test('should redirect when access delete a userdata in /usuario/dados/deletar/:id with admin user', async () => {
    // Arrange
    await makeAdminUser(32)
    const agent = request.agent(app)
    await agent
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })
    // Act
    const res = await agent.get('/usuario/dados/deletar/32')
    // Assert
    expect(res.status).toBe(302)
    expect(res.header['content-type']).toBe('text/plain; charset=utf-8')
  })

  test('should receive 422 when try to delete a missing userdata in /usuario/dados/deletar/:id with admin user', async () => {
    // Arrange
    await makeAdminUser(32)
    const agent = request.agent(app)
    await agent
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })
    // Act
    const res = await agent.get('/usuario/dados/deletar/33')
    // Assert
    expect(res.status).toBe(422)
    expect(res.header['content-type']).toBe('text/html; charset=utf-8')
  })

  test('should receive 201 when update a userdata in /usuario/dados/:id with admin user', async () => {
    // Arrange
    await makeAdminUser(32)
    const agent = request.agent(app)
    await agent
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })
    // Act
    const res = await agent
      .post('/usuario/dados/32')
      .send({
        id: 32,
        nome: 'New User Name',
        senha: 'ABCd123456',
        repeteSenha: 'ABCd123456',
        cpf: '29432901653',
        tel: '11999994444',
        email: '1234@teste.com'
      })
      // console.log(res.res)
    // Assert
    expect(res.status).toBe(201)
    expect(res.header['content-type']).toBe('text/html; charset=utf-8')
  })

  test('should receive 422 when try to update a userdata with wrong info in /usuario/dados/:id with admin user', async () => {
    // Arrange
    await makeAdminUser(32)
    const agent = request.agent(app)
    await agent
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })
    // Act
    const res = await agent
      .post('/usuario/dados/32')
      .send({
        id: 32,
        nome: 'New User Name',
        senha: 'ABCd123456',
        repeteSenha: 'ABCd123456',
        cpf: 'wrong_info',
        tel: '11999994444',
        email: '1234@teste.com'
      })
    // Assert
    expect(res.status).toBe(422)
    expect(res.header['content-type']).toBe('text/html; charset=utf-8')
  })
})
