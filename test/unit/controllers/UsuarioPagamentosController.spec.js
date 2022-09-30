/* eslint-disable no-undef */
const UsuarioPagamentosController = require('../../../src/controllers/UsuarioPagamentosController')

describe('UsuarioPagamentosController tests', () => {
  // // TODO: this
  // test.only('should throw error on show method', async () => {
  //   const req = {
  //     session: {
  //       user: {
  //         id: 1
  //       }
  //     }
  //   }
  //   const res = {
  //     render: jest.fn().mockImplementationOnce(() => { throw new Error() }),
  //     status: jest.fn(() => res)
  //   }
  //   // Act
  //   await UsuarioPagamentosController.show(req, res)

  //   // Assert
  //   expect(res.status).toHaveBeenCalledWith(500)
  // })

  test('should throw error on submitEdit method', async () => {
    // Arrange
    const req = {
      session: {
        user: {
          id: 'fake_id',
          name: 'fake_name',
          kind: 'fake_kind',
          shopping_session: 1
        }
      },
      body: {
        id: 1,
        UserId: 1,
        payment_type: 'Cartao de Credito',
        provider: 'VISA',
        account_number: '4929913630080830',
        expiry: '11/2027',
        newItem: false
      }
    }
    const res = {
      render: jest.fn().mockImplementationOnce(() => { throw new Error() }),
      status: jest.fn(() => res)
    }
    // Act
    await UsuarioPagamentosController.submitEdit(req, res)

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
    await UsuarioPagamentosController.delete(req, res)

    // Assert
    expect(res.status).toHaveBeenCalledWith(500)
  })

  test('should throw error on add method', async () => {
    // Arrange
    const req = { }
    const res = {
      render: jest.fn().mockImplementationOnce(() => { throw new Error() }),
      status: jest.fn(() => res)
    }
    // Act
    await UsuarioPagamentosController.add(req, res)

    // Assert
    expect(res.status).toHaveBeenCalledWith(500)
  })
})
