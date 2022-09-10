'use strict'

const bcrypt = require('bcryptjs')
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('User', [
      {
        kind: 'admin',
        name: 'Administrator',
        password: bcrypt.hashSync('123456', 10),
        cpf: '11111111111',
        tel: '11555551111',
        email: 'admin@strator.com',
        birthdate: '1980-01-01',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        kind: 'user',
        name: 'Normal User',
        password: bcrypt.hashSync('123456', 10),
        cpf: '22222222222',
        tel: '22555552222',
        email: 'user@strator.com',
        birthdate: '1980-01-01',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('User', null, {})
  }
}
