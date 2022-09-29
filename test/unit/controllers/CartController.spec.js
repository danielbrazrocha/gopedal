/* eslint-disable no-undef */
const CartController = require('../../../src/controllers/CartController')

describe('CartController tests', () => {
  test('should throw error on show method', async () => {
    // Arrange
    const req = {
      session: {
        user: {
          id: 'fake_id',
          name: 'fake_name',
          kind: 'fake_kind',
          shopping_session: 1
        }
      }
    }
    const res = {
      render: jest.fn().mockImplementationOnce(() => { throw new Error() }),
      status: jest.fn(() => res)
    }
    // Act
    await CartController.show(req, res)

    // Assert
    expect(res.status).toHaveBeenCalledWith(500)
  })

  test('should throw error on addProduct method', async () => {
    // Arrange
    const req = {
      params: {
        id: 1
      },
      session: {
        user: {
          id: 'fake_id',
          name: 'fake_name',
          kind: 'fake_kind',
          shopping_session: 1
        }
      }
    }
    const res = {
      render: jest.fn().mockImplementationOnce(() => { throw new Error() }),
      status: jest.fn(() => res)
    }
    // Act
    await CartController.addProduct(req, res)

    // Assert
    expect(res.status).toHaveBeenCalledWith(500)
  })

  test('should throw error on delProduct method', async () => {
    // Arrange
    const req = {
      params: {
        id: 1
      },
      session: {
        user: {
          id: 'fake_id',
          name: 'fake_name',
          kind: 'fake_kind',
          shopping_session: 1
        }
      }
    }
    const res = {
      render: jest.fn().mockImplementationOnce(() => { throw new Error() }),
      status: jest.fn(() => res)
    }
    // Act
    await CartController.delProduct(req, res)

    // Assert
    expect(res.status).toHaveBeenCalledWith(500)
  })

  test('should throw error on removeProduct method', async () => {
    // Arrange
    const req = {
      params: {
        id: 1
      },
      session: {
        user: {
          id: 'fake_id',
          name: 'fake_name',
          kind: 'fake_kind',
          shopping_session: 1
        }
      }
    }
    const res = {
      render: jest.fn().mockImplementationOnce(() => { throw new Error() }),
      status: jest.fn(() => res)
    }
    // Act
    await CartController.removeProduct(req, res)

    // Assert
    expect(res.status).toHaveBeenCalledWith(500)
  })

  // test('should throw error on includeProduct method', async () => {
  //   // Arrange
  //   const req = {
  //     params: {
  //       id: 1
  //     },
  //     session: {
  //       user: {
  //         id: 'fake_id',
  //         name: 'fake_name',
  //         kind: 'fake_kind',
  //         shopping_session: 1
  //       }
  //     }
  //   }
  //   const res = {
  //     render: jest.fn().mockImplementationOnce(() => { throw new Error() }),
  //     status: jest.fn(() => res)
  //   }
  //   // Act
  //   await CartController.includeProduct(req, res)

  //   // Assert
  //   expect(res.status).toHaveBeenCalledWith(500)
  // })
})
