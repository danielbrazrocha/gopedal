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
  },
  edit: async (req, res) => {
    const inventoryId = req.params.id
    const inventory = await Inventory.findOne({
      where: {
        id: inventoryId
      }
    })

    return res.status(200).render('dashboard', {
      arquivoCss: 'dashboard.css',
      inventoryDetails: inventory
    })
  },
  submitEdit: async (req, res) => {
    return res.status(200).send('Submit Edit')
  },
  delete: async (req, res) => {
    const inventarioId = req.params.id
    await Inventory.destroy({
      where: {
        id: inventarioId
      }
    })
      .then(function (deletedRecord) {
        if (deletedRecord === 1) {
          return res.redirect('/painel/inventario')
        } else {
          return res.status(404).render('404', {
            textoErro: 'Inventario não encontrado, refaça sua busca ou tente novamente'
          })
        }
      })
      .catch(function (error) {
        res.status(500).json(error)
      })
  }
}

module.exports = PainelInventarioController
