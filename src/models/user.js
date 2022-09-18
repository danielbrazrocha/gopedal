'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      User.hasMany(models.User_Address, {
        // o atributo sera criado automaticamente no modelo User_Address não precisando ser referenciado no model
        // apenas no migration
        as: 'addresses'
      })
      User.hasMany(models.User_Payment, {
        // o atributo sera criado automaticamente no modelo User_Payment não precisando ser referenciado no model
        // apenas no migration
        as: 'payments'
      })
      User.hasOne(models.Shopping_Session, {
        // o atributo sera criado automaticamente no modelo Shopping_session não precisando ser referenciado no model)
        // apenas no migration
        foreignKey: 'UserId1',
        onDelete: 'CASCADE'
      })
      User.hasOne(models.Order_Details, {
        // o atributo sera criado automaticamente no modelo Order_Details não precisando ser referenciado no model)
        // apenas no migration
        foreignKey: 'UserId2',
        onDelete: 'CASCADE'
      })
    }
  }
  User.init({
    kind: DataTypes.STRING,
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    cpf: DataTypes.STRING,
    tel: DataTypes.STRING,
    email: DataTypes.STRING,
    birthdate: DataTypes.DATE,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User',
    freezeTableName: true
  })
  return User
}
