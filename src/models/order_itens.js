/* eslint-disable camelcase */
'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Order_Itens extends Model {
    static associate (models) {
      // // One Order_Itens belongs to one Order_Details
      // Order_Itens.belongsTo(models.Order_Details, {
      //   foreignKey: 'order_id',
      //   onDelete: 'CASCADE'
      // })

      // // One Order_Itens belongs to one Product
      // Order_Itens.belongsTo(models.Product, {
      //   foreignKey: 'ProductId',
      //   onDelete: 'CASCADE'
      // })
    }
  }
  Order_Itens.init({
  }, {
    sequelize,
    modelName: 'Order_Itens',
    freezeTableName: true
  })
  return Order_Itens
}
