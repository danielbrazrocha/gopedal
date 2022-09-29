/* eslint-disable no-undef */
const CadastroController = require('../../../src/controllers/CadastroController')

describe('Cadastro Controller tests', () => {
  test('should throw error', async () => {
    // Arrange
    const req = {
      body: { nome: 'Daniel Gustavo', cpf: '29432901653', tel: '1111111111', email: '1234@teste.com', senha: 'ABCd123456', repeteSenha: 'ABCd123456' }
    }
    const res = {
      render: jest.fn().mockImplementationOnce(() => { throw new Error() }),
      status: jest.fn(() => res)
    }

    // Act
    await CadastroController.register(req, res)

    // Assert
    expect(res.status).toHaveBeenCalledWith(500)
  })
})
