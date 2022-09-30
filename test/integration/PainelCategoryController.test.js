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

// Factory to make Inventory with an Id
const makeCategory = (id) => {
  return models.Category.create({
    id,
    name: 'Pedais',
    description: 'Pedais e pedivelas',
    createdAt: new Date(),
    updatedAt: new Date()
  })
}

describe('PainelCategoryController Integration Tests', function () {
  beforeEach(() => {
    models.User.destroy({ where: {} })
    models.Category.destroy({ where: {} })
  })
  afterAll(() => {
    // models.User.destroy({ where: {} })
    models.sequelize.close()
  })
  afterEach(() => {
    models.Category.destroy({ where: {} })
    models.User.destroy({ where: {} })
  })

  test('should receive a 200 when access /painel/categoria with admin user and category dont exists', async () => {
    // Arrange
    await makeAdminUser(22)
    const agent = request.agent(app)
    await agent
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })
    // Act
    const res = await agent.get('/painel/categoria')
    // Assert
    expect(res.status).toBe(200)
    expect(res.header['content-type']).toBe('text/html; charset=utf-8')
  })

  test('should receive a 302 when access /painel/categoria with unautenticated user ', async () => {
    // Arrange

    // Act
    const res = await request(app).get('/painel/categoria')
    // Assert
    expect(res.statusCode).toBe(302)
    // expect(res.header['content-type']).toBe('text/plain; charset=utf-8')
  })

  test('should receive a 200 when access /painel/categoria with admin user and category exists', async () => {
    // Arrange
    await makeAdminUser(22)
    await makeCategory(22)
    const agent = request.agent(app)
    await agent
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })
    // Act
    const res = await agent.get('/painel/categoria')
    // Assert
    expect(res.status).toBe(200)
    expect(res.header['content-type']).toBe('text/html; charset=utf-8')
  })

  test('should receive a 200 when access /painel/categoria/add/form with admin user', async () => {
    // Arrange
    await makeAdminUser(22)
    const agent = request.agent(app)
    await agent
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })
    // Act
    const res = await agent.get('/painel/categoria/add/form')
    // Assert
    expect(res.status).toBe(200)
    expect(res.header['content-type']).toBe('text/html; charset=utf-8')
  })

  test('should receive a 200 when access /painel/categoria/:id with admin user', async () => {
    // Arrange
    await makeAdminUser(22)
    await makeCategory(22)
    const agent = request.agent(app)
    await agent
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })
    // Act
    const res = await agent.get('/painel/categoria/22')
    // Assert
    expect(res.status).toBe(200)
    expect(res.header['content-type']).toBe('text/html; charset=utf-8')
  })

  test('should redirect when access delete a category in /painel/categoria/deletar/:id with admin user', async () => {
    // Arrange
    await makeAdminUser(22)
    await makeCategory(22)
    const agent = request.agent(app)
    await agent
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })
    // Act
    const res = await agent.get('/painel/categoria/deletar/22')
    // Assert
    expect(res.status).toBe(302)
    expect(res.header['content-type']).toBe('text/plain; charset=utf-8')
  })

  test('should receive 404 when try to delete a missing category in /painel/categoria/deletar/:id with admin user', async () => {
    // Arrange
    await makeAdminUser(22)
    const agent = request.agent(app)
    await agent
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })
    // Act
    const res = await agent.get('/painel/categoria/deletar/22')
    // Assert
    expect(res.status).toBe(404)
    expect(res.header['content-type']).toBe('text/html; charset=utf-8')
  })

  test('should receive 201 when create a category in /painel/categoria/:id with admin user', async () => {
    // Arrange
    await makeAdminUser(22)
    const agent = request.agent(app)
    await agent
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })
    // Act
    const res = await agent
      .post('/painel/categoria/22')
      .send({ id: 22, nome: 'Pedais', description: 'Pedais e pedivelas', newItem: true })
    // Assert
    expect(res.status).toBe(201)
    expect(res.header['content-type']).toBe('text/html; charset=utf-8')
  })

  test('should receive 422 when create a category with wrong info in /painel/categoria/:id with admin user', async () => {
    // Arrange
    await makeAdminUser(22)
    const agent = request.agent(app)
    await agent
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })
    // Act
    const res = await agent
      .post('/painel/categoria/22')
      .send({ id: 22, nome: 1234, description: 'Pedais e pedivelas', newItem: true })
    // Assert
    expect(res.status).toBe(422)
    expect(res.header['content-type']).toBe('text/html; charset=utf-8')
  })

  // TODO: Update igual teste acima?

  test('should receive 201 when update a category in /painel/categoria/:id with admin user', async () => {
    // Arrange
    await makeAdminUser(22)
    const agent = request.agent(app)
    await agent
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })
    // Act
    const res = await agent
      .post('/painel/categoria/22')
      .send({ id: 22, nome: 'Novos Pedais', description: 'Pedais e pedivelas', newItem: false })
    // Assert
    expect(res.status).toBe(201)
    expect(res.header['content-type']).toBe('text/html; charset=utf-8')
  })

  test('should receive 422 when try to update a category with wrong info in /painel/categoria/:id with admin user', async () => {
    // Arrange
    await makeAdminUser(22)
    const agent = request.agent(app)
    await agent
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })
    // Act
    const res = await agent
      .post('/painel/categoria/22')
      .send({ id: 22, nome: 1234, description: 'Pedais e pedivelas', newItem: false })
    // Assert
    expect(res.status).toBe(422)
    expect(res.header['content-type']).toBe('text/html; charset=utf-8')
  })
})
