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

// Factory to make Inventory with an Id
const makeInventory = (id) => {
  return models.Inventory.create({
    id,
    quantity: 100,
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

describe('PainelInventarioController Integration Tests', function () {
  beforeEach(() => {
    models.User.destroy({ where: {} })
    models.Inventory.destroy({ where: {} })
    models.Product.destroy({ where: {} })
  })
  afterAll(() => {
    // models.User.destroy({ where: {} })
    models.sequelize.close()
  })
  afterEach(() => {
    models.Inventory.destroy({ where: {} })
    models.User.destroy({ where: {} })
    models.Product.destroy({ where: {} })
  })

  test('should receive a 200 when access /painel/inventario with admin user and inventory dont exists', async () => {
    // Arrange
    await makeAdminUser(24)
    const agent = request.agent(app)
    await agent
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })
    // Act
    const res = await agent.get('/painel/inventario')
    // Assert
    expect(res.status).toBe(200)
    expect(res.header['content-type']).toBe('text/html; charset=utf-8')
  })

  test('should receive a 302 when access /painel/inventario with unautenticated user ', async () => {
    // Arrange

    // Act
    const res = await request(app).get('/painel/inventario')
    console.log('res', res)
    // Assert
    expect(res.statusCode).toBe(302)
    // expect(res.header['content-type']).toBe('text/plain; charset=utf-8')
  })

  test('should receive a 200 when access /painel/inventario with admin user and inventory exists', async () => {
    // Arrange
    await makeAdminUser(24)
    await makeInventory(24)
    await makeProduct(24)
    const agent = request.agent(app)
    await agent
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })
    // Act
    const res = await agent.get('/painel/inventario')
    // Assert
    expect(res.status).toBe(200)
    expect(res.header['content-type']).toBe('text/html; charset=utf-8')
  })

  test('should receive a 200 when access /painel/inventario/add/form with admin user', async () => {
    // Arrange
    await makeAdminUser(24)
    const agent = request.agent(app)
    await agent
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })
    // Act
    const res = await agent.get('/painel/inventario/add/form')
    // Assert
    expect(res.status).toBe(200)
    expect(res.header['content-type']).toBe('text/html; charset=utf-8')
  })

  test('should receive a 200 when access /painel/inventario/:id with admin user', async () => {
    // Arrange
    await makeAdminUser(24)
    await makeInventory(24)
    const agent = request.agent(app)
    await agent
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })
    // Act
    const res = await agent.get('/painel/inventario/24')
    // Assert
    expect(res.status).toBe(200)
    expect(res.header['content-type']).toBe('text/html; charset=utf-8')
  })

  test('should redirect when access delete a inventory in /painel/inventario/deletar/:id with admin user', async () => {
    // Arrange
    await makeAdminUser(24)
    await makeInventory(24)
    const agent = request.agent(app)
    await agent
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })
    // Act
    const res = await agent.get('/painel/inventario/deletar/24')
    // Assert
    expect(res.status).toBe(302)
    expect(res.header['content-type']).toBe('text/plain; charset=utf-8')
  })

  test('should receive 404 when try to delete a missing inventory in /painel/inventario/deletar/:id with admin user', async () => {
    // Arrange
    await makeAdminUser(24)
    const agent = request.agent(app)
    await agent
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })
    // Act
    const res = await agent.get('/painel/inventario/deletar/24')
    // Assert
    expect(res.status).toBe(404)
    expect(res.header['content-type']).toBe('text/html; charset=utf-8')
  })

  test('should receive 201 when create a inventory in /painel/inventario/:id with admin user', async () => {
    // Arrange
    await makeAdminUser(24)
    const agent = request.agent(app)
    await agent
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })
    // Act
    const res = await agent
      .post('/painel/inventario/24')
      .send({ id: 24, quantity: 100, newItem: true })
    // Assert
    expect(res.status).toBe(201)
    expect(res.header['content-type']).toBe('text/html; charset=utf-8')
  })

  test('should receive 422 when create a inventory with wrong info in /painel/inventario/:id with admin user', async () => {
    // Arrange
    await makeAdminUser(24)
    const agent = request.agent(app)
    await agent
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })
    // Act
    const res = await agent
      .post('/painel/inventario/24')
      .send({ id: 24, quantity: 'wrong_info', newItem: true })
    // Assert
    expect(res.status).toBe(422)
    expect(res.header['content-type']).toBe('text/html; charset=utf-8')
  })

  // TODO: Update igual teste acima?

  test('should receive 201 when update a inventory in /painel/inventario/:id with admin user', async () => {
    // Arrange
    await makeAdminUser(24)
    const agent = request.agent(app)
    await agent
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })
    // Act
    const res = await agent
      .post('/painel/inventario/24')
      .send({ id: 24, quantity: 200, newItem: false })
    // Assert
    expect(res.status).toBe(201)
    expect(res.header['content-type']).toBe('text/html; charset=utf-8')
  })

  test('should receive 422 when try to update a inventory with wrong info in /painel/inventario/:id with admin user', async () => {
    // Arrange
    await makeAdminUser(24)
    const agent = request.agent(app)
    await agent
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })
    // Act
    const res = await agent
      .post('/painel/inventario/24')
      .send({ id: 24, quantity: 'wrong_info', newItem: false })
    // Assert
    expect(res.status).toBe(422)
    expect(res.header['content-type']).toBe('text/html; charset=utf-8')
  })
})
