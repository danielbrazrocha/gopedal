const { Product, Category } = require('../models')
const { validationResult } = require('express-validator')

const PainelProdutosController = {

  // showCategory = método do controller para renderizar a view com a lista de categoryiesos forms de cadastro,
  // chamado em index.js
  show: async (req, res) => {
    // indica o arquivo EJS dentro de view a ser chamado

    try {
      const productList = await Product.findAll({
        where: {
          deletedAt: null
        }
      })

      if (productList.length === 0) {
        return res.status(200).render('dashboard', {
          arquivoCss: 'dashboard.css',
          error: 'Não há nenhum produto cadastrado.'
        })
      }

      // indica o arquivo EJS dentro de view a ser chamado
      return res.status(200).render('dashboard', {
        arquivoCss: 'dashboard.css',
        produtos: productList
      })
    } catch (error) {
      return res.status(500).json({ message: 'Error' + error })
    }
  },
  add: async (req, res, next) => {
    const categoryList = await Category.findAll({
      where: {
        deletedAt: null
      }
    })
    return res.status(200).render('dashboard', {
      arquivoCss: 'dashboard.css',
      productDetails: {},
      categoryList,
      newItem: true
    })
  },
  edit: async (req, res, next) => {
    const produtoId = req.params.id
    const produto = await Product.findOne({
      where: {
        id: produtoId
      }
    })
    console.log('prod', produto)

    const categoryList = await Category.findAll({
      where: {
        deletedAt: null
      }
    })
    console.log('catlist', categoryList[0].name)
    // categoryList.find( cat => cat.id === productDetails.categoryId ).name

    return res.status(200).render('dashboard', {
      arquivoCss: 'dashboard.css',
      productDetails: produto,
      categoryList,
      newItem: false
    })
  },

  submitEdit: async (req, res, next) => {
    const errors = validationResult(req)

    // verificando se há erros de validação
    if (errors.isEmpty()) {
      // Desestruturando as informações para utilização no sequelize
      const { id, nome, category, description, imagelink, SKU, price, newItem } = req.body
      try {
        // atualizando o produto
        let ans
        if (newItem) {
          ans = await Product.create({
            name: nome,
            description,
            SKU,
            price,
            image: imagelink,
            categoryId: category,
            createAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          })
        } else {
          const newProductData = {
            name: nome,
            description,
            SKU,
            price,
            image: imagelink,
            updatedAt: new Date().toISOString(),
            categoryId: category
          }

          ans = await Product.update(newProductData, {
            where: {
              id
            }
          })
        }

        // verificando se o producto foi criado existe no BD
        if (!ans) {
          return res.status(422).render('dashboard', {
            arquivoCss: 'dashboard.css',
            error: `Erro na atualização do produto Id ${id}. Verifique as informações e tente novamente.`
          })
        }

        return res.status(201).render('dashboard', {
          arquivoCss: 'dashboard.css',
          success: `Produto Id ${id} atualizado com sucesso.`
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

  delete: async (req, res, next) => {
    const produtoId = req.params.id
    await Product.destroy({
      where: {
        id: produtoId
      }
    })
      .then(function (deletedRecord) {
        if (deletedRecord === 1) {
          return res.redirect('/painel/produto')
        } else {
          return res.status(404).render('404', {
            textoErro: 'Produto não encontrado, refaça sua busca ou tente novamente'
          })
        }
      })
      .catch(function (error) {
        res.status(500).json(error)
      })
  }
}

module.exports = PainelProdutosController
