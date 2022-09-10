/* eslint-disable camelcase */
'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Payment_Details extends Model {
    static associate (models) {
      Payment_Details.belongsTo(models.Order_Details, {
        foreignKey: 'order_id',
        onDelete: 'CASCADE'
      })
    }
  }
  Payment_Details.init({
    amount: DataTypes.FLOAT,
    provider: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Payment_Details',
    freezeTableName: true
  })
  return Payment_Details
}
