/* eslint-disable no-undef */
const UsuarioPedidoController = require('../../../src/controllers/UsuarioPedidoController')

describe('UsuarioPedidoController tests', () => {
  // // TODO: this
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
    await UsuarioPedidoController.show(req, res)

    // Assert
    expect(res.status).toHaveBeenCalledWith(500)
  })

  test('should throw error on edit method', async () => {
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
    await UsuarioPedidoController.edit(req, res)

    // Assert
    expect(res.status).toHaveBeenCalledWith(500)
  })
})
