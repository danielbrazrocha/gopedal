/* eslint-disable no-undef */
const PainelUsuariosController = require('../../../src/controllers/PainelUsuariosController')

describe('PainelUsuariosController tests', () => {
  test('should throw error on show method', async () => {
    const req = { }
    const res = {
      render: jest.fn().mockImplementationOnce(() => { throw new Error() }),
      status: jest.fn(() => res)
    }
    // Act
    await PainelUsuariosController.show(req, res)

    // Assert
    expect(res.status).toHaveBeenCalledWith(500)
  })

  test('should throw error on submitEdit method', async () => {
    // Arrange
    const req = {
      body: {
        id: 1,
        nome: 'Daniel Gustavo',
        cpf: '29432901653',
        tel: '1155551111',
        email: '1234@teste.com',
        birthdate: '1980-01-01'
      }
    }
    const res = {
      render: jest.fn().mockImplementationOnce(() => { throw new Error() }),
      status: jest.fn(() => res)
    }
    // Act
    await PainelUsuariosController.submitEdit(req, res)

    // Assert
    expect(res.status).toHaveBeenCalledWith(500)
  })

  test('should throw error on delete method', async () => {
    // Arrange
    const req = {
      params: {
        id: 1
      }
    }
    const res = {
      render: jest.fn().mockImplementationOnce(() => { throw new Error() }),
      status: jest.fn(() => res)
    }
    // Act
    await PainelUsuariosController.delete(req, res)

    // Assert
    expect(res.status).toHaveBeenCalledWith(500)
  })
})
