/* eslint-disable camelcase */
'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Order_Itens extends Model {
    static associate (models) {
      Order_Itens.belongsTo(models.Product, {
        foreignKey: 'ProductId',
        as: 'product'
      })
      Order_Itens.belongsTo(models.Order_Details, {
        foreignKey: 'OrderDetailsId',
        as: 'orderdetail'
      })
    }
  }
  Order_Itens.init({
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order_Itens',
    freezeTableName: true
  })
  return Order_Itens
}
