/* eslint-disable camelcase */
const { Order_Details, Order_Itens } = require('../models')

const UsuarioPedidoController = {

  show: async (req, res) => {
    const UserId = req.session.user.id
    try {
      const orderList = await Order_Details.findAll({
        where: {
          UserId
        },
        include: ['payment_details', 'orderitens']
      })

      if (orderList.length === 0) {
        return res.status(200).render('usuario', {
          arquivoCss: 'dashboard.css',
          error: 'Não há nenhum pedido efetuado.'
        })
      }

      // indica o arquivo EJS dentro de view a ser chamado
      return res.status(200).render('usuario', {
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

    return res.status(200).render('usuario', {
      arquivoCss: 'dashboard.css',
      pedidoDetails: itemList
    })
  }
}

module.exports = UsuarioPedidoController
