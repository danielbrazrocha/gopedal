const { Product } = require('../models')
const { validationResult } = require('express-validator')

// let validaCpf = require('')
const CadastroController = {

  // showRegister = método do controller para renderizar a view com os forms de cadastro,
  // chamado em index.js
  showAddProduct: (req, res) => {
    // verificando se existe uma sessão de usuário ativa, passando globalmente a variavel user para a view
    // deverá ser feito esta operação a cada route que utilize o middleware de autenticação isAuth
    // const { user } = req.session

    // verifica se o usuário já existe, redirecionando para a home caso já esteja logado
    // if (user){
    //     return res.redirect('/');
    // }

    // indica o arquivo EJS dentro de view a ser chamado
    return res.render('adicionarProduto', {
      arquivoCss: 'cadastro.css'
    })
  },

  // register = método do controller para enviar os dados do formulário de cadastro
  async registerProduct (req, res, next) {
    // criando a variável para armazenar os erros de validação
    // console.log('chamando register no controller aqui');
    const errors = validationResult(req)

    // verificando se há erros de validação
    if (errors.isEmpty()) {
      // Desestruturando as informações para utilização no sequelize
      const { nome, category, description, SKU, price } = req.body

      try {
        // criando um novo produto
        const product = await Product.create({
          name: nome,
          description,
          SKU,
          price,
          image: '/assets/products/002 - Suporte Monitor.jpg',
          createAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          category_id: category
        })

        console.log(product)

        // verificando se o producto foi criado existe no BD
        if (!product) {
          return res.status(422).render('adicionarProduto', {
            arquivoCss: 'cadastro.css',
            error: 'Erro na criação do produto. Verifique as informações e tente novamente.'
          })
        }

        return res.status(201).render('adicionarProduto', {
          arquivoCss: 'cadastro.css',
          sucess: 'Produto cadastrado com sucesso.'
        })
      } catch (err) {
        console.log(err)
        return res.status(500).render('adicionarProduto', {
          arquivoCss: 'cadastro.css',
          error: 'Sistema indisponivel no momento. Tente novamente em alguns instantes.'
        })
      }
    // caso existam erros na validação, renderizar a view com os erros
    } else {
      // caso existam erros na validação, renderizar a view com os erros
      return res.status(422).render('adicionarProduto', {
        arquivoCss: 'cadastro.css',
        errors: errors.errors,
        old: req.body
      })
    }
  }
}

module.exports = CadastroController
