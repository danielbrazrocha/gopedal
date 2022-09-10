'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Category', [
      {
        id: 1,
        name: 'Pedais',
        description: 'Pedais e pedivelas',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'Quadro',
        description: 'Quadros, selins e guidões',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: 'Manutenção',
        description: 'Bombas, medidores de pressão e remendos',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        name: 'Transmissão',
        description: 'Pinhão, cassetes, coroas, cubos, correntes e câmbios',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        name: 'Freios',
        description: 'Freios, mangueiras, pastilhas e óleos de lubrificação',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        name: 'Suspensão',
        description: 'Garfos e suspensões',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        name: 'Rodas',
        description: 'Raios, rodas, rolamentos, câmaras, pneus e aros',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        name: 'Cadeiras',
        description: 'Cadeiras infantis',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9,
        name: 'Bagageiros',
        description: 'Bagageiros, suportes e bolsas',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 10,
        name: 'Segurança',
        description: 'Iluminação, buzinas, espelhos, faróis e sinalizadores',
        createdAt: new Date(),
        updatedAt: new Date()
      }

    ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Category', null, {})
  }
}
