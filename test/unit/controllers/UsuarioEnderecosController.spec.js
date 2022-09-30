/* eslint-disable no-undef */
const UsuarioEnderecosController = require('../../../src/controllers/UsuarioEnderecosController')

describe('UsuarioEnderecosController tests', () => {
  // TODO: this
  // test.only('should throw error on show method', async () => {
  //   const req = {
  //     session: {
  //       user: {
  //         id: 1
  //       }
  //     }
  //   }
  //   const res = {
  //     render: jest.fn().mockImplementationOnce(() => { throw new Error() }),
  //     status: jest.fn(() => res)
  //   }
  //   // Act
  //   await UsuarioEnderecosController.show(req, res)

  //   // Assert
  //   expect(res.status).toHaveBeenCalledWith(500)
  // })

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
        UserId: 1,
        description: 'Casa do Administrador',
        street: 'Rua dos Bobos',
        number: 0,
        details: 'Detalhes da Casa do Admin',
        CEP: '11123-123',
        country: 'Brasil',
        newItem: false
      }
    }
    const res = {
      render: jest.fn().mockImplementationOnce(() => { throw new Error() }),
      status: jest.fn(() => res)
    }
    // Act
    await UsuarioEnderecosController.submitEdit(req, res)

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
    await UsuarioEnderecosController.delete(req, res)

    // Assert
    expect(res.status).toHaveBeenCalledWith(500)
  })

  test('should throw error on add method', async () => {
    // Arrange
    const req = { }
    const res = {
      render: jest.fn().mockImplementationOnce(() => { throw new Error() }),
      status: jest.fn(() => res)
    }
    // Act
    await UsuarioEnderecosController.add(req, res)

    // Assert
    expect(res.status).toHaveBeenCalledWith(500)
  })
})
