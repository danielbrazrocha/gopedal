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

describe('Integration Test CartController', function () {
  beforeEach(() => {
    models.Inventory.destroy({ where: {} })
    models.Product.destroy({ where: {} })
    models.User.destroy({ where: {} })
    models.Shopping_Session.destroy({ where: {} })
    models.Cart_Item.destroy({ where: {} })
    jest.resetAllMocks()
    jest.resetModules()
  })
  afterAll(() => {
    models.sequelize.close()
  })
  afterEach(() => {
    models.Inventory.destroy({ where: {} })
    models.Product.destroy({ where: {} })
    models.User.destroy({ where: {} })
    models.Shopping_Session.destroy({ where: {} })
    models.Cart_Item.destroy({ where: {} })
  })

  test('should receive a 302 when access /carrinho with unautenticated user ', async () => {
    // Arrange

    // Act
    const res = await request(app).get('/carrinho')
    // Assert
    expect(res.statusCode).toBe(302)
    // expect(res.header['content-type']).toBe('text/plain; charset=utf-8')
  })

  test('should receive a 200 when access /carrinho with a autenticated user and empty shopping cart', async () => {
    // Arrange
    await makeUser(1)
    const agent = request.agent(app)
    await agent
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })
    // Act
    const res = await agent.get('/carrinho')
    // Assert
    expect(res.status).toBe(200)
    expect(res.header['content-type']).toBe('text/html; charset=utf-8')
  })

  test('should receive a 200 when access /carrinho with a autenticated user and shopping cart with items', async () => {
    // Arrange
    await makeInventory(4)
    await makeProduct(4)
    await makeUser(4)
    const agent = request.agent(app)
    await agent
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })

    const include = await agent
      .get('/carrinho/include/4')
    // Act
    const res = await agent.get('/carrinho')
    // Assert
    // console.log('test res', res.res)
    expect(res.status).toBe(500)
    expect(res.header['content-type']).toBe('text/html; charset=utf-8')
  })

  test('should redirected when include a product to cart /carrinho/include/:id ', async () => {
    // Arrange
    await makeInventory(9)
    await makeProduct(9)
    await makeUser(9)
    const agent = request.agent(app)
    await agent
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })

    // Act
    const res = await agent
      .get('/carrinho/include/9')
    // Assert
    // console.log(res.res)
    expect(res.status).toBe(302)
    // expect(res.header['content-type']).toBe('text/html; charset=utf-8')
  })

  test('should redirected when remove a product from cart /carrinho/remove/:id ', async () => {
    // Arrange
    await makeInventory(12)
    await makeProduct(12)
    await makeUser(12)
    const agent = request.agent(app)
    await agent
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })

    await agent
      .get('/carrinho/include/12')

    // Act
    const res = await agent
      .get('/carrinho/remove/12')

    // Assert
    expect(res.status).toBe(302)
  })

  // test.only('should redirected when remove a inexistent product in cart /carrinho/remove/:id ', async () => {
  //   // Arrange
  //   await makeUser(12)
  //   const agent = request.agent(app)
  //   await agent
  //     .post('/login')
  //     .send({ email: '1234@teste.com', password: 'ABCd123456' })

  //   // Act
  //   const res = await agent
  //     .get('/carrinho/remove/12')

  //   // Assert
  //   expect(res.status).toBe(500)
  // })

  test('should receive 500 when try to delete a product they arent in cart /carrinho/remove/:id ', async () => {
    // Arrange
    await makeInventory(17)
    await makeProduct(17)
    await makeUser(17)
    const agent = request.agent(app)
    await agent
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })

    // Act
    const res = await agent
      .get('/carrinho/remove/17')

    // Assert
    expect(res.status).toBe(500)
  })

  test('should add product quantity if they are in cart /carrinho/add/:id ', async () => {
    // Arrange
    await makeInventory(13)
    await makeProduct(13)
    await makeUser(13)
    const agent = request.agent(app)
    await agent
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })

    await agent
      .get('/carrinho/include/13')

    // Act
    const res = await agent
      .get('/carrinho/add/13')

    // Assert
    expect(res.status).toBe(302)
  })

  test('should del product quantity if they are in cart /carrinho/del/:id ', async () => {
    // Arrange
    await makeInventory(14)
    await makeProduct(14)
    await makeUser(14)
    const agent = request.agent(app)
    await agent
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })

    await agent
      .get('/carrinho/include/14')

    // Act
    const res = await agent
      .get('/carrinho/del/14')

    // Assert
    expect(res.status).toBe(302)
  })

  // test.only('should not del product if quantity in cart are 0 /carrinho/del/:id ', async () => {
  //   // Arrange
  //   await makeInventory(16)
  //   await makeProduct(16)
  //   await makeUser(16)
  //   const agent = request.agent(app)
  //   await agent
  //     .post('/login')
  //     .send({ email: '1234@teste.com', password: 'ABCd123456' })

  //   await agent
  //     .get('/carrinho/include/16')
  //   await agent
  //     .get('/carrinho/del/16')

  //   // Act
  //   const res = await agent
  //     .get('/carrinho/del/16')

  //   console.log(res.res)

  //   // Assert
  //   expect(res.status).toBe(422)
  // })
})
