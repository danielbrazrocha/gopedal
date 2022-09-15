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

  edit: async (req, res, next) => {
    const produtoId = req.params.id
    const produto = await Product.findOne({
      where: {
        id: produtoId
      }
    })

    const categoryList = await Category.findAll({
      where: {
        deletedAt: null
      }
    })

    return res.status(200).render('dashboard', {
      arquivoCss: 'dashboard.css',
      productDetails: produto,
      categoryList
    })
  },

  submitEdit: async (req, res, next) => {
    const errors = validationResult(req)

    // verificando se há erros de validação
    if (errors.isEmpty()) {
      // Desestruturando as informações para utilização no sequelize
      const { id, nome, category, description, imagelink, SKU, price } = req.body
      console.log(req.body)
      try {
        // atualizando o produto
        const newProductData = {
          name: nome,
          description,
          SKU,
          price,
          image: imagelink,
          updatedAt: new Date().toISOString(),
          category_id: category
        }

        const product = await Product.update(newProductData, {
          where: {
            id
          }
        })

        // verificando se o producto foi criado existe no BD
        if (!product) {
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
        console.log(err)
        return res.status(500).render('dashboard', {
          arquivoCss: 'dashboard.css',
          error: 'Sistema indisponivel no momento. Tente novamente em alguns instantes.'
        })
      }
      // caso existam erros na validação, renderizar a view com os erros
    } else {
      // caso existam erros na validação, renderizar a view com os erros
      return res.status(422).render('dashboard', {
        arquivoCss: 'dashboard.css',
        errors: errors.errors,
        old: req.body
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

// register = método do controller para enviar os dados do formulário de cadastro
//   async registerProduct (req, res, next) => {
//     // criando a variável para armazenar os erros de validação
//     // console.log('chamando register no controller aqui');
//     const errors = validationResult(req)

//     // verificando se há erros de validação
//     if (errors.isEmpty()) {
//       // Desestruturando as informações para utilização no sequelize
//       const { nome, category, description, SKU, price } = req.body

//       try {
//         // criando um novo produto
//         const product = await Product.create({
//           name: nome,
//           description,
//           SKU,
//           price,
//           image: '/assets/products/002 - Suporte Monitor.jpg',
//           createAt: new Date().toISOString(),
//           updatedAt: new Date().toISOString(),
//           category_id: category
//         })

//         console.log(product)

//         // verificando se o producto foi criado existe no BD
//         if (!product) {
//           return res.status(422).render('adicionarProduto', {
//             arquivoCss: 'cadastro.css',
//             error: 'Erro na criação do produto. Verifique as informações e tente novamente.'
//           })
//         }

//         return res.status(201).render('adicionarProduto', {
//           arquivoCss: 'cadastro.css',
//           sucess: 'Produto cadastrado com sucesso.'
//         })
//       } catch (err) {
//         console.log(err)
//         return res.status(500).render('adicionarProduto', {
//           arquivoCss: 'cadastro.css',
//           error: 'Sistema indisponivel no momento. Tente novamente em alguns instantes.'
//         })
//       }
//     // caso existam erros na validação, renderizar a view com os erros
//     } else {
//       // caso existam erros na validação, renderizar a view com os erros
//       return res.status(422).render('adicionarProduto', {
//         arquivoCss: 'cadastro.css',
//         errors: errors.errors,
//         old: req.body
//       })
//     }
//   }

module.exports = PainelProdutosController
