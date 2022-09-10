'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_Payment extends Model {

    static associate(models) {
      User_Payment.belongsTo(models.User, {
        foreignKey: "UserId",
        onDelete: 'CASCADE'
      });
    }
  }
  User_Payment.init({
    payment_type: DataTypes.STRING,
    provider: DataTypes.STRING,
    account_number: DataTypes.INTEGER,
    expiry: DataTypes.STRING,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User_Payment',
    freezeTableName: true
  });
  return User_Payment;
};