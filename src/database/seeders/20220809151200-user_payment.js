'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('User_Payment', [
      {
        UserId: 1,
        payment_type: 'Cartao de Credito',
        provider: 'VISA',
        account_number: 1234000012341234,
        expiry: '09/2025',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        UserId: 1,
        payment_type: 'Cartao de Debito',
        provider: 'MASTERCARD',
        account_number: 1234000012340000,
        expiry: '09/2026',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('User_Address', null, {})
  }
}
