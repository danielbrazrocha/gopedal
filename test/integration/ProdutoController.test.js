/* eslint-disable no-undef */
const request = require('supertest')
const models = require('../../src/models/index')
const app = require('../../app.js')

// Factory to make Product with an Id
const makeProduct = (id) => {
  return models.Product.create({
    // CategoryId: 1,
    // DiscountId: 1,
    id,
    InventoryId: id,
    name: 'Pedal Clip MTB PD-M324 (Prata) - Shimano',
    description: 'Pedal clip para bicicleta MTB, marca Shimano, modelo PD-M324, cor Prata. Especificação:- Marca: Shimano - Modelo: PD-M324- Código Shimano: EPDM324 - Cor: Prata- Rosca: Grossa tipo Inglês 9/16"- Acompanha par de taquinho: SM-SH56- Sistema misto, sendo um lado com clip e o outro com apoio normal (sem clip)- Peso: 533 gramas (par)- Produto original.',
    image: '/assets/products/001-PedalClip.jpg',
    SKU: '1111',
    price: 520.00,
    createdAt: new Date(),
    updatedAt: new Date()
  })
}

// Factory to make Inventory with an Id
const makeInventory = (id) => {
  return models.Inventory.create({
    id,
    quantity: 100,
    createdAt: new Date(),
    updatedAt: new Date()
  })
}

describe('Integration Test SobreController', function () {
  beforeEach(() => {
    models.Product.destroy({ where: {} })
  })
  afterAll(() => {
    models.sequelize.close()
  })
  afterEach(() => {
    models.Product.destroy({ where: {} })
  })

  test('should give a 404 when product was not found', async () => {
    // Arrange
    // Act
    const res = await request(app).get('/produto/999999999999999999')
    // Assert
    expect(res.header['content-type']).toBe('text/html; charset=utf-8')
    expect(res.statusCode).toBe(404)
  })

  test('should receive a 200 when product was found', async () => {
    // Arrange
    makeInventory(20)
    makeProduct(20)
    // Act
    const res = await request(app).get('/produto/20')
    // Assert
    expect(res.status).toBe(200)
  })
})
