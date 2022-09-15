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
    return res.status(200).send('Submit Edit')
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
