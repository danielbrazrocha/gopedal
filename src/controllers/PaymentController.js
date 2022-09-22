/* eslint-disable camelcase */
const { Cart_Item, Shopping_Session, Order_Itens, Order_Details } = require('../models')
const { QueryTypes } = require('sequelize')
const models = require('../models')
const stripe = require('stripe')('sk_test_51LkY96Ct7XDWH8ggHRRkiQVCZJQ1VtrvC3l6tPXws2KKk18IaLh0pG1hUvRFFzkUm1hBbS6JLAjofFCsr2qbJX4b00pwtALlxH')
// const stripe = require('stripe')(process.env.STRIPE_SK_KEY )

const YOUR_DOMAIN = 'http://localhost:3000'
const ProductPrices = {
  1: 'price_1LkYOaCt7XDWH8ggMjo9akCP',
  2: 'price_1LkZuACt7XDWH8ggFasB6IML',
  3: 'price_1LkZvHCt7XDWH8ggVEBafy3L',
  4: 'price_1LkZvxCt7XDWH8ggixClZhOy',
  5: 'price_1LkZwdCt7XDWH8ggWydsxBli',
  6: 'price_1LkZxCCt7XDWH8gggN8X0kG0',
  7: 'price_1LkZxwCt7XDWH8ggTNn4FKqR',
  8: 'price_1LkZyYCt7XDWH8ggxu5Cg3L5',
  9: 'price_1LkZz2Ct7XDWH8gggv7ZXNDQ',
  10: 'price_1LkZzeCt7XDWH8ggcE6p0NUf',
  11: 'price_1Lka0BCt7XDWH8ggV3u6Eijv',
  12: 'price_1Lka0hCt7XDWH8ggf4Uw1TAd'
}

const PaymentController = {

  show: async (req, res) => {
    try {
      const { shopping_session } = req.session.user
      const cartTotalPrice = await models.sequelize.query(`SELECT p.id, ci.quantity FROM go_pedal.Product p , go_pedal.Cart_Item ci  ,go_pedal.Shopping_Session ss  WHERE ss.id = ${shopping_session} AND ss.id = ci.ShoppingSessionId AND ci.ProductId =p.id`, { type: QueryTypes.SELECT })

      const newItemList = cartTotalPrice.map((item) => {
        return {
          price: ProductPrices[item.id],
          quantity: item.quantity
        }
      })

      const session = await stripe.checkout.sessions.create({
        line_items: newItemList,
        mode: 'payment',
        success_url: `${YOUR_DOMAIN}/pagamento/confirmado`,
        cancel_url: `${YOUR_DOMAIN}/pagamento/cancelado`
      })

      res.redirect(303, session.url)
    } catch (error) {
      return res.status(500).json({ message: 'Error' + error })
    }
  },
  cancel: async (req, res) => {
    try {
      // archive the actual order on Order_Details and Order_Item
      const { shopping_session } = req.session.user
      // find actual tables
      const actualSession = await Shopping_Session.findOne({
        where: { id: shopping_session },
        include: ['cartitems']
      })

      // converting Shopping_Session to Order_Details
      const newOrder = await Order_Details.create({
        UserId: actualSession.UserId,
        total: actualSession.total,
        createdAt: new Date(),
        updatedAt: new Date()
      })

      // converting Cart_Item's to Order_Itens
      actualSession.cartitems.forEach(async (item) => {
        await Order_Itens.create({
          OrderDetailId: newOrder.id,
          UserId: actualSession.UserId,
          ProductId: item.ProductId,
          quantity: item.quantity,
          createdAt: new Date(),
          updatedAt: new Date()
        })
      })

      // removing converted Cart_Item's
      await Cart_Item.destroy({
        where: { ShoppingSessionId: shopping_session }
      })

      // removing converted Shopping_Session
      await Shopping_Session.destroy({
        where: { id: actualSession.id }
      })

      // refreshing a new Shopping_Session on BD
      const [newShoppingSession] = await Shopping_Session.findOrCreate({
        where: { UserId: actualSession.UserId },
        defaults: {
          total: 0
        }
      })
      req.session.user.shopping_session = newShoppingSession.id

      return res.status(200).render('pagamento', {
        arquivoCss: 'pagamento.css',
        successMsg: true
      })
    } catch (error) {
      return res.status(500).json({ message: 'Error' + error })
    }
  },
  success: async (req, res) => {
    try {
      return res.status(200).render('pagamento', {
        arquivoCss: 'pagamento.css',
        cancelMsg: true
      })
    } catch (error) {
      return res.status(500).json({ message: 'Error' + error })
    }
  }
}

module.exports = PaymentController
