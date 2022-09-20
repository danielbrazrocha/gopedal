const { User } = require('../models')
const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')

const UsuarioDadosController = {

  show: async (req, res) => {
    const { id } = req.session.user
    try {
      const userDetails = await User.findOne({
        where: {
          id
        },
        include: ['addresses']
      })

      if (userDetails.length === 0) {
        return res.status(200).render('usuario', {
          arquivoCss: 'dashboard.css',
          error: 'Não há nenhuma informação cadastrada.'
        })
      }

      return res.status(200).render('usuario', {
        arquivoCss: 'dashboard.css',
        dados: userDetails
      })
    } catch (error) {
      return res.status(500).json({ message: 'Error' + error })
    }
  },
  submitEdit: async (req, res) => {
    const errors = validationResult(req)

    if (errors.isEmpty()) {
      const { id, nome, cpf, tel, email, senha, repeteSenha } = req.body
      let passCrypt
      if (senha && senha === repeteSenha) {
        passCrypt = bcrypt.hashSync(senha, 10)
      }
      try {
        const newItemData = {
          name: nome,
          cpf,
          tel,
          email,
          senha: passCrypt,
          updatedAt: new Date().toISOString()
        }

        const ans = await User.update(newItemData, {
          where: {
            id
          }
        })

        if (!ans) {
          return res.status(422).render('usuario', {
            arquivoCss: 'dashboard.css',
            error: `Erro na atualização do usuário ${id}. Verifique as informações e tente novamente.`
          })
        }
        return res.status(201).render('usuario', {
          arquivoCss: 'dashboard.css',
          success: `Usuário Id ${id} atualizado com sucesso.`
        })
      } catch (err) {
        return res.status(500).render('usuario', {
          arquivoCss: 'dashboard.css',
          error: 'Erro interno no sistema. Entre em contato com o administrador.'
        })
      }
    } else {
      return res.status(422).render('usuario', {
        arquivoCss: 'dashboard.css',
        errors: errors.errors
      })
    }
  },
  delete: async (req, res) => {
    const id = req.params.id
    await User.destroy({
      where: {
        id
      }
    })
      .then(function (deletedRecord) {
        if (deletedRecord === 1) {
          return res.redirect('/login/logout')
        } else {
          return res.status(422).render('usuario', {
            arquivoCss: 'dashboard.css',
            error: `Erro na exclusão do usuário ${id}. Procure o suporte.`
          })
        }
      })
      .catch(function (error) {
        res.status(500).json(error)
      })
  }
}

module.exports = UsuarioDadosController
