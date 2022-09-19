'use strict'
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Cart_Item', [
      {
        ProductId: 1,
        ShoppingSessionId: 1,
        quantity: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ProductId: 2,
        ShoppingSessionId: 1,
        quantity: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Cart_Item', null, {})
  }
}
