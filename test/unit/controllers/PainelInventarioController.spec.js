/* eslint-disable no-undef */
const PainelInventarioController = require('../../../src/controllers/PainelInventarioController')

describe('PainelInventarioController tests', () => {
  test('should throw error on show method', async () => {
    const req = { }
    const res = {
      render: jest.fn().mockImplementationOnce(() => { throw new Error() }),
      status: jest.fn(() => res)
    }
    // Act
    await PainelInventarioController.show(req, res)

    // Assert
    expect(res.status).toHaveBeenCalledWith(500)
  })

  test('should throw error on submitEdit method', async () => {
    // Arrange
    const req = {
      body: {
        id: 1,
        quantity: 1,
        newItem: false
      }
    }
    const res = {
      render: jest.fn().mockImplementationOnce(() => { throw new Error() }),
      status: jest.fn(() => res)
    }
    // Act
    await PainelInventarioController.submitEdit(req, res)

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
    await PainelInventarioController.delete(req, res)

    // Assert
    expect(res.status).toHaveBeenCalledWith(500)
  })
})
