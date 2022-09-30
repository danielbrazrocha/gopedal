/* eslint-disable camelcase */
const { User, User_Address } = require('../models')
const { validationResult } = require('express-validator')

const UsuarioEnderecosController = {

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
        enderecos: userDetails.addresses
      })
    } catch (error) {
      return res.status(500).render({ message: 'Error' + error })
    }
  },
  edit: async (req, res, next) => {
    const id = req.params.id
    const item = await User_Address.findOne({
      where: {
        id
      }
    })

    return res.status(200).render('usuario', {
      arquivoCss: 'dashboard.css',
      enderecoDetails: item,
      newItem: false
    })
  },
  submitEdit: async (req, res) => {
    const errors = validationResult(req)
    const UserId = req.session.user.id

    if (errors.isEmpty()) {
      const { id, description, street, number, details, CEP, country, newItem } = req.body

      try {
        if (newItem) {
          await User_Address.create({
            UserId,
            description,
            street,
            number,
            details,
            CEP,
            country,
            createAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          })
        } else {
          const newItemData = {
            description,
            street,
            number,
            details,
            CEP,
            country,
            updatedAt: new Date().toISOString()
          }
          await User_Address.update(newItemData, {
            where: {
              id
            }
          })
        }

        return res.status(201).render('usuario', {
          arquivoCss: 'dashboard.css',
          success: `Endereço Id ${id} atualizado com sucesso.`
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
    await User_Address.destroy({
      where: {
        id
      }
    })
      .then(function (deletedRecord) {
        if (deletedRecord === 1) {
          return res.redirect('/usuario/enderecos')
        } else {
          return res.status(422).render('usuario', {
            arquivoCss: 'dashboard.css',
            error: `Erro na exclusão do endereço ${id}. Procure o suporte.`
          })
        }
      })
      .catch(function (error) {
        return res.status(500).render({ message: 'Error' + error })
      })
  },
  add: async (req, res, next) => {
    try {
      return res.status(200).render('usuario', {
        arquivoCss: 'dashboard.css',
        enderecoDetails: {},
        newItem: true
      })
    } catch (error) {
      return res.status(500).render({ message: 'Error' + error })
    }
  }
}

module.exports = UsuarioEnderecosController
