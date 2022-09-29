const { Product } = require('../models')
// let mockData = require('../mockdata/products.json');

const ProdutoController = {
  // index = método do controller para renderizar uma view, chamado em index.js
  async detalhesProduto (req, res, next) {
    try {
      // chama detalhes do produto passado na URL
      const produtoId = req.params.id
      const produto = await Product.findOne({
        where: {
          id: produtoId
        },
        include: ['inventory']
      })

      // renderiza view se o produto existir
      // console.log(typeof produto.inventory.quantity)

      if (produto) {
        return res.status(200).render('produto', {
          arquivoCss: 'produto.css',
          produto
        })
      } else {
        return res.status(404).render('404', {
          textoErro: 'Produto não encontrado, refaça sua busca ou tente novamente'
        })
      }
    } catch (error) {
      return res.status(500).render({ message: 'Error' + error })
    }
  }

}

module.exports = ProdutoController
