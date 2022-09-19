/* eslint-disable camelcase */
const { Order_Details, Order_Itens } = require('../models')

const PainelInventarioController = {

  show: async (req, res) => {
    try {
      const orderList = await Order_Details.findAll({
        include: ['user']
      })

      if (orderList.length === 0) {
        return res.status(200).render('dashboard', {
          arquivoCss: 'dashboard.css',
          error: 'Não há nenhuma compra efetuada.'
        })
      }

      // indica o arquivo EJS dentro de view a ser chamado
      return res.status(200).render('dashboard', {
        arquivoCss: 'dashboard.css',
        pedidos: orderList
      })
    } catch (error) {
      return res.status(500).json({ message: 'Error' + error })
    }
  },
  edit: async (req, res) => {
    const orderId = req.params.id
    const itemList = await Order_Itens.findAll({
      where: {
        OrderDetailId: orderId
      },
      include: ['product']
    })

    console.log(itemList)

    return res.status(200).render('dashboard', {
      arquivoCss: 'dashboard.css',
      orderDetails: itemList,
      newItem: false
    })
  }
}

module.exports = PainelInventarioController
