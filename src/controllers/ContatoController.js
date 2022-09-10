const ContatoController = {
  // index = método do controller para renderizar uma view, chamado em index.js
  index: (req, res) => {
    // verificando se existe uma sessão de usuário ativa, passando globalmente a variavel user para a view
    // deverá ser feito esta operação a cada route que utilize o middleware de autenticação isAuth
    // const { user } = req.session

    // indica o arquivo EJS dentro de view a ser chamado
    return res.render('contato', {
      arquivoCss: 'contato.css'
    })
  }
}

module.exports = ContatoController
