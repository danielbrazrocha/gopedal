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
    tel: '11555551111',
    email: '1234@teste.com',
    birthdate: '1980-01-01',
    createdAt: new Date(),
    updatedAt: new Date()
  })
}

// Factory to make User_Address with an Id
const makeUserAddress = (id) => {
  return models.User_Address.create({
    id,
    UserId: id,
    description: 'Casa do Administrador',
    street: 'Rua dos Bobos',
    number: 0,
    details: 'Detalhes da Casa do Admin',
    CEP: '11123-123',
    country: 'Brasil',
    createdAt: new Date(),
    updatedAt: new Date()
  })
}
describe('UsuarioEnderecosController Integration Tests', function () {
  beforeEach(() => {
    models.User.destroy({ where: {} })
    models.User_Address.destroy({ where: {} })
  })
  afterAll(() => {
    models.sequelize.close()
  })
  afterEach(() => {
    models.User_Address.destroy({ where: {} })
    models.User.destroy({ where: {} })
  })

  test('should receive a 200 when access /usuario/enderecos with admin user and address dont exists', async () => {
    // Arrange
    await makeAdminUser(24)
    const agent = request.agent(app)
    await agent
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })
    // Act
    const res = await agent.get('/usuario/enderecos')
    // Assert
    expect(res.status).toBe(200)
    expect(res.header['content-type']).toBe('text/html; charset=utf-8')
  })

  test('should receive a 302 when access /usuario/enderecos with unautenticated user ', async () => {
    // Arrange

    // Act
    const res = await request(app).get('/usuario/enderecos')
    // Assert
    expect(res.statusCode).toBe(302)
    // expect(res.header['content-type']).toBe('text/plain; charset=utf-8')
  })

  test('should receive a 200 when access /usuario/enderecos with admin user', async () => {
    // Arrange
    await makeAdminUser(31)
    await makeUserAddress(31)
    const agent = request.agent(app)
    await agent
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })
    // Act
    const res = await agent.get('/usuario/enderecos')
    // Assert
    expect(res.status).toBe(200)
    expect(res.header['content-type']).toBe('text/html; charset=utf-8')
  })

  test('should receive a 200 when access /usuario/enderecos/add/form with admin user', async () => {
    // Arrange
    await makeAdminUser(31)
    const agent = request.agent(app)
    await agent
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })
    // Act
    const res = await agent.get('/usuario/enderecos/add/form')
    // Assert
    expect(res.status).toBe(200)
    expect(res.header['content-type']).toBe('text/html; charset=utf-8')
  })

  test('should receive a 200 when access /usuario/enderecos/:id with admin user', async () => {
    // Arrange
    await makeAdminUser(31)
    await makeUserAddress(31)
    const agent = request.agent(app)
    await agent
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })
    // Act
    const res = await agent.get('/usuario/enderecos/31')
    // Assert
    expect(res.status).toBe(200)
    expect(res.header['content-type']).toBe('text/html; charset=utf-8')
  })

  test('should redirect when access delete a address in /usuario/enderecos/deletar/:id with admin user', async () => {
    // Arrange
    await makeAdminUser(31)
    await makeUserAddress(31)
    const agent = request.agent(app)
    await agent
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })
    // Act
    const res = await agent.get('/usuario/enderecos/deletar/31')
    // Assert
    expect(res.status).toBe(302)
    expect(res.header['content-type']).toBe('text/plain; charset=utf-8')
  })

  test('should receive 422 when try to delete a missing address in /usuario/enderecos/deletar/:id with admin user', async () => {
    // Arrange
    await makeAdminUser(31)
    const agent = request.agent(app)
    await agent
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })
    // Act
    const res = await agent.get('/usuario/enderecos/deletar/31')
    // Assert
    expect(res.status).toBe(422)
    expect(res.header['content-type']).toBe('text/html; charset=utf-8')
  })

  test('should receive 201 when create a address in /usuario/enderecos/:id with admin user', async () => {
    // Arrange
    await makeAdminUser(31)
    const agent = request.agent(app)
    await agent
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })
    // Act
    const res = await agent
      .post('/usuario/enderecos/31')
      .send({
        UserId: 31,
        id: 31,
        description: 'Casa do Administrador',
        street: 'Rua dos Bobos',
        number: 0,
        details: 'Detalhes da Casa do Admin',
        CEP: '11123-123',
        country: 'Brasil',
        newItem: true
      })
    // Assert
    expect(res.status).toBe(201)
    expect(res.header['content-type']).toBe('text/html; charset=utf-8')
  })

  test('should receive 422 when create a address with wrong info in /usuario/enderecos/:id with admin user', async () => {
    // Arrange
    await makeAdminUser(31)
    const agent = request.agent(app)
    await agent
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })
    // Act
    const res = await agent
      .post('/usuario/enderecos/31')
      .send({
        id: 31,
        UserId: 31,
        description: 'Casa do Administrador',
        street: 'Rua dos Bobos',
        number: 'wrong_info',
        details: 'Detalhes da Casa do Admin',
        CEP: '11123-123',
        country: 'Brasil',
        newItem: true
      })
    // Assert
    expect(res.status).toBe(422)
    expect(res.header['content-type']).toBe('text/html; charset=utf-8')
  })

  test('should receive 201 when update a address in /usuario/enderecos/:id with admin user', async () => {
    // Arrange
    await makeAdminUser(31)
    const agent = request.agent(app)
    await agent
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })
    // Act
    const res = await agent
      .post('/usuario/enderecos/31')
      .send({
        id: 31,
        UserId: 31,
        description: 'Casa do Administrador',
        street: 'Rua dos Bobos',
        number: 0,
        details: 'Detalhes da Casa do Admin',
        CEP: '11123-123',
        country: 'Brasil',
        newItem: false
      })
    // Assert
    expect(res.status).toBe(201)
    expect(res.header['content-type']).toBe('text/html; charset=utf-8')
  })

  test('should receive 422 when try to update a address with wrong info in /usuario/enderecos/:id with admin user', async () => {
    // Arrange
    await makeAdminUser(31)
    const agent = request.agent(app)
    await agent
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })
    // Act
    const res = await agent
      .post('/usuario/enderecos/31')
      .send({
        id: 31,
        UserId: 31,
        description: 'Casa do Administrador',
        street: 'Rua dos Bobos',
        number: 'wrong_info',
        details: 'Detalhes da Casa do Admin',
        CEP: '11123-123',
        country: 'Brasil',
        newItem: false
      })
    // Assert
    expect(res.status).toBe(422)
    expect(res.header['content-type']).toBe('text/html; charset=utf-8')
  })
})
