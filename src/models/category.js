'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate (models) {
      Category.hasMany(models.Product, {
        as: 'products'
      })
    }
  }
  Category.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Category',
    freezeTableName: true
  })
  return Category
}
