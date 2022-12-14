/* eslint-disable camelcase */
const { Cart_Item, Shopping_Session } = require('../models')
const { QueryTypes } = require('sequelize')
const models = require('../models')

const CartController = {

  show: async (req, res) => {
    const { shopping_session } = req.session.user
    try {
      const cartDetails = await Cart_Item.findAll({
        where: {
          ShoppingSessionId: shopping_session
        },
        include: ['product', 'shoppingsession']
      })
      // console.log('cartDetails', cartDetails)

      if (cartDetails?.length === 0) {
        return res.status(200).render('carrinho', {
          arquivoCss: 'carrinho.css',
          error: 'Não há nenhuma informação cadastrada.',
          cartItens: cartDetails
        })
      }

      return res.status(200).render('carrinho', {
        arquivoCss: 'carrinho.css',
        cartItens: cartDetails
      })
    } catch (error) {
      return res.status(500).render({ message: 'Error' + error })
    }
  },
  addProduct: async (req, res) => {
    try {
      const cartItemId = req.params.id
      const ShoppingSessionId = req.session.user.shopping_session
      const cartItem = await Cart_Item.findOne({
        where: {
          ShoppingSessionId,
          ProductId: cartItemId
        },
        include: ['product', 'shoppingsession']
      })

      if (!cartItem) {
        return res.status(422).render('carrinho', {
          arquivoCss: 'carrinho.css',
          error: 'Pedido não localizado!'
        })
      }

      const newItemData = {
        quantity: cartItem.quantity + 1,
        updatedAt: new Date().toISOString()
      }

      // update Cart_Item with new quantity
      await Cart_Item.update(newItemData, {
        where: {
          id: cartItem.id
        }
      })

      // calculate total value of Cart Itens
      const cartTotalPrice = await models.sequelize.query(`SELECT SUM(p.price * ci.quantity) as newTotal FROM go_pedal.Product p , go_pedal.Cart_Item ci  ,go_pedal.Shopping_Session ss  WHERE ss.id = ${ShoppingSessionId} AND ss.id = ci.ShoppingSessionId AND ci.ProductId =p.id`, { type: QueryTypes.SELECT })

      // update Shopping_Session with new total value
      await Shopping_Session.update({
        individualHooks: true,
        total: cartTotalPrice[0].newTotal,
        updatedAt: new Date().toISOString()
      }, {
        where: {
          id: ShoppingSessionId
        }
      })

      return res.redirect('/carrinho')
    } catch (error) {
      return res.status(500).render({ message: 'Error' + error })
    }
  },
  delProduct: async (req, res) => {
    try {
      const cartItemId = req.params.id
      const ShoppingSessionId = req.session.user.shopping_session
      const cartItem = await Cart_Item.findOne({
        where: {
          ShoppingSessionId,
          ProductId: cartItemId
        },
        include: ['product', 'shoppingsession']
      })

      if (!cartItem) {
        return res.status(422).render('carrinho', {
          arquivoCss: 'carrinho.css',
          error: 'Pedido não localizado!'
        })
      }

      
      const newItemData = {
        quantity: cartItem.quantity - 1,
        updatedAt: new Date().toISOString()
      }

      await Cart_Item.update(newItemData, {
        individualHooks: true,
        where: {
          id: cartItem.id
        }
      })
      // calculate total value of Cart Itens
      const cartTotalPrice = await models.sequelize.query(`SELECT SUM(p.price * ci.quantity) as newTotal FROM Product p , Cart_Item ci, Shopping_Session ss WHERE ss.id = ${ShoppingSessionId} AND ss.id = ci.ShoppingSessionId AND ci.ProductId =p.id`, { type: QueryTypes.SELECT })

      // if (cartTotalPrice[0].newTotal < 0) {
      //   return res.status(422).render('carrinho', {
      //     arquivoCss: 'carrinho.css',
      //     cartItens: {},
      //     error: 'O produto não pode ter valor negativo. Exclua-o primeiro.'
      //   })
      // }

      // update Shopping_Session with new total value
      await Shopping_Session.update({
        individualHooks: true,
        total: cartTotalPrice[0].newTotal,
        updatedAt: new Date().toISOString()
      }, {
        where: {
          id: ShoppingSessionId
        }
      })

      return res.redirect('/carrinho')
    } catch (error) {
      return res.status(500).render({ message: 'Error' + error })
    }
  },
  removeProduct: async (req, res) => {
    try {
      const cartItemId = req.params.id
      const ShoppingSessionId = req.session.user.shopping_session
      const cartItem = await Cart_Item.findOne({
        where: {
          ShoppingSessionId,
          ProductId: cartItemId
        },
        include: ['product', 'shoppingsession']
      })

      if (!cartItem) {
        return res.status(422).render('carrinho', {
          arquivoCss: 'carrinho.css',
          error: 'Pedido não localizado!'
        })
      }

      await Cart_Item.destroy({
        where: {
          id: cartItem.id
        }
      })
        .then(async function (deletedRecord) {
          if (deletedRecord === 1) {
            // calculate total value of Cart Itens
            const cartTotalPrice = await models.sequelize.query(`SELECT SUM(p.price * ci.quantity) as newTotal FROM go_pedal.Product p , go_pedal.Cart_Item ci  ,go_pedal.Shopping_Session ss  WHERE ss.id = ${ShoppingSessionId} AND ss.id = ci.ShoppingSessionId AND ci.ProductId =p.id`, { type: QueryTypes.SELECT })

            // if (!cartTotalPrice[0].newTotal) {
            //   cartTotalPrice[0].newTotal = 0
            // }

            // update Shopping_Session with new total value
            await Shopping_Session.update({
              total: cartTotalPrice[0].newTotal,
              updatedAt: new Date().toISOString()
            }, {
              where: {
                id: ShoppingSessionId
              }
            })
            return res.redirect('/carrinho')
          }
        })
    } catch (error) {
      return res.status(500).render({ message: 'Error' + error })
    }
  },
  includeProduct: async (req, res) => {
    try {
      const ProductId = req.params.id
      const ShoppingSessionId = req.session.user.shopping_session

      try {
        await Cart_Item.findOrCreate({
          where: {
            ProductId,
            ShoppingSessionId
          },
          defaults: {
            quantity: 1
          }
        })
      } catch (error) {
        return res.status(500).render({ message: 'Error' + error })
      }

      // calculate total value of Cart Itens
      const cartTotalPrice = await models.sequelize.query(`SELECT SUM(p.price * ci.quantity) as newTotal FROM go_pedal.Product p , go_pedal.Cart_Item ci  ,go_pedal.Shopping_Session ss  WHERE ss.id = ${ShoppingSessionId} AND ss.id = ci.ShoppingSessionId AND ci.ProductId = p.id`, { type: QueryTypes.SELECT })

      // update Shopping_Session with new total value
        await Shopping_Session.update({
          total: cartTotalPrice[0].newTotal,
          updatedAt: new Date().toISOString()
        }, {
          where: {
            id: ShoppingSessionId
          }
        })

      return res.redirect('/carrinho')
    } catch (error) {
      return res.status(500).render({ message: 'Error' + error })
    }
  }
}

module.exports = CartController
