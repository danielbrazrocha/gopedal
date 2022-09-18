/* eslint-disable camelcase */
'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Cart_Item extends Model {
    static associate (models) {
      Cart_Item.belongsTo(models.Shopping_Session, {
        foreignKey: 'ShoppingSessionId',
        as: 'shoppingsession'
      })

      Cart_Item.belongsTo(models.Product, {
        foreignKey: 'ProductId',
        as: 'product'
      })
    }
  }
  Cart_Item.init({
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cart_Item',
    freezeTableName: true
  })
  return Cart_Item
}
