const { Category } = require('../models')
// const { validationResult } = require('express-validator')

// let validaCpf = require('')
const PainelCategoryController = {

  // showCategory = método do controller para renderizar a view com a lista de categoryiesos forms de cadastro,
  // chamado em index.js
  show: async (req, res) => {
    console.log('aaa')
    // indica o arquivo EJS dentro de view a ser chamado

    try {
      const categoryList = await Category.findAll({
        where: {
          deletedAt: null
        }
      })

      if (categoryList.length === 0) {
        return res.status(200).render('dashboard', {
          arquivoCss: 'dashboard.css',
          error: 'Não há nenhuma categoria cadastrada.'
        })
      }

      // indica o arquivo EJS dentro de view a ser chamado
      return res.status(200).render('dashboard', {
        arquivoCss: 'dashboard.css',
        categorias: categoryList
      })
    } catch (error) {
      return res.status(500).json({ message: 'Error' + error })
    }
  },
  edit: async (req, res, next) => {
    console.log('aqui')
    return res.status(200).send('Edit')
  },
  submitEdit: async (req, res) => {
    return res.status(200).send('Submit Edit')
  },
  delete: async (req, res) => {
    return res.status(200).send('Delete')
  }
}

module.exports = PainelCategoryController
