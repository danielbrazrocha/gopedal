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

describe('Integration Test CadastroController', function () {
  beforeEach(() => {
    models.User.destroy({ where: {} })
    models.Inventory.destroy({ where: {} })
    models.Product.destroy({ where: {} })
    models.Cart_Item.destroy({ where: {} })
    models.Shopping_Session.destroy({ where: {} })
  })
  afterAll(() => {
    // models.User.destroy({ where: {} })
    models.sequelize.close()
  })
  afterEach(() => {
    models.User.destroy({ where: {} })
    models.Inventory.destroy({ where: {} })
    models.Product.destroy({ where: {} })
    models.Cart_Item.destroy({ where: {} })
    models.Shopping_Session.destroy({ where: {} })
  })

  test('should receive a 302 when access /pagamento/confirmado with unautenticated user ', async () => {
    // Arrange

    // Act
    const res = await request(app).get('/pagamento/confirmado')
    // Assert
    expect(res.statusCode).toBe(302)
    // expect(res.header['content-type']).toBe('text/plain; charset=utf-8')
  })

  test('should receive a 200 when access /pagamento/confirmado with autenticated user', async () => {
    // Arrange
    await makeUser(1)
    const agent = request.agent(app)
    await agent
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })
    // Act
    const res = await agent.get('/pagamento/confirmado')
    // Assert
    expect(res.status).toBe(200)
    expect(res.header['content-type']).toBe('text/html; charset=utf-8')
  })

  test('should receive a 302 when access /pagamento/cancelado with unautenticated user ', async () => {
    // Arrange

    // Act
    const res = await request(app).get('/pagamento/cancelado')
    // Assert
    expect(res.statusCode).toBe(302)
    // expect(res.header['content-type']).toBe('text/plain; charset=utf-8')
  })

  test('should receive a 200 when access /pagamento/cancelado with autenticated user', async () => {
    // Arrange
    await makeUser(1)
    const agent = request.agent(app)
    await agent
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })
    // Act
    const res = await agent.get('/pagamento/cancelado')
    // Assert
    expect(res.status).toBe(200)
    expect(res.header['content-type']).toBe('text/html; charset=utf-8')
  })

  test('should receive a 303 when access /pagamento with a cart', async () => {
    // Arrange
    await makeInventory(2)
    await makeProduct(2)
    await makeUser(2)
    const agent = request.agent(app)
    await agent
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })
    await agent
      .get('/carrinho/include/2')
    // Act
    const res = await agent.get('/pagamento')
    // Assert
    expect(res.status).toBe(303)
  })

  // test.only('should receive a 500 when access /pagamento without cart', async () => {
  //   // Arrange
  //   await makeInventory(3)
  //   await makeProduct(3)
  //   await makeUser(3)
  //   const agent = request.agent(app)
  //   await agent
  //     .post('/login')
  //     .send({ email: '1234@teste.com', password: 'ABCd123456' })
  //   // Act
  //   const res = await agent.get('/pagamento')
  //   // Assert
  //   expect(res.status).toBe(404)
  // })
})
