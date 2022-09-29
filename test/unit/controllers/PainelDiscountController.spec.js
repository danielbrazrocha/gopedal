/* eslint-disable no-undef */
const PainelDescontoController = require('../../../src/controllers/PainelDescontoController')

describe('PainelDescontoController tests', () => {
  test('should throw error on show method', async () => {
    // Arrange
    const req = { }
    const res = {
      render: jest.fn().mockImplementationOnce(() => { throw new Error() }),
      status: jest.fn(() => res)
    }
    // Act
    await PainelDescontoController.show(req, res)

    // Assert
    expect(res.status).toHaveBeenCalledWith(500)
  })

  test('should throw error on submitEdit method', async () => {
    // Arrange
    const req = {
      body: {
        id: 1,
        nome: 'fake_name',
        description: 'fake_description',
        discountpercent: 5,
        active: true,
        newItem: false
      }
    }
    const res = {
      render: jest.fn().mockImplementationOnce(() => { throw new Error() }),
      status: jest.fn(() => res)
    }
    // Act
    await PainelDescontoController.submitEdit(req, res)

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
    await PainelDescontoController.delete(req, res)

    // Assert
    expect(res.status).toHaveBeenCalledWith(500)
  })
})
