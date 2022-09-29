/* eslint-disable no-undef */
const LoginController = require('../../../src/controllers/LoginController')
const models = require('../../../src/models')
const bcrypt = require('bcryptjs')

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

describe('LoginController tests', () => {
  test('should throw error on logon method', async () => {
    // Arrange
    makeUser(1)
    const req = {
      body: { email: '1234@teste.com', password: 'ABCd123456' }
    }
    const res = {
      render: jest.fn().mockImplementationOnce(() => { throw new Error() }),
      status: jest.fn(() => res)
    }

    // Act
    await LoginController.logon(req, res)

    // Assert
    expect(res.status).toHaveBeenCalledWith(500)
  })
})
