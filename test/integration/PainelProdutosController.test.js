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

// Factory to make Category with an Id
const makeCategory = (id) => {
  return models.Category.create({
    id,
    name: 'Pedais',
    description: 'Pedais e pedivelas',
    createdAt: new Date(),
    updatedAt: new Date()
  })
}

// Factory to make Product with an Id
const makeProduct = (id) => {
  return models.Product.create({
    // DiscountId: 1,
    id,
    CategoryId: id,
    // InventoryId: id,
    name: 'Pedal Clip MTB PD-M328 (Prata) - Shimano',
    description: 'Pedal clip para bicicleta MTB, marca Shimano, modelo PD-M328, cor Prata. Especificação:- Marca: Shimano - Modelo: PD-M328- Código Shimano: EPDM328 - Cor: Prata- Rosca: Grossa tipo Inglês 9/16"- Acompanha par de taquinho: SM-SH56- Sistema misto, sendo um lado com clip e o outro com apoio normal (sem clip)- Peso: 533 gramas (par)- Produto original.',
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
    models.Category.destroy({ where: {} })
  })
  afterAll(() => {
    models.sequelize.close()
  })
  afterEach(() => {
    models.Inventory.destroy({ where: {} })
    models.User.destroy({ where: {} })
    models.Product.destroy({ where: {} })
    models.Category.destroy({ where: {} })
  })

  test('should receive a 200 when access /painel/produto with admin user and product doenst exists', async () => {
    // Arrange
    await makeAdminUser(28)
    const agent = request.agent(app)
    await agent
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })
    // Act
    const res = await agent.get('/painel/produto')
    // Assert
    expect(res.status).toBe(200)
    expect(res.header['content-type']).toBe('text/html; charset=utf-8')
  })

  test('should receive a 302 when access /painel/produto with unautenticated user ', async () => {
    // Arrange

    // Act
    const res = await request(app).get('/painel/produto')
    // Assert
    expect(res.statusCode).toBe(302)
    // expect(res.header['content-type']).toBe('text/plain; charset=utf-8')
  })

  test('should receive a 200 when access /painel/produto with admin user and product exists', async () => {
    // Arrange
    await makeAdminUser(28)
    await makeInventory(28)
    await makeCategory(28)
    await makeProduct(28)
    const agent = request.agent(app)
    await agent
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })
    // Act
    const res = await agent.get('/painel/produto')
    // Assert
    expect(res.status).toBe(200)
    expect(res.header['content-type']).toBe('text/html; charset=utf-8')
  })

  test('should receive a 200 when access /painel/produto/add/form with admin user', async () => {
    // Arrange
    await makeAdminUser(28)
    const agent = request.agent(app)
    await agent
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })
    // Act
    const res = await agent.get('/painel/produto/add/form')
    // Assert
    expect(res.status).toBe(200)
    expect(res.header['content-type']).toBe('text/html; charset=utf-8')
  })

  test('should receive a 200 when access /painel/produto/:id with admin user', async () => {
    // Arrange
    await makeAdminUser(28)
    await makeCategory(28)
    await makeProduct(28)
    const agent = request.agent(app)
    await agent
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })
    // Act
    const res = await agent.get('/painel/produto/28')
    // Assert
    expect(res.status).toBe(200)
    expect(res.header['content-type']).toBe('text/html; charset=utf-8')
  })

  test('should redirect when access delete a product in /painel/produto/deletar/:id with admin user', async () => {
    // Arrange
    await makeAdminUser(28)
    await makeCategory(28)
    await makeProduct(28)
    const agent = request.agent(app)
    await agent
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })
    // Act
    const res = await agent.get('/painel/produto/deletar/28')
    // Assert
    expect(res.status).toBe(302)
    expect(res.header['content-type']).toBe('text/plain; charset=utf-8')
  })

  test('should receive 404 when try to delete a missing product in /painel/produto/deletar/:id with admin user', async () => {
    // Arrange
    await makeAdminUser(28)
    const agent = request.agent(app)
    await agent
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })
    // Act
    const res = await agent.get('/painel/produto/deletar/28')
    // Assert
    expect(res.status).toBe(404)
    expect(res.header['content-type']).toBe('text/html; charset=utf-8')
  })

  test('should receive 201 when create a product in /painel/produto/:id with admin user', async () => {
    // Arrange
    await makeAdminUser(28)
    await makeCategory(28)
    const agent = request.agent(app)
    await agent
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })
    // Act
    const res = await agent
      .post('/painel/produto/28')
      .send({
        id: 28,
        category: 28,
        nome: 'Pedal Clip MTB PD-M324 (Prata) - Shimano',
        description: 'Pedal clip para bicicleta MTB, marca Shimano, modelo PD-M324, cor Prata. Especificação:- Marca: Shimano - Modelo: PD-M324- Código Shimano: EPDM324 - Cor: Prata- Rosca: Grossa tipo Inglês 9/16"- Acompanha par de taquinho: SM-SH56- Sistema misto, sendo um lado com clip e o outro com apoio normal (sem clip)- Peso: 533 gramas (par)- Produto original.',
        imagelink: '/assets/products/001-PedalClip.jpg',
        SKU: '1111',
        price: 520.00,
        newItem: true
      })
    // Assert
    expect(res.status).toBe(201)
    expect(res.header['content-type']).toBe('text/html; charset=utf-8')
  })

  test('should receive 422 when create a product with wrong info in /painel/produto/:id with admin user', async () => {
    // Arrange
    await makeAdminUser(28)
    await makeCategory(28)
    const agent = request.agent(app)
    await agent
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })
    // Act
    const res = await agent
      .post('/painel/produto/28')
      .send({
        id: 28,
        categoryId: 28,
        name: 'Pedal Clip MTB PD-M324 (Prata) - Shimano',
        description: 'Pedal clip para bicicleta MTB, marca Shimano, modelo PD-M324, cor Prata. Especificação:- Marca: Shimano - Modelo: PD-M324- Código Shimano: EPDM324 - Cor: Prata- Rosca: Grossa tipo Inglês 9/16"- Acompanha par de taquinho: SM-SH56- Sistema misto, sendo um lado com clip e o outro com apoio normal (sem clip)- Peso: 533 gramas (par)- Produto original.',
        image: '/assets/products/001-PedalClip.jpg',
        SKU: '1111',
        price: 'wrong_info',
        newItem: true
      })
    // Assert
    expect(res.status).toBe(422)
    expect(res.header['content-type']).toBe('text/html; charset=utf-8')
  })

  test('should receive 201 when update a product in /painel/produto/:id with admin user', async () => {
    // Arrange
    await makeAdminUser(28)
    await makeCategory(28)
    const agent = request.agent(app)
    await agent
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })
    // Act
    const res = await agent
      .post('/painel/produto/28')
      .send({
        id: 28,
        category: 28,
        nome: 'New Pedal Clip MTB PD-M324 (Prata) - Shimano',
        description: 'Pedal clip para bicicleta MTB, marca Shimano, modelo PD-M324, cor Prata. Especificação:- Marca: Shimano - Modelo: PD-M324- Código Shimano: EPDM324 - Cor: Prata- Rosca: Grossa tipo Inglês 9/16"- Acompanha par de taquinho: SM-SH56- Sistema misto, sendo um lado com clip e o outro com apoio normal (sem clip)- Peso: 533 gramas (par)- Produto original.',
        imagelink: '/assets/products/001-PedalClip.jpg',
        SKU: '1111',
        price: 520.00,
        newItem: false
      })

    // Assert
    expect(res.status).toBe(201)
    expect(res.header['content-type']).toBe('text/html; charset=utf-8')
  })

  test('should receive 422 when try to update a product with wrong info in /painel/produto/:id with admin user', async () => {
    // Arrange
    await makeAdminUser(28)
    await makeCategory(28)
    const agent = request.agent(app)
    await agent
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })
    // Act
    const res = await agent
      .post('/painel/produto/28')
      .send({
        id: 28,
        categoryId: 28,
        name: 'New Pedal Clip MTB PD-M324 (Prata) - Shimano',
        description: 'Pedal clip para bicicleta MTB, marca Shimano, modelo PD-M324, cor Prata. Especificação:- Marca: Shimano - Modelo: PD-M324- Código Shimano: EPDM324 - Cor: Prata- Rosca: Grossa tipo Inglês 9/16"- Acompanha par de taquinho: SM-SH56- Sistema misto, sendo um lado com clip e o outro com apoio normal (sem clip)- Peso: 533 gramas (par)- Produto original.',
        image: '/assets/products/001-PedalClip.jpg',
        SKU: '1111',
        price: 'wrong_price',
        newItem: false
      })
    // Assert
    expect(res.status).toBe(422)
    expect(res.header['content-type']).toBe('text/html; charset=utf-8')
  })
})
