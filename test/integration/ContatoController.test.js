/* eslint-disable no-undef */
const request = require('supertest')
const models = require('../../src/models/index')
const app = require('../../app.js')

describe('Integration Test ContatoController', function () {
  afterAll(() => {
    models.sequelize.close()
  })

  test('should give a 200 when access /contato', async () => {
    // Arrange
    // Act
    const res = await request(app).get('/contato')
    // Assert
    expect(res.header['content-type']).toBe('text/html; charset=utf-8')
    expect(res.statusCode).toBe(200)
  })
})
