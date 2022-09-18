'use strict'
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Product', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      InventoryId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        unique: true,
        references: {
          model: 'Inventory',
          key: 'id'
        }
      },
      CategoryId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Category',
          key: 'id'
        }
      },
      DiscountId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Discount',
          key: 'id'
        }
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING(2000)
      },
      image: {
        type: Sequelize.STRING
      },
      SKU: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.FLOAT
      },
      deletedAt: {
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
    await queryInterface.dropTable('Product')
  }
}
