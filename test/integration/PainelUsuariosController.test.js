/* eslint-disable no-undef */
const request = require('supertest')
const models = require('../../src/models/index')
const app = require('../../app.js')
const bcrypt = require('bcryptjs')

// Factory to make admin or User
const makeUser = (id, isAdmin) => {
  return models.User.create({
    id,
    kind: isAdmin ? 'admin' : 'user',
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

// // Factory to make Inventory with an Id
// const makeUser =6, false(id) => {
//   return models.Inventory.create({
//     id,
//     quantity: 100,
//     createdAt: new Date(),
//     updatedAt: new Date()
//   })
// }

// // Factory to make Product with an Id
//   return models.Product.create({
//     // CategoryId: 1,
//     // DiscountId: 1,
//     id,
//     InventoryId: id,
//     name: 'Pedal Clip MTB PD-M324 (Prata) - Shimano',
//     description: 'Pedal clip para bicicleta MTB, marca Shimano, modelo PD-M324, cor Prata. Especificação:- Marca: Shimano - Modelo: PD-M325- Código Shimano: EPDM325 - Cor: Prata- Rosca: Grossa tipo Inglês 9/16"- Acompanha par de taquinho: SM-SH56- Sistema misto, sendo um lado com clip e o outro com apoio normal (sem clip)- Peso: 533 gramas (par)- Produto original.',
//     image: '/assets/products/001-PedalClip.jpg',
//     SKU: '1111',
//     price: 520.00,
//     createdAt: new Date(),
//     updatedAt: new Date()
//   })
// }

describe('PainelUsuariosController Integration Tests', function () {
  beforeEach(() => {
    models.User.destroy({ where: {} })
    // models.Inventory.destroy({ where: {} })
    // models.Product.destroy({ where: {} })
  })
  afterAll(() => {
    // models.User.destroy({ where: {} })
    models.sequelize.close()
  })
  afterEach(() => {
    // models.Inventory.destroy({ where: {} })
    models.User.destroy({ where: {} })
    // models.Product.destroy({ where: {} })
  })

  test('should receive a 200 when access /painel/usuario with admin user and users dont exists', async () => {
    // Arrange
    await makeUser(25, true)
    const agent = request.agent(app)
    await agent
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })
    // Act
    const res = await agent.get('/painel/usuario')
    // Assert
    expect(res.status).toBe(200)
    expect(res.header['content-type']).toBe('text/html; charset=utf-8')
  })

  test('should receive a 302 when access /painel/usuario with unautenticated user ', async () => {
    // Arrange

    // Act
    const res = await request(app).get('/painel/usuario')
    // Assert
    expect(res.statusCode).toBe(302)
    // expect(res.header['content-type']).toBe('text/plain; charset=utf-8')
  })

  test('should receive a 200 when access /painel/usuario with admin user and users exists', async () => {
    // Arrange
    await makeUser(25, true)
    await makeUser(26, false)
    const agent = request.agent(app)
    await agent
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })
    // Act
    const res = await agent.get('/painel/usuario')
    // Assert
    expect(res.status).toBe(200)
    expect(res.header['content-type']).toBe('text/html; charset=utf-8')
  })

  test('should receive a 200 when access /painel/usuario/:id with admin user', async () => {
    // Arrange
    await makeUser(25, true)
    await makeUser(26, false)
    const agent = request.agent(app)
    await agent
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })
    // Act
    const res = await agent.get('/painel/usuario/26')
    // Assert
    expect(res.status).toBe(200)
    expect(res.header['content-type']).toBe('text/html; charset=utf-8')
  })

  test('should redirect when access delete a users in /painel/usuario/deletar/:id with admin user', async () => {
    // Arrange
    await makeUser(25, true)
    await makeUser(26, false)
    const agent = request.agent(app)
    await agent
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })
    // Act
    const res = await agent.get('/painel/usuario/deletar/26')
    // Assert
    expect(res.status).toBe(302)
    expect(res.header['content-type']).toBe('text/plain; charset=utf-8')
  })

  test('should receive 404 when try to delete a missing users in /painel/usuario/deletar/:id with admin user', async () => {
    // Arrange
    await makeUser(25, true)
    const agent = request.agent(app)
    await agent
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })
    // Act
    const res = await agent.get('/painel/usuario/deletar/26')
    // Assert
    expect(res.status).toBe(404)
    expect(res.header['content-type']).toBe('text/html; charset=utf-8')
  })

  test('should receive 201 when update a user in /painel/usuario/:id with admin user', async () => {
    // Arrange
    await makeUser(25, true)
    await models.User.create({
      id: 26,
      kind: 'user',
      name: 'Daniel Gustavo',
      password: bcrypt.hashSync('ABCd123456', 10),
      cpf: '57223124016',
      tel: '11988885555',
      email: '1234@teste.com',
      birthdate: '1980-01-01',
      createdAt: new Date(),
      updatedAt: new Date()
    })
    const agent = request.agent(app)
    await agent
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })
    // Act
    const res = await agent
      .post('/painel/usuario/26')
      .send({ id: 26, nome: 'Daniel e Gustavo', cpf: '57223124016', tel: '11988885555', email: '1234@teste.com', birthdate: '1980-01-01' })
    // Assert
    expect(res.status).toBe(201)
    expect(res.header['content-type']).toBe('text/html; charset=utf-8')
  })

  test('should receive 422 when try to update a users with wrong info in /painel/usuario/:id with admin user', async () => {
    // Arrange
    await makeUser(25, true)
    await makeUser(26, false)
    const agent = request.agent(app)
    await agent
      .post('/login')
      .send({ email: '1234@teste.com', password: 'ABCd123456' })
    // Act
    const res = await agent
      .post('/painel/usuario/26')
      .send({ id: 26, nome: 'Daniel Gustavo', cpf: '29432901653', tel: '11555551111', email: 'wrong_email', birthdate: '1980-01-01' })
    // Assert
    expect(res.status).toBe(422)
    expect(res.header['content-type']).toBe('text/html; charset=utf-8')
  })
})
