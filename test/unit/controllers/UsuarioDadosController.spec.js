/* eslint-disable no-undef */
const UsuarioDadosController = require('../../../src/controllers/UsuarioDadosController')

describe('UsuarioDadosController tests', () => {
  // TODO: this
  test('should throw error on show method', async () => {
    const req = {
      session: {
        user: {
          id: 1
        }
      }
    }
    const res = {
      render: jest.fn().mockImplementationOnce(() => { throw new Error() }),
      status: jest.fn(() => res)
    }
    // Act
    await UsuarioDadosController.show(req, res)

    // Assert
    expect(res.status).toHaveBeenCalledWith(500)
  })

  test('should throw error on submitEdit method', async () => {
    // Arrange
    const req = {
      session: {
        user: {
          id: 'fake_id',
          name: 'fake_name',
          kind: 'fake_kind',
          shopping_session: 1
        }
      },
      body: {
        id: 1,
        nome: 'Daniel Gustavo',
        cpf: '29432901653',
        tel: '11955551111',
        email: '1234@teste.com',
        senha: '123456',
        repeteSenha: '123456'
      }
    }
    const res = {
      render: jest.fn().mockImplementationOnce(() => { throw new Error() }),
      status: jest.fn(() => res)
    }
    // Act
    await UsuarioDadosController.submitEdit(req, res)

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
    await UsuarioDadosController.delete(req, res)

    // Assert
    expect(res.status).toHaveBeenCalledWith(500)
  })
})
