'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('User_Address', [
      {
        UserId: 1,
        description: 'Casa do Administrador',
        street: 'Rua dos Bobos',
        number: 0,
        details: 'Detalhes da Casa do Admin',
        CEP: '11123-123',
        country: 'Brasil',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        UserId: 2,
        description: 'Casa do Usuario',
        street: 'Rua dos Bobos',
        number: 0,
        details: 'Detalhes da Casa do Usuario',
        CEP: '11123-123',
        country: 'Brasil',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('User_Address', null, {})
  }
}
