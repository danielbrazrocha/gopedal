'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Inventory extends Model {
    static associate (models) {
      Inventory.hasOne(models.Product, {
        foreignKey: 'InventoryId',
        as: 'product'
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
