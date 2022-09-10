'use strict'
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('User_Payment', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'User',
          key: 'id'
        }
      },
      payment_type: {
        type: Sequelize.STRING
      },
      provider: {
        type: Sequelize.STRING
      },
      account_number: {
        type: Sequelize.INTEGER
      },
      expiry: {
        type: Sequelize.STRING
      },
      deleted_at: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('User_Payment')
  }
}
