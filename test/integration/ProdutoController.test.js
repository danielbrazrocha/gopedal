/* eslint-disable no-undef */
const request = require('supertest')
const models = require('../../src/models/index')
const app = require('../../app.js')

describe('Integration Test SobreController', function () {
  beforeEach(() => {
    models.Category.destroy({ where: {} })
    models.Product.destroy({ where: {} })
  })
  afterAll(() => {
    models.Category.destroy({ where: {} })
    models.Product.destroy({ where: {} })
    models.sequelize.close()
  })
  afterEach(() => {
    models.Category.destroy({ where: {} })
    models.Product.destroy({ where: {} })
  })
  // TODO: make the test after a route to add category
  // TODO:add a new test to delete product with auth
  //   test('should give a 200 when product was found', async () => {
  //     // Arrange
  //     await request(app)
  //       .post('/adicionarProduto')
  //       .send({ nome: 'Cassete 9V 11-36D CS-HG201 - Shimano', category: '1', description: 'Cassete para bicicleta, marca Shimano, modelo CS-HG201, 9 velocidades, 11 x 36 dentes na cor prata /cromado.', SKU: '11111', price: '230', image: '/assets/products/003-cassete.jpg' })
  //     // Act
  //     const res = await request(app).get('/produto/1')
  //     // Assert
  //     expect(res.header['content-type']).toBe('text/html; charset=utf-8')
  //     expect(res.statusCode).toBe(200)
  //   })

  test('should give a 404 when product was not found', async () => {
    // Arrange
    // Act
    const res = await request(app).get('/produto/999999999999999999')
    // Assert
    expect(res.header['content-type']).toBe('text/html; charset=utf-8')
    expect(res.statusCode).toBe(404)
  })

  test('should give a 302 when trying to delete a product whithout auth', async () => {
    // Arrange

    // Act
    const res = await request(app).get('/produto/deletar/2')
    // Assert
    expect(res.statusCode).toBe(302)
  })
})
