const { User } = require('../models')
// const { validationResult } = require('express-validator')

// let validaCpf = require('')
const PainelUsuariosController = {

  // showCategory = método do controller para renderizar a view com a lista de categoryiesos forms de cadastro,
  // chamado em index.js
  show: async (req, res) => {
    // indica o arquivo EJS dentro de view a ser chamado

    try {
      const userList = await User.findAll({
        where: {
          deletedAt: null
        }
      })

      // indica o arquivo EJS dentro de view a ser chamado
      return res.status(200).render('dashboard', {
        arquivoCss: 'dashboard.css',
        usuarios: userList
      })
    } catch (error) {
      return res.status(500).json({ message: 'Error' + error })
    }
  },
  async addCategory (req, res, next) {
    return res.status(200).send('Telo')
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
}

module.exports = PainelUsuariosController
