const { Discount } = require('../models')
// const { validationResult } = require('express-validator')

// let validaCpf = require('')
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
      return res.status(500).json({ message: 'Error' + error })
    }
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
      discountDetails: discount
    })
  },
  submitEdit: async (req, res) => {
    return res.status(200).send('Submit Edit')
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
        res.status(500).json(error)
      })
  }
}

module.exports = PainelDescontoController
