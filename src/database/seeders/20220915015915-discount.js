'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Discount', [
      {
        id: 1,
        name: 'BLACKFRIDAY21',
        description: 'Cupom da campanha Black Friday 2021',
        discount_percent: 5,
        active: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'BLACKFRIDAY22',
        description: 'Cupom da campanha Black Friday 2022',
        discount_percent: 10,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: 'SINGLEDAY',
        description: 'Cupom do dia dos solteiros 2022',
        discount_percent: 2,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }

    ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Discount', null, {})
  }
}
