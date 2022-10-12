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

// Factory to make User_Payment with an Id
const makeUserPayment = (id) => {
  return models.User_Payment.create({
    id,
    UserId: id,
    payment_type: 'Cartao de Credito',
    provider: 'VISA',
    account_number: '4929913630080830',
    expiry: '11/2027',
    createdAt: new Date(),
    updatedAt: new Date()
  })
}
describe('UsuarioPagamentosController Integration Tests', function () {
  beforeEach(() => {
    models.User.destroy({ where: {} })
    models.User_Payment.destroy({ where: {} })
  })
  afterAll(() => {
    models.sequelize.close()
  })
  afterEach(() => {
    models.User_Payment.destroy({ where: {} })
    models.User.destroy({ where: {} })
  })

  test('should receive a 200 when access /usuario/pagamentos with admin user and payment dont exists', async () => {
    // Arrange
    await makeAdminUser(32)
    const agent = request.agent(app)
    await agent
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })
    // Act
    const res = await agent.get('/usuario/pagamentos')
    // Assert
    expect(res.status).toBe(200)
    expect(res.header['content-type']).toBe('text/html; charset=utf-8')
  })

  test('should receive a 302 when access /usuario/pagamentos with unautenticated user ', async () => {
    // Arrange

    // Act
    const res = await request(app).get('/usuario/pagamentos')
    // Assert
    expect(res.statusCode).toBe(302)
    // expect(res.header['content-type']).toBe('text/plain; charset=utf-8')
  })

  test('should receive a 200 when access /usuario/pagamentos with admin user', async () => {
    // Arrange
    await makeAdminUser(32)
    await makeUserPayment(32)
    const agent = request.agent(app)
    await agent
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })
    // Act
    const res = await agent.get('/usuario/pagamentos')
    // Assert
    expect(res.status).toBe(200)
    expect(res.header['content-type']).toBe('text/html; charset=utf-8')
  })

  test('should receive a 200 when access /usuario/pagamentos/add/form with admin user', async () => {
    // Arrange
    await makeAdminUser(32)
    const agent = request.agent(app)
    await agent
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })
    // Act
    const res = await agent.get('/usuario/pagamentos/add/form')
    // Assert
    expect(res.status).toBe(200)
    expect(res.header['content-type']).toBe('text/html; charset=utf-8')
  })

  test('should receive a 200 when access /usuario/pagamentos/:id with admin user', async () => {
    // Arrange
    await makeAdminUser(32)
    await makeUserPayment(32)
    const agent = request.agent(app)
    await agent
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })
    // Act
    const res = await agent.get('/usuario/pagamentos/32')
    // Assert
    expect(res.status).toBe(200)
    expect(res.header['content-type']).toBe('text/html; charset=utf-8')
  })

  test('should redirect when access delete a payment in /usuario/pagamentos/deletar/:id with admin user', async () => {
    // Arrange
    await makeAdminUser(32)
    await makeUserPayment(32)
    const agent = request.agent(app)
    await agent
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })
    // Act
    const res = await agent.get('/usuario/pagamentos/deletar/32')
    // Assert
    expect(res.status).toBe(302)
    expect(res.header['content-type']).toBe('text/plain; charset=utf-8')
  })

  test('should receive 422 when try to delete a missing payment in /usuario/pagamentos/deletar/:id with admin user', async () => {
    // Arrange
    await makeAdminUser(32)
    const agent = request.agent(app)
    await agent
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })
    // Act
    const res = await agent.get('/usuario/pagamentos/deletar/32')
    // Assert
    expect(res.status).toBe(422)
    expect(res.header['content-type']).toBe('text/html; charset=utf-8')
  })

  test('should receive 201 when create a payment in /usuario/pagamentos/:id with admin user', async () => {
    // Arrange
    await makeAdminUser(32)
    const agent = request.agent(app)
    await agent
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })
    // Act
    const res = await agent
      .post('/usuario/pagamentos/32')
      .send({
        UserId: 32,
        id: 32,
        payment_type: 'Cartao de Credito',
        provider: 'VISA',
        account_number: '4929913630080830',
        expiry: '11/2027',
        newItem: true
      })
    // Assert
    expect(res.status).toBe(201)
    expect(res.header['content-type']).toBe('text/html; charset=utf-8')
  })

  test('should receive 422 when create a payment with wrong info in /usuario/pagamentos/:id with admin user', async () => {
    // Arrange
    await makeAdminUser(32)
    const agent = request.agent(app)
    await agent
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })
    // Act
    const res = await agent
      .post('/usuario/pagamentos/32')
      .send({
        UserId: 32,
        id: 32,
        payment_type: 'Cartao de Credito',
        provider: 'VISA',
        account_number: 'wrong_info',
        expiry: '11/2027',
        newItem: true
      })
    // Assert
    expect(res.status).toBe(422)
    expect(res.header['content-type']).toBe('text/html; charset=utf-8')
  })

  test('should receive 201 when update a payment in /usuario/pagamentos/:id with admin user', async () => {
    // Arrange
    await makeAdminUser(32)
    const agent = request.agent(app)
    await agent
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })
    // Act
    const res = await agent
      .post('/usuario/pagamentos/32')
      .send({
        UserId: 32,
        id: 32,
        payment_type: 'Cartao de Credito',
        provider: 'VISA',
        account_number: '4929913630080830',
        expiry: '11/2027',
        newItem: false
      })
    // Assert
    expect(res.status).toBe(201)
    expect(res.header['content-type']).toBe('text/html; charset=utf-8')
  })

  test('should receive 422 when try to update a payment with wrong info in /usuario/pagamentos/:id with admin user', async () => {
    // Arrange
    await makeAdminUser(32)
    const agent = request.agent(app)
    await agent
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })
    // Act
    const res = await agent
      .post('/usuario/pagamentos/32')
      .send({
        UserId: 32,
        id: 32,
        payment_type: 'Cartao de Credito',
        provider: 'VISA',
        account_number: 'wrong_info',
        expiry: '11/2027',
        newItem: false
      })
    // Assert
    expect(res.status).toBe(422)
    expect(res.header['content-type']).toBe('text/html; charset=utf-8')
  })
})
