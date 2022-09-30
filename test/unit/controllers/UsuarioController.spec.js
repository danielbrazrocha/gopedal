/* eslint-disable no-undef */
const UsuarioController = require('../../../src/controllers/UsuarioController')

describe('UsuarioController tests', () => {
  test('should throw error on show method', async () => {
    // Arrange
    const req = { }
    const res = {
      render: jest.fn().mockImplementationOnce(() => { throw new Error() }),
      status: jest.fn(() => res)
    }
    // Act
    await UsuarioController.index(req, res)

    // Assert
    expect(res.status).toHaveBeenCalledWith(500)
  })
})
