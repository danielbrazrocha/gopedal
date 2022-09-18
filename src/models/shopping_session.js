/* eslint-disable camelcase */
'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Shopping_Session extends Model {
    static associate (models) {
      Shopping_Session.belongsTo(models.User, {
        foreignKey: 'UserId',
        as: 'user'
      })

      // Shopping_Session.hasMany(models.Cart_Item, {
      //   foreignKey: 'session_id',
      //   onDelete: 'CASCADE'
      // })
    }
  }
  Shopping_Session.init({
    total: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Shopping_Session',
    freezeTableName: true
  })
  return Shopping_Session
}
