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

// Factory to make Discount with an Id
const makeDiscount = (id) => {
  return models.Discount.create({
    id,
    name: 'BLACKFRIDAY23',
    description: 'Cupom da campanha Black Friday 2023',
    discount_percent: 10,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date()
  })
}

describe('PainelDescontoController Integration Tests', function () {
  beforeEach(() => {
    models.User.destroy({ where: {} })
    models.Discount.destroy({ where: {} })
  })
  afterAll(() => {
    // models.User.destroy({ where: {} })
    models.sequelize.close()
  })
  afterEach(() => {
    models.Category.destroy({ where: {} })
    models.Discount.destroy({ where: {} })
  })

  test('should receive a 200 when access /painel/desconto with admin user and discount dont exists', async () => {
    // Arrange
    await makeAdminUser(23)
    const agent = request.agent(app)
    await agent
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })
    // Act
    const res = await agent.get('/painel/desconto')
    // Assert
    expect(res.status).toBe(200)
    expect(res.header['content-type']).toBe('text/html; charset=utf-8')
  })

  test('should receive a 302 when access /painel/desconto with unautenticated user ', async () => {
    // Arrange

    // Act
    const res = await request(app).get('/painel/desconto')
    console.log('res', res)
    // Assert
    expect(res.statusCode).toBe(302)
    // expect(res.header['content-type']).toBe('text/plain; charset=utf-8')
  })

  test('should receive a 200 when access /painel/desconto with admin user and discount exists', async () => {
    // Arrange
    await makeAdminUser(23)
    await makeDiscount(23)
    const agent = request.agent(app)
    await agent
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })
    // Act
    const res = await agent.get('/painel/desconto')
    // Assert
    expect(res.status).toBe(200)
    expect(res.header['content-type']).toBe('text/html; charset=utf-8')
  })

  test('should receive a 200 when access /painel/desconto/add/form with admin user', async () => {
    // Arrange
    await makeAdminUser(23)
    const agent = request.agent(app)
    await agent
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })
    // Act
    const res = await agent.get('/painel/desconto/add/form')
    // Assert
    expect(res.status).toBe(200)
    expect(res.header['content-type']).toBe('text/html; charset=utf-8')
  })

  test('should receive a 200 when access /painel/desconto/:id with admin user', async () => {
    // Arrange
    await makeAdminUser(23)
    await makeDiscount(23)
    const agent = request.agent(app)
    await agent
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })
    // Act
    const res = await agent.get('/painel/desconto/23')
    // Assert
    expect(res.status).toBe(200)
    expect(res.header['content-type']).toBe('text/html; charset=utf-8')
  })

  test('should redirect when access delete a discount in /painel/desconto/deletar/:id with admin user', async () => {
    // Arrange
    await makeAdminUser(23)
    await makeDiscount(23)
    const agent = request.agent(app)
    await agent
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })
    // Act
    const res = await agent.get('/painel/desconto/deletar/23')
    // Assert
    expect(res.status).toBe(302)
    expect(res.header['content-type']).toBe('text/plain; charset=utf-8')
  })

  test('should receive 404 when try to delete a missing discount in /painel/desconto/deletar/:id with admin user', async () => {
    // Arrange
    await makeAdminUser(23)
    const agent = request.agent(app)
    await agent
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })
    // Act
    const res = await agent.get('/painel/desconto/deletar/23')
    // Assert
    expect(res.status).toBe(404)
    expect(res.header['content-type']).toBe('text/html; charset=utf-8')
  })

  // test('should receive 201 when create a discount in /painel/desconto/:id with admin user', async () => {
  //   // Arrange
  //   await makeAdminUser(23)
  //   const agent = request.agent(app)
  //   await agent
  //     .post('/login')
  //     .send({ email: '1234@teste.com', password: 'ABCd123456' })
  //   // Act
  //   const res = await agent
  //     .post('/painel/desconto/23')
  //     .send({ name: 'BLACKFRIDAY23', description: 'Cupom da campanha Black Friday 2023', discount_percent: 10, active: true, newItem: true })
  //   // Assert
  //   expect(res.status).toBe(201)
  //   expect(res.header['content-type']).toBe('text/html; charset=utf-8')
  // })

  test('should receive 422 when create a discount with wrong info in /painel/desconto/:id with admin user', async () => {
    // Arrange
    await makeAdminUser(23)
    const agent = request.agent(app)
    await agent
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })
    // Act
    const res = await agent
      .post('/painel/desconto/23')
      .send({ id: 23, nome: 1234, description: 'Pedais e pedivelas', discount_percent: 10, active: true, newItem: true })
    // Assert
    expect(res.status).toBe(422)
    expect(res.header['content-type']).toBe('text/html; charset=utf-8')
  })

  // test('should receive 201 when update a discount in /painel/desconto/:id with admin user', async () => {
  //   // Arrange
  //   await makeAdminUser(23)
  //   await makeDiscount(23)
  //   const agent = request.agent(app)
  //   await agent
  //     .post('/login')
  //     .send({ email: '1234@teste.com', password: 'ABCd123456' })
  //   // Act
  //   const res = await agent
  //     .post('/painel/desconto/23')
  //     .send({ id: 23, nome: 'Novos Pedais', description: 'Pedais e pedivelas', discount_percent: 10, active: true, newItem: false })
  //   // Assert
  //   expect(res.status).toBe(201)
  //   expect(res.header['content-type']).toBe('text/html; charset=utf-8')
  // })

  test('should receive 422 when try to update a discount with wrong info in /painel/desconto/:id with admin user', async () => {
    // Arrange
    await makeAdminUser(23)
    const agent = request.agent(app)
    await agent
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })
    // Act
    const res = await agent
      .post('/painel/desconto/23')
      .send({ id: 23, nome: 1234, description: 'Pedais e pedivelas', discount_percent: 10, active: true, newItem: false })
    // Assert
    expect(res.status).toBe(422)
    expect(res.header['content-type']).toBe('text/html; charset=utf-8')
  })
})
