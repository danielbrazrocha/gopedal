const { Inventory } = require('../models')
// const { validationResult } = require('express-validator')

// let validaCpf = require('')
const PainelInventarioController = {

  // showCategory = método do controller para renderizar a view com a lista de categoryiesos forms de cadastro,
  // chamado em index.js
  show: async (req, res) => {
    // indica o arquivo EJS dentro de view a ser chamado

    try {
      const inventoryList = await Inventory.findAll({
        where: {
          deletedAt: null
        }
      })

      if (inventoryList.length === 0) {
        return res.status(200).render('dashboard', {
          arquivoCss: 'dashboard.css',
          error: 'Não há nenhum inventário cadastrado.'
        })
      }

      // indica o arquivo EJS dentro de view a ser chamado
      return res.status(200).render('dashboard', {
        arquivoCss: 'dashboard.css',
        inventarios: inventoryList
      })
    } catch (error) {
      return res.status(500).json({ message: 'Error' + error })
    }
  }
}

module.exports = PainelInventarioController