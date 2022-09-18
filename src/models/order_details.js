/* eslint-disable camelcase */
'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Order_Details extends Model {
    static associate (models) {
      // Order_Details.belongsTo(models.User, {
      //   foreignKey: 'UserId',
      //   onDelete: 'CASCADE'
      // })

      // Order_Details.hasOne(models.Payment_Details, {
      //   foreignKey: 'order_id',
      //   onDelete: 'CASCADE'
      // })

      // Order_Details.hasMany(models.Order_Itens, {
      //   foreignKey: 'order_id',
      //   onDelete: 'CASCADE'
      // })
    }
  }
  Order_Details.init({
    // idUser: DataTypes.INTEGER,
    // idPayment: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order_Details',
    freezeTableName: true
  })
  return Order_Details
}
