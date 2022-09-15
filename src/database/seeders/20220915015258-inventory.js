'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Inventory', [
      {
        id: 1,
        quantity: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        quantity: 200,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        quantity: 300,
        createdAt: new Date(),
        updatedAt: new Date()
      }

    ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Inventory', null, {})
  }
}
