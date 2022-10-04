/* eslint-disable no-undef */
const request = require('supertest')
const models = require('../../src/models/index')
const app = require('../../app.js')
const bcrypt = require('bcryptjs')

// Factory to make User without privileges
const makeUser = (id) => {
  return models.User.create({
    id,
    kind: 'user',
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

describe.only('Integration Test LoginController', function () {
  beforeEach(() => {
    models.User.destroy({ where: {} })
  })
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

  test('should receive 302 and redirect to home when logged and try to access /login', async () => {
    // Arrange
    await makeUser(1)
    const agent = request.agent(app)
    await agent
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })
    // Act
    const res = await agent
      .get('/login')
    // Assert
    expect(res.statusCode).toBe(302)
  })

  test('should receive a 302 when do login with correct data', async () => {
    // Arrange
    await makeUser(1)
    const agent = request.agent(app)
    // Act
    const res = await agent
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })
    // Assert
    expect(res.statusCode).toBe(302)
  })

  test('should receive a 422 when do login with incorrect password', async () => {
    // Arrange
    await makeUser(1)
    const agent = request.agent(app)
    // Act
    const res = await agent
      .post('/login')
      .send({ email: '1234@teste.com', password: 'wrong_password' })
    // Assert
    expect(res.statusCode).toBe(422)
  })

  test('should receive a 422 when do login with incorrect email', async () => {
    // Arrange
    await makeUser(1)
    const agent = request.agent(app)
    //Act
    const res = await agent
      .post('/login')
      .send({ email: 'wrong_email', password: 'ABCd123456' })
    // Assert
    expect(res.statusCode).toBe(422)
  })

  test('should redirect 302 when logout', async () => {
    // Arrange
    await makeUser(1)
    const agent = request.agent(app)
    await agent
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })
    // Act
    const res = await agent
      .get('/login/logout')
    // Assert
    expect(res.statusCode).toBe(302)
  })
})
