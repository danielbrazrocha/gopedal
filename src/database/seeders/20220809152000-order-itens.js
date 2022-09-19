'use strict'
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Order_Itens', [
      {
        ProductId: 1,
        OrderDetailsId: 1,
        quantity: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ProductId: 2,
        OrderDetailsId: 1,
        quantity: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Order_Itens', null, {})
  }
}
