/* eslint-disable no-undef */
const request = require('supertest')
const models = require('../../src/models/index')
const app = require('../../app.js')

describe('Integration Test IndexController', function () {
  afterAll(() => {
    // models.Product.destroy({ where: {} })
    // models.Category.destroy({ where: {} })
    models.sequelize.close()
  })

  test('should give a 200 when access /', async () => {
    // Arrange
    // Act
    const res = await request(app).get('/')
    // Assert
    expect(res.header['content-type']).toBe('text/html; charset=utf-8')
    expect(res.statusCode).toBe(200)
  })

  test('should give a product result when a searched product was find  /', async () => {
    // Arrange
    // TODO: refactor model creation
    // models.category.create({
    //   id: 4,
    //   name: 'Transmissão',
    //   description: 'Pinhão, cassetes, coroas, cubos, correntes e câmbios',
    //   createdAt: new Date(),
    //   updatedAt: new Date()
    // })

    // models.Product.create({
    //   name: 'Cassete 9V 11-36D CS-HG201 - Shimano',
    //   description: 'Cassete para bicicleta, marca Shimano, modelo CS-HG201, 9 velocidades, 11 x 36 dentes na cor prata / cromado.',
    //   SKU: '111111',
    //   price: 230.00,
    //   image: '/assets/products/003-cassete.jpg',
    //   createAt: new Date().toISOString(),
    //   updatedAt: new Date().toISOString(),
    //   category_id: 4
    // })
    // Act
    const res = await request(app)
      .post('/busca')
      .send({ queryTxt: 'cassete' })
    // Assert
    expect(res.header['content-type']).toBe('text/html; charset=utf-8')
    expect(res.statusCode).toBe(200)
  })

  test('should give a 200 when a searched product was not find  /', async () => {
    // Arrange
    // Act
    const res = await request(app)
      .post('/busca')
      .query({ queryTxt: 'xxxxx' })
    // Assert
    expect(res.header['content-type']).toBe('text/html; charset=utf-8')
    expect(res.statusCode).toBe(200)
  })
})
