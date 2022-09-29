/* eslint-disable no-undef */
const request = require('supertest')
const models = require('../../src/models/index')
const app = require('../../app.js')
const bcrypt = require('bcryptjs')

describe('PainelController Integration Tests ', function () {
  beforeEach(() => {
    models.User.destroy({ where: {} })
  })
  afterAll(() => {
    models.sequelize.close()
  })
  afterEach(() => {
    models.User.destroy({ where: {} })
  })

  test('should receive a 200 when access with admin privileges', async () => {
    // Arrange
    await models.User.create({
      id: 21,
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
    const agent = request.agent(app)
    await agent
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })
    // Act
    const res = await agent.get('/painel')
    // Assert
    expect(res.status).toBe(200)
  })
})
