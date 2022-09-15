const { Category } = require('../models')
// const { validationResult } = require('express-validator')

// let validaCpf = require('')
const PainelCategoryController = {

  // showCategory = método do controller para renderizar a view com a lista de categoryiesos forms de cadastro,
  // chamado em index.js
  show: async (req, res) => {
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
    const categoryId = req.params.id
    const category = await Category.findOne({
      where: {
        id: categoryId
      }
    })

    return res.status(200).render('dashboard', {
      arquivoCss: 'dashboard.css',
      categoryDetails: category
    })
  },
  submitEdit: async (req, res) => {
    return res.status(200).send('Submit Edit')
  },
  delete: async (req, res) => {
    const categoriaId = req.params.id
    await Category.destroy({
      where: {
        id: categoriaId
      }
    })
      .then(function (deletedRecord) {
        if (deletedRecord === 1) {
          return res.redirect('/painel/categoria')
        } else {
          return res.status(404).render('404', {
            textoErro: 'Categoria não encontrado, refaça sua busca ou tente novamente'
          })
        }
      })
      .catch(function (error) {
        res.status(500).json(error)
      })
  }
}

module.exports = PainelCategoryController
