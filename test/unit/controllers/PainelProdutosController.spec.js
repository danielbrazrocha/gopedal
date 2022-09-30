/* eslint-disable no-undef */
const PainelProdutosController = require('../../../src/controllers/PainelProdutosController')

describe('PainelProdutosController tests', () => {
  test('should throw error on show method', async () => {
    const req = { }
    const res = {
      render: jest.fn().mockImplementationOnce(() => { throw new Error() }),
      status: jest.fn(() => res)
    }
    // Act
    await PainelProdutosController.show(req, res)

    // Assert
    expect(res.status).toHaveBeenCalledWith(500)
  })

  test('should throw error on submitEdit method', async () => {
    // Arrange
    const req = {
      body: {
        id: 1,
        name: 'Pedal Clip MTB PD-M324 (Prata) - Shimano',
        description: 'Pedal clip para bicicleta MTB, marca Shimano, modelo PD-M324, cor Prata. Especificação:- Marca: Shimano - Modelo: PD-M324- Código Shimano: EPDM324 - Cor: Prata- Rosca: Grossa tipo Inglês 9/16"- Acompanha par de taquinho: SM-SH56- Sistema misto, sendo um lado com clip e o outro com apoio normal (sem clip)- Peso: 533 gramas (par)- Produto original.',
        image: '/assets/products/001-PedalClip.jpg',
        SKU: '1111',
        price: 520.00,
        newItem: false
      }
    }
    const res = {
      render: jest.fn().mockImplementationOnce(() => { throw new Error() }),
      status: jest.fn(() => res)
    }
    // Act
    await PainelProdutosController.submitEdit(req, res)

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
    await PainelProdutosController.delete(req, res)

    // Assert
    expect(res.status).toHaveBeenCalledWith(500)
  })
})
