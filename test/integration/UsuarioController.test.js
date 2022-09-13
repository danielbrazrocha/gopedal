/* eslint-disable no-undef */
const request = require('supertest')
const models = require('../../src/models/index')
const app = require('../../app.js')

describe('Integration Test UsuarioController', function () {
  afterAll(() => {
    models.sequelize.close()
  })

  test('should receive a 302 redirection when access / without Auth', async () => {
    // Arrange
    // Act
    const res = await request(app).get('/usuario')
    // Assert
    expect(res.statusCode).toBe(302)
  })
  // todo make a test with auth user accessing /usuario
})
