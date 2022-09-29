/* eslint-disable no-undef */
const IndexController = require('../../../src/controllers/IndexController')

describe('Index Controller tests', () => {
  test('should throw error on index method', async () => {
    // Arrange
    const req = { }
    const res = {
      render: jest.fn().mockImplementationOnce(() => { throw new Error() }),
      status: jest.fn(() => res)
    }

    // Act
    await IndexController.index(req, res)

    // Assert
    expect(res.status).toHaveBeenCalledWith(500)
  })

  test('should throw error on searchResults method', async () => {
    // Arrange
    const req = {
      body: { queryTxt: 'fake_product' }
    }
    const res = {
      render: jest.fn().mockImplementationOnce(() => { throw new Error() }),
      status: jest.fn(() => res)
    }

    // Act
    await IndexController.searchResults(req, res)

    // Assert
    expect(res.status).toHaveBeenCalledWith(500)
  })
})
