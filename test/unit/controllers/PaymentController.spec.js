/* eslint-disable no-undef */
const PaymentController = require('../../../src/controllers/PaymentController')

describe('PaymentController tests', () => {
  test('should throw error on show method', async () => {
  
    const req = {
      session: {
        user: {
          id: 1,
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
    await PaymentController.show(req, res)

    // Assert
    expect(res.status).toHaveBeenCalledWith(500)
  })

  test('should throw error on cancel method', async () => {
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
    await PaymentController.cancel(req, res)

    // Assert
    expect(res.status).toHaveBeenCalledWith(500)
  })

  test('should throw error on success method', async () => {
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
    await PaymentController.success(req, res)

    // Assert
    expect(res.status).toHaveBeenCalledWith(500)
  })
})
