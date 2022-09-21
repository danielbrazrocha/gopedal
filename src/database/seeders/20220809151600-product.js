'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Product', [
      {
        id: 1,
        CategoryId: 1,
        // discount_id: "",
        InventoryId: 1,
        name: 'Pedal Clip MTB PD-M324 (Prata) - Shimano',
        description: 'Pedal clip para bicicleta MTB, marca Shimano, modelo PD-M324, cor Prata. Especificação:- Marca: Shimano - Modelo: PD-M324- Código Shimano: EPDM324 - Cor: Prata- Rosca: Grossa tipo Inglês 9/16"- Acompanha par de taquinho: SM-SH56- Sistema misto, sendo um lado com clip e o outro com apoio normal (sem clip)- Peso: 533 gramas (par)- Produto original.',
        image: '/assets/products/001-PedalClip.jpg',
        SKU: '1111',
        price: 520.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        CategoryId: 2,
        // discount_id: "",
        InventoryId: 2,
        name: 'Aro 26" 32 Furos Vmaxx DH Disc Parede Dupla Com Ilhós - Vzan',
        description: 'Aro para bicicleta com roda 26", marca VZAN, modelo Vmaxx DH Disc, 32 furos, parede dupla, com Ilhós. O aro Vzan Vmaxx DH é um dos principais aros para do Downhill. Foi desenvolvido para uso Extremo dentro das modalidades do DH. Sua estrutura é capaz de suportar grandes obstáculos que são exigidos pelos consumidores desta modalidade.',
        image: '/assets/products/002-Aro.jpg',
        SKU: '2222',
        price: 135.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        CategoryId: 3,
        // discount_id: "",
        InventoryId: 3,
        name: 'Bomba Encher Pneu Oficina 160psi GP-43P - Giyo',
        description: 'Bomba de encher pneu de bicicleta, marca Giyo, modelo GF-43P, Com Manômetro, Válvula Presta, 160psi.',
        image: '/assets/products/006-bomba.jpg',
        SKU: '3333',
        price: 160.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        CategoryId: 4,
        // discount_id: "",
        InventoryId: 4,
        name: 'Cassete 9V 11-36D CS-HG201 - Shimano',
        description: 'Cassete para bicicleta, marca Shimano, modelo CS-HG201, 9 velocidades, 11 x 36 dentes na cor prata / cromado.',
        image: '/assets/products/003-cassete.jpg',
        SKU: '4444',
        price: 230.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        CategoryId: 5,
        // discount_id: "",
        InventoryId: 5,
        name: 'Par Freio Disco Hidráulico Dxu-1901 - Absolute',
        description: 'Par de freio a disco hidráulico, marca Absolute, modelo DXU-1901, incluso rotor.',
        image: '/assets/products/005-freio.jpg',
        SKU: '5555',
        price: 480.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        CategoryId: 6,
        // discount_id: "",
        // InventoryId: 1,
        name: 'Suspensão Mtb Aro 29" Curso 100mm Prime SL Air (Tapered) - Absolute',
        description: 'Suspensão para bicicleta MTB com aro 29", marca Absolute, modelo Prime SL Air, 100mm de curso, espiga cônica / tapered, com trava no guidão, cor preto.',
        image: '/assets/products/006-suspensao.jpg',
        SKU: '6666',
        price: 1045.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        CategoryId: 7,
        // discount_id: "",
        // InventoryId: 1,
        name: 'Pneu Aro 29 X 2.25 Jet Arame - Michelin',
        description: 'Pneu para bicicleta com aro 29", marca Michelin, modelo Jet 29 x 2.25 de Arame.',
        image: '/assets/products/004-pneu.jpg',
        SKU: '7777',
        price: 120.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        CategoryId: 8,
        // discount_id: "",
        // InventoryId: 1,
        name: 'Cadeirinha Criança Traseira Fun KF401 - Kalf',
        description: 'Cadeirinha para criança para instalação na traseira da bicicleta, marca Kalf, modelo Fun Bike, cor Cinza.' +
        'Fun Bike é uma cadeirinha de bicicleta traseira infantil, com fixação no bagageiro, própria para crianças capazes de sentar-se sozinhas com peso até 22KG, com base de engate rápido (quick release).' +
        'Para maior segurança, a cadeirinha é robusta, produzida com plástico polipropileno (PP) de alta resistência, possui refletores traseiros, cinto de segurança de 3 pontos, conjunto metálico de fixação, talas laterais para proteção de pernas e pés e fitilhos de contenção para os pés.' +
        'Para maior conforto, a cadeirinha tem formato anatômico, com maior espaço interno, com cantos arredondados e encosto alto para costas e cabeça, a altura do encosto proporciona retenção da cabeça da criança, mesmo que ela adormeça durante o passeio, possui almofadas de espuma (poliuretano) no encosto e assento, possui apoios com regulagem de altura para as pernas e pés e a altura da contenção dos pés mais alta (confortável para crianças maiores) e com ajuste de pés (confortável para crianças menores).',
        image: '/assets/products/008-cadeira.jpg',
        SKU: '8888',
        price: 250.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9,
        CategoryId: 9,
        // discount_id: "",
        // InventoryId: 1,
        name: 'Cesta Frontal Arame Fixa (Rosa)',
        description: 'Cesta frontal fixa para instalação no guidão da bicicleta, marca Oem, modelo Arame, cor Rosa.' +
        'A cesta para bicicleta pode ser um acessório indispensável, principalmente quando se precisa carregar algo em um meio de locomoção tão simples. A cestinha é tradicional em bicicletas infantis, mas muitos adultos também fazem do uso do acessório. Você pode colocar os mais diferentes objetos e levá-los à qualquer lugar. Produtos de excelente qualidade e ótimo custo-benefício.',
        image: '/assets/products/009-cesta.jpg',
        SKU: '9999',
        price: 44.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 10,
        CategoryId: 10,
        // discount_id: "",
        // InventoryId: 1,
        name: 'Farol Usb 700 Lumens JY-7029 - Absolute',
        description: 'Farol para bicicleta com carregamento via USB, bateria interna, 700 lumens, marca Absolute, modelo JY-7029 com 8 funções:' +
        '> 4 modos constantes (25%, 50%, 75%, 100% de potência)' +
        '> 4 modos pisca (25% lento, 50% rápido, 75% lento, 100% lento).',
        image: '/assets/products/010-farol.jpg',
        SKU: '101010',
        price: 190.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 11,
        CategoryId: 10,
        // discount_id: "",
        // InventoryId: 1,
        name: 'Capacete Infantil Y-03 (Preto) - Elleven',
        description: 'Capacete Infantil, marca Elleven, modelo Y-03, cor Preto',
        image: '/assets/products/005-capacete.jpg',
        SKU: '1100000',
        price: 86.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 12,
        CategoryId: 3,
        // discount_id: "",
        // InventoryId: 1,
        name: 'Aplicador de CO2 Com Refil GC-02P - High One',
        description: 'Aplicador de CO2, enche pneu de bicicleta em menos de 1 minuto, marca High One, modelo GC-02P, compacta e de fácil manuseio, possui válvula automática para a liberação do cartucho de CO2.',
        image: '/assets/products/012-co2.jpg',
        SKU: '1200000',
        price: 114.00,
        createdAt: new Date(),
        updatedAt: new Date()
      }

    ], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Product', null, {})
  }
}
