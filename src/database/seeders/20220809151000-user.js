'use strict'

const bcrypt = require('bcryptjs')
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('User', [
      {
        kind: 'admin',
        name: 'Administrator',
        password: bcrypt.hashSync('123456', 10),
        cpf: '90497311046',
        tel: '21999990000',
        email: 'admin@strator.com',
        birthdate: '1980-01-01',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        kind: 'user',
        name: 'Normal User',
        password: bcrypt.hashSync('123456', 10),
        cpf: '77522241030',
        tel: '21999991111',
        email: 'user@strator.com',
        birthdate: '1980-01-01',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        kind: 'user',
        name: 'User with Shopping Session',
        password: bcrypt.hashSync('123456', 10),
        cpf: '64233536039',
        tel: '21999992222',
        email: 'sessioner@strator.com',
        birthdate: '1980-01-01',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        kind: 'user',
        name: 'User with One Order',
        password: bcrypt.hashSync('123456', 10),
        cpf: '91318808006',
        tel: '21999993333',
        email: 'buyer@strator.com',
        birthdate: '1980-01-01',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        kind: 'user',
        name: 'User to test Account Service',
        password: bcrypt.hashSync('ABCd123456', 10),
        cpf: '29432901653',
        tel: '21999994444',
        email: 'newuser@strator.com',
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
