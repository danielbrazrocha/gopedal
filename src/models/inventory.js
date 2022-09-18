'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Inventory extends Model {
    static associate (models) {
      Inventory.hasMany(models.Product, {
        as: 'products'
        })
    }
  }
  Inventory.init({
    quantity: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Inventory',
    freezeTableName: true
  })
  return Inventory
}
