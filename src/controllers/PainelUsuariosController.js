const { User } = require('../models')
const { validationResult } = require('express-validator')

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
  edit: async (req, res) => {
    const userId = req.params.id
    const user = await User.findOne({
      where: {
        id: userId
      }
    })

    return res.status(200).render('dashboard', {
      arquivoCss: 'dashboard.css',
      userDetails: user
    })
  },
  submitEdit: async (req, res) => {
    const errors = validationResult(req)

    // verificando se há erros de validação
    if (errors.isEmpty()) {
      // Desestruturando as informações para utilização no sequelize
      const { id, nome, cpf, tel, email, birthdate } = req.body
      try {
        // atualizando o produto
        const newProductData = {
          name: nome,
          cpf,
          tel,
          email,
          birthdate,
          updatedAt: new Date().toISOString()
        }

        const ans = await User.update(newProductData, {
          where: {
            id
          }
        })

        // verificando se o producto foi criado existe no BD
        if (!ans) {
          return res.status(422).render('dashboard', {
            arquivoCss: 'dashboard.css',
            error: `Erro na atualização do usuário ${nome}. Verifique as informações e tente novamente.`
          })
        }

        return res.status(201).render('dashboard', {
          arquivoCss: 'dashboard.css',
          success: `Usuário ${nome} atualizado com sucesso.`
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
    const usuarioId = req.params.id
    await User.destroy({
      where: {
        id: usuarioId
      }
    })
      .then(function (deletedRecord) {
        if (deletedRecord === 1) {
          return res.redirect('/painel/usuario')
        } else {
          return res.status(404).render('404', {
            textoErro: 'Usuario não encontrado, refaça sua busca ou tente novamente'
          })
        }
      })
      .catch(function (error) {
        res.status(500).json(error)
      })
  }
}

module.exports = PainelUsuariosController
