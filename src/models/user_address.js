/* eslint-disable camelcase */
'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User_Address extends Model {
    static associate (models) {
      // One User_Address belongs to one User
      User_Address.belongsTo(models.User, {
        foreignKey: 'UserId',
        onDelete: 'CASCADE'
      })
    }
  }
  User_Address.init({
    description: DataTypes.STRING,
    street: DataTypes.STRING,
    number: DataTypes.INTEGER,
    details: DataTypes.STRING,
    CEP: DataTypes.STRING,
    country: DataTypes.STRING,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User_Address',
    freezeTableName: true
  })
  return User_Address
}
