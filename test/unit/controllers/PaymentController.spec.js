/* eslint-disable no-undef */
const PaymentController = require('../../../src/controllers/PaymentController')

describe('PaymentController tests', () => {
  test('should throw error on cancel method', async () => {
    // Arrange
    // makeUser(1)
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
})
