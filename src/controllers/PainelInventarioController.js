const { Inventory } = require('../models')
const { validationResult } = require('express-validator')

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
  add: async (req, res, next) => {
    return res.status(200).render('dashboard', {
      arquivoCss: 'dashboard.css',
      inventoryDetails: {},
      newItem: true
    })
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
      inventoryDetails: inventory,
      newItem: false
    })
  },
  submitEdit: async (req, res) => {
    const errors = validationResult(req)

    // verificando se há erros de validação
    if (errors.isEmpty()) {
      // Desestruturando as informações para utilização no sequelize
      const { id, quantity, newItem } = req.body
      try {
        let ans
        if (newItem) {
          ans = await Inventory.create({
            quantity,
            createAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          })
        } else {
          const newItemData = {
            quantity,
            updatedAt: new Date().toISOString()
          }
          ans = await Inventory.update(newItemData, {
            where: {
              id
            }
          })
        }

        // verificando se o producto foi criado existe no BD
        if (!ans) {
          return res.status(422).render('dashboard', {
            arquivoCss: 'dashboard.css',
            error: `Erro na atualização do inventário Id ${id}. Verifique as informações e tente novamente.`
          })
        }

        return res.status(201).render('dashboard', {
          arquivoCss: 'dashboard.css',
          success: `Inventário Id ${id} atualizado com sucesso.`
        })
      } catch (err) {
        return res.status(500).render('dashboard', {
          arquivoCss: 'dashboard.css',
          error: 'Erro interno no sistema. Entre em contato com o administrador.'
        })
      }
      // caso existam erros na validação, renderizar a view com os erros
    } else {
      // caso existam erros na validação, renderizar a view com os erros
      return res.status(422).render('dashboard', {
        arquivoCss: 'dashboard.css',
        errors: errors.errors
      })
    }
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
