/* eslint-disable camelcase */
'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Cart_Item extends Model {
    static associate (models) {
      // One Cart_Item belongs to one Shopping_Session
      Cart_Item.belongsTo(models.Shopping_Session, {
        foreignKey: 'session_id',
        onDelete: 'CASCADE'
      })

      // One Cart_Item belongs to one Product
      Cart_Item.belongsTo(models.Product, {
        foreignKey: 'ProductId',
        onDelete: 'CASCADE'
      })
    }
  }
  Cart_Item.init({
    // idShoppingSession: DataTypes.INTEGER,
    // idProduct: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cart_Item',
    freezeTableName: true
  })
  return Cart_Item
}
