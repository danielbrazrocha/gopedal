/* eslint-disable no-undef */
const request = require('supertest')
const models = require('../../src/models/index')
const app = require('../../app.js')

describe('Integration Test IndexController', function () {
  beforeEach(() => {
    models.Product.destroy({ where: {} })
    models.Category.destroy({ where: {} })
  })
  afterAll(() => {
    models.sequelize.close()
  })
  afterEach(() => {
    models.Product.destroy({ where: {} })
    models.Category.destroy({ where: {} })
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

    await models.Category.create({
      name: 'Transmissão',
      description: 'Pinhão, cassetes, coroas, cubos, correntes e câmbios',
      createdAt: new Date(),
      updatedAt: new Date()
    })

    await models.Product.create({
      name: 'Pedal Clip MTB PD-M324 (Prata) - Shimano',
      description: 'Pedal clip para bicicleta MTB, marca Shimano, modelo PD-M324, cor Prata. Especificação:- Marca: Shimano - Modelo: PD-M324- Código Shimano: EPDM324 - Cor: Prata- Rosca: Grossa tipo Inglês 9/16"- Acompanha par de taquinho: SM-SH56- Sistema misto, sendo um lado com clip e o outro com apoio normal (sem clip)- Peso: 533 gramas (par)- Produto original.',
      image: '/assets/products/001-PedalClip.jpg',
      SKU: '1111',
      price: 520.00,
      createdAt: new Date(),
      updatedAt: new Date()
    })

    // Act
    const res = await request(app)
      .post('/busca')
      .send({ queryTxt: 'pedal' })
    // Assert
    expect(res.header['content-type']).toBe('text/html; charset=utf-8')
    expect(res.statusCode).toBe(200)
  })

  test('should give a 200 when a searched product was not find  /', async () => {
    // Arrange
    // Act
    const res = await request(app)
      .post('/busca')
      .query({ queryTxt: 'fake_product' })
    // Assert
    expect(res.header['content-type']).toBe('text/html; charset=utf-8')
    expect(res.statusCode).toBe(200)
  })
})
