/* eslint-disable camelcase */
const { User, User_Payment } = require('../models')
const { validationResult } = require('express-validator')

const UsuarioPagamentosController = {

  show: async (req, res) => {
    const { id } = req.session.user
    try {
      const userDetails = await User.findOne({
        where: {
          id
        },
        include: ['payments']
      })

      if (userDetails?.payments?.length === 0) {
        return res.status(200).render('usuario', {
          arquivoCss: 'dashboard.css',
          error: 'Não há nenhum pagamento cadastrado.'
        })
      }

      return res.status(200).render('usuario', {
        arquivoCss: 'dashboard.css',
        pagamentos: userDetails?.payments
      })
    } catch (error) {
      return res.status(500).render({ message: 'Error' + error })
    }
  },
  edit: async (req, res, next) => {
    const id = req.params.id
    const item = await User_Payment.findOne({
      where: {
        id
      }
    })

    return res.status(200).render('usuario', {
      arquivoCss: 'dashboard.css',
      pagamentoDetails: item,
      newItem: false
    })
  },
  submitEdit: async (req, res) => {
    const errors = validationResult(req)
    const UserId = req.session.user.id

    if (errors.isEmpty()) {
      const { id, payment_type, provider, account_number, expiry, newItem } = req.body

      try {
        if (newItem) {
          await User_Payment.create({
            UserId,
            payment_type,
            provider,
            account_number,
            expiry,
            createAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          })
        } else {
          const newItemData = {
            payment_type,
            provider,
            account_number,
            expiry,
            updatedAt: new Date().toISOString()
          }
          await User_Payment.update(newItemData, {
            where: {
              id
            }
          })
        }

        return res.status(201).render('usuario', {
          arquivoCss: 'dashboard.css',
          success: `Pagamento Id ${id} atualizado com sucesso.`
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
    await User_Payment.destroy({
      where: {
        id
      }
    })
      .then(function (deletedRecord) {
        if (deletedRecord === 1) {
          return res.redirect('/usuario/pagamentos')
        } else {
          return res.status(422).render('usuario', {
            arquivoCss: 'dashboard.css',
            error: `Erro na exclusão do pagamenot ${id}. Procure o suporte.`
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
        pagamentoDetails: {},
        newItem: true
      })
    } catch (error) {
      return res.status(500).render({ message: 'Error' + error })
    }
  }
}

module.exports = UsuarioPagamentosController
