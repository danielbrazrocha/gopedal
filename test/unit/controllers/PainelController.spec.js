/* eslint-disable no-undef */
const PainelController = require('../../../src/controllers/PainelController')

describe('PainelController tests', () => {
  test('should throw error on show method', async () => {
    // Arrange
    const req = { }
    const res = {
      render: jest.fn().mockImplementationOnce(() => { throw new Error() }),
      status: jest.fn(() => res)
    }
    // Act
    await PainelController.show(req, res)

    // Assert
    expect(res.status).toHaveBeenCalledWith(500)
  })
})
