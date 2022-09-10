'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {

    static associate(models) {
      Product.hasMany(models.Cart_Item, {
        foreignKey: 'ProductId',
        onDelete: 'CASCADE'
      });
      Product.hasMany(models.Order_Itens, {
        foreignKey: 'ProductId',
        onDelete: 'CASCADE'
      });



    }
  }
  Product.init({
    // idCategory: DataTypes.INTEGER,
    // idDiscount: DataTypes.INTEGER,
    // idInventory: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.STRING(2000),
    image: DataTypes.STRING,
    SKU: DataTypes.STRING,
    price: DataTypes.FLOAT,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Product',
    freezeTableName: true
  });
  return Product;
};