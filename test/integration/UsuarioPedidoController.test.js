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

// Factory to make Order_Details with an Id
const makeOrderDetails = (id) => {
  return models.Order_Details.create({
    id,
    UserId: id,
    total: 655,
    createdAt: new Date(),
    updatedAt: new Date()
  })
}

// Factory to make Order_Itens with an Id
const makeOrderItens = (id) => {
  return models.Order_Itens.create({
    id,
    ProductId: id,
    OrderDetailId: id,
    quantity: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  })
}

// Factory to make Product with an Id
const makeProduct = (id) => {
  return models.Product.create({
    // CategoryId: 1,
    // DiscountId: 1,
    // InventoryId: id,
    id,
    name: 'Pedal Clip MTB PD-M334 (Prata) - Shimano',
    description: 'Pedal clip para bicicleta MTB, marca Shimano, modelo PD-M334, cor Prata. Especificação:- Marca: Shimano - Modelo: PD-M334- Código Shimano: EPDM334 - Cor: Prata- Rosca: Grossa tipo Inglês 9/16"- Acompanha par de taquinho: SM-SH56- Sistema misto, sendo um lado com clip e o outro com apoio normal (sem clip)- Peso: 533 gramas (par)- Produto original.',
    image: '/assets/products/001-PedalClip.jpg',
    SKU: '1111',
    price: 520.00,
    createdAt: new Date(),
    updatedAt: new Date()
  })
}

describe('UsuarioPedidoController Integration Tests', function () {
  beforeEach(() => {
    models.User.destroy({ where: {} })
    models.Order_Details.destroy({ where: {} })
    models.Product.destroy({ where: {} })
  })
  afterAll(() => {
    models.sequelize.close()
  })
  afterEach(() => {
    models.Order_Details.destroy({ where: {} })
    models.User.destroy({ where: {} })
    models.Product.destroy({ where: {} })
  })

  test('should receive a 200 when access /usuario/pedidos with admin user and order dont exists', async () => {
    // Arrange
    await makeAdminUser(34)
    const agent = request.agent(app)
    await agent
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })
    // Act
    const res = await agent.get('/usuario/pedidos')
    // Assert
    expect(res.status).toBe(200)
    expect(res.header['content-type']).toBe('text/html; charset=utf-8')
  })

  test('should receive a 302 when access /usuario/pedidos with unautenticated user ', async () => {
    // Arrange

    // Act
    const res = await request(app).get('/usuario/pedidos')
    // Assert
    expect(res.statusCode).toBe(302)
    // expect(res.header['content-type']).toBe('text/plain; charset=utf-8')
  })

  test('should receive a 200 when access /usuario/pedidos with admin user and order exists', async () => {
    // Arrange
    await makeAdminUser(34)
    await makeProduct(34)
    await makeOrderDetails(34)
    const agent = request.agent(app)
    await agent
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })
    // Act
    const res = await agent.get('/usuario/pedidos')
    // Assert
    expect(res.status).toBe(200)
    expect(res.header['content-type']).toBe('text/html; charset=utf-8')
  })

  test('should receive a 200 when access /usuario/pedidos/:id with admin user', async () => {
    // Arrange
    await makeAdminUser(34)
    await makeProduct(34)
    await makeOrderDetails(34)
    await makeOrderItens(34)
    const agent = request.agent(app)
    await agent
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })
    // Act
    const res = await agent.get('/usuario/pedidos/34')
    // Assert
    expect(res.status).toBe(200)
    expect(res.header['content-type']).toBe('text/html; charset=utf-8')
  })
})
