'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Discount extends Model {
    static associate (models) {
      Discount.hasMany(models.Product, {
        foreignKey: 'discount_id',
        onDelete: 'CASCADE'
      })
    }
  }
  Discount.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    discount_percent: DataTypes.FLOAT,
    active: DataTypes.BOOLEAN,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Discount',
    freezeTableName: true
  })
  return Discount
}
