/* eslint-disable no-undef */
const PainelPedidoController = require('../../../src/controllers/PainelPedidoController')

describe('PainelPedidoController tests', () => {
  test('should throw error on show method', async () => {
    const req = { }
    const res = {
      render: jest.fn().mockImplementationOnce(() => { throw new Error() }),
      status: jest.fn(() => res)
    }
    // Act
    await PainelPedidoController.show(req, res)

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
    await PainelPedidoController.edit(req, res)

    // Assert
    expect(res.status).toHaveBeenCalledWith(500)
  })
})
