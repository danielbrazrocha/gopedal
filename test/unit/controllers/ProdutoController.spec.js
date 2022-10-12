/* eslint-disable no-undef */
const ProdutoController = require('../../../src/controllers/ProdutoController')

describe('ProdutoController tests', () => {
  test('should throw error on detalhesProduto method', async () => {
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
    await ProdutoController.detalhesProduto(req, res)

    // Assert
    expect(res.status).toHaveBeenCalledWith(500)
  })
})
