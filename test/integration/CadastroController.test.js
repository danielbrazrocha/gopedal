/* eslint-disable no-undef */
const request = require('supertest')
const models = require('../../src/models/index')
const app = require('../../app.js')

describe('Integration Test CadastroController', function () {
  beforeEach(() => models.User.destroy({ where: {} }))
  afterAll(() => {
    models.User.destroy({ where: {} })
    models.sequelize.close()
  })
  afterEach(() => {
    models.User.destroy({ where: {} })
  })

  test('should give a 200 when access /', async () => {
    // Arrange
    // Act
    const res = await request(app).get('/login')
    // Assert
    expect(res.header['content-type']).toBe('text/html; charset=utf-8')
    // expect(res.title).toEqual('gopedal.com')
    expect(res.statusCode).toBe(200)
    // expect(res.text).toEqual('Erro na criação do usuário. Verifique as informações e tente novamente.')
  })

  test('should fail register with a wrong CPF data', async () => {
    // Arrange
    // Act
    const res = await request(app)
      .post('/cadastro')
      .send({ nome: 'Daniel Gustavo', cpf: '11111111111', tel: '1111111111', email: '1234@teste.com', senha: 'ABCd123456', repeteSenha: 'ABCd123456' })
    // Assert
    expect(res.header['content-type']).toBe('text/html; charset=utf-8')
    expect(res.statusCode).toBe(422)
  })

  test('should fail register with a wrong password confirmation', async () => {
    // Arrange
    // Act
    const res = await request(app)
      .post('/cadastro')
      .send({ nome: 'Daniel Gustavo', cpf: '29432901653', tel: '1111111111', email: '1234@teste.com', senha: 'ABCd123456', repeteSenha: 'wrong_password' })
    // Assert
    expect(res.header['content-type']).toBe('text/html; charset=utf-8')
    expect(res.statusCode).toBe(422)
    // expect(res.text).toEqual('Erro na criação do usuário. Verifique as informações e tente novamente.')
    // expect(res.text.should.match(/As senhas não conferem/))
  })

  test('should register user with a correct data', async () => {
    // Arrange
    // Act
    const res = await request(app)
      .post('/cadastro')
      .send({ nome: 'Daniel Gustavo', cpf: '29432901653', tel: '1111111111', email: '1234@teste.com', senha: 'ABCd123456', repeteSenha: 'ABCd123456' })
    // Assert
    expect(res.header['content-type']).toBe('text/html; charset=utf-8')
    expect(res.statusCode).toBe(201)
  })

  test('should fail to register a user with the same CPF', async () => {
    // Arrange
    await request(app)
      .post('/cadastro')
      .send({ nome: 'Daniel Gustavo', cpf: '29432901653', tel: '1111111111', email: '1234@teste.com', senha: 'ABCd123456', repeteSenha: 'ABCd123456' })
    // Act
    const res = await request(app)
      .post('/cadastro')
      .send({ nome: 'Daniel Gustavo2', cpf: '29432901653', tel: '1111111111', email: '1234@other.com', senha: 'ABCd123456', repeteSenha: 'ABCd123456' })
    // Assert
    expect(res.header['content-type']).toBe('text/html; charset=utf-8')
    expect(res.statusCode).toBe(422)
  })

  test('should fail to register a user with the same e-mail', async () => {
    // Arrange
    await request(app)
      .post('/cadastro')
      .send({ nome: 'Daniel Gustavo', cpf: '29432901653', tel: '1111111111', email: '1234@teste.com', senha: 'ABCd123456', repeteSenha: 'ABCd123456' })
    // Act
    const res = await request(app)
      .post('/cadastro')
      .send({ nome: 'Daniel Gustavo', cpf: '06628240673', tel: '1111111111', email: '1234@teste.com', senha: 'ABCd123456', repeteSenha: 'ABCd123456' })
    // Assert
    expect(res.header['content-type']).toBe('text/html; charset=utf-8')
    expect(res.statusCode).toBe(422)
  })

  // test('should throw error', async () => {
  //   // Arrange
  //   // Act
  //   // jest.spyOn(request, 'isValid').mockImplementationOnce(() => {
  //   //   throw new Error()
  //   // })
  //   const res = await request(app)
  //     .post('/cadastro')
  //     .send({ error: 'error' })
  //   // throw new Error()
  //   // Assert
  //   expect(res.header['content-type']).toBe('text/html; charset=utf-8')
  //   expect(res.statusCode).toBe(500)
  // })
})
