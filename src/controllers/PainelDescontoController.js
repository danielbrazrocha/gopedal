const { Discount } = require('../models')
const { validationResult } = require('express-validator')

const PainelDescontoController = {

  // showCategory = método do controller para renderizar a view com a lista de categoryiesos forms de cadastro,
  // chamado em index.js
  show: async (req, res) => {
    // indica o arquivo EJS dentro de view a ser chamado

    try {
      const discountList = await Discount.findAll({
        where: {
          deletedAt: null
        }
      })

      if (discountList.length === 0) {
        return res.status(200).render('dashboard', {
          arquivoCss: 'dashboard.css',
          error: 'Não há nenhum desconto cadastrado.'
        })
      }

      // indica o arquivo EJS dentro de view a ser chamado
      return res.status(200).render('dashboard', {
        arquivoCss: 'dashboard.css',
        descontos: discountList
      })
    } catch (error) {
      return res.status(500).render({ message: 'Error' + error })
    }
  },
  add: async (req, res, next) => {
    return res.status(200).render('dashboard', {
      arquivoCss: 'dashboard.css',
      discountDetails: {},
      newItem: true
    })
  },
  edit: async (req, res) => {
    const discountId = req.params.id
    const discount = await Discount.findOne({
      where: {
        id: discountId
      }
    })

    return res.status(200).render('dashboard', {
      arquivoCss: 'dashboard.css',
      discountDetails: discount,
      newItem: false
    })
  },
  submitEdit: async (req, res) => {
    const errors = validationResult(req)

    // verificando se há erros de validação
    if (errors.isEmpty()) {
      // Desestruturando as informações para utilização no sequelize
      const { id, nome, description, discountpercent, active, newItem } = req.body
      try {
        if (newItem) {
          await Discount.create({
            name: nome,
            description,
            discount_percent: discountpercent,
            active,
            createAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          })
        } else {
          const newItemData = {
            name: nome,
            description,
            discount_percent: discountpercent,
            active,
            updatedAt: new Date().toISOString()
          }

          await Discount.update(newItemData, {
            where: {
              id
            }
          })
        }
        return res.status(201).render('dashboard', {
          arquivoCss: 'dashboard.css',
          success: `Desconto Id ${id} atualizado com sucesso.`
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
    const descontoId = req.params.id
    await Discount.destroy({
      where: {
        id: descontoId
      }
    })
      .then(function (deletedRecord) {
        if (deletedRecord === 1) {
          return res.redirect('/painel/desconto')
        } else {
          return res.status(404).render('404', {
            textoErro: 'Desconto não encontrado, refaça sua busca ou tente novamente'
          })
        }
      })
      .catch(function (error) {
        return res.status(500).render({ message: 'Error' + error })
      })
  }
}

module.exports = PainelDescontoController
