const { Category } = require('../models')
const { validationResult } = require('express-validator')

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
    const errors = validationResult(req)

    // verificando se há erros de validação
    if (errors.isEmpty()) {
      // Desestruturando as informações para utilização no sequelize
      const { id, nome, description } = req.body
      try {
        // atualizando o produto
        const newItemData = {
          name: nome,
          description,
          updatedAt: new Date().toISOString()
        }

        const ans = await Category.update(newItemData, {
          where: {
            id
          }
        })

        // verificando se o producto foi criado existe no BD
        if (!ans) {
          return res.status(422).render('dashboard', {
            arquivoCss: 'dashboard.css',
            error: `Erro na atualização da categoria Id ${id}. Verifique as informações e tente novamente.`
          })
        }

        return res.status(201).render('dashboard', {
          arquivoCss: 'dashboard.css',
          success: `Categoria Id ${id} atualizado com sucesso.`
        })
      } catch (err) {
        console.log(err)
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
