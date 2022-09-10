const { Product } = require('../models');
const Sequelize = require('sequelize')
const Op = Sequelize.Op;


const IndexController =  {
    // index = método do controller para renderizar uma view com um grid de todos os produtos
    // chamado em index.js
    async index(req, res, next) {
        //verificando se existe uma sessão de usuário ativa, passando globalmente a variavel user para a view
        //deverá ser feito esta operação a cada route que utilize o middleware de autenticação isAuth
        const {user} = req.session;

        try {
            const productList = await Product.findAll({
                where: {
                    deletedAt: null
                }
            });



            // indica o arquivo EJS dentro de view a ser chamado
            return res.render('index', {
                title: 'gopedal.com',
                produtos: productList
            });
        } catch (error) {
            return res.status(400).json({ message: 'Error' + error});
        }
    },

    // searchResults = método do controller para renderizar uma view com um grid de todos os produtos
    // encontrados na busca da NavBar
    async searchResults(req, res, next) {
        //verificando se existe uma sessão de usuário ativa, passando globalmente a variavel user para a view
        //deverá ser feito esta operação a cada route que utilize o middleware de autenticação isAuth
        const {user} = req.session;


        //salvando o valor da query
        const { queryTxt } = req.body;

        try {
            const productList = await Product.findAll({
                where: {                    
                    deletedAt: null,
                    name: { [Op.substring]: queryTxt }
                }
            });

            // caso a busca não retorne nenhum produto, renderizar a view Index com uma mensagem de alerta
            if (productList.length === 0) {
                return res.render('index', {
                    arquivoCss: 'index.css',
                    produtos: productList,
                    alert: "Nenhum produto encontrado!"
                });
              }

            // indica o arquivo EJS dentro de view a ser chamado
            return res.render('index', {
                title: 'gopedal.com',
                produtos: productList,
            });
        } catch (error) {
            return res.status(400).json({ message: 'Error' + error});
        }
    }
    
};

module.exports = IndexController;