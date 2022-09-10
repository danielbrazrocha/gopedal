const UsuarioController = {

  index: (req, res) => {
    // verificando se existe uma sessão de usuário ativa, passando globalmente a variavel user para a view
    // deverá ser feito esta operação a cada route que utilize o middleware de autenticação isAuth
    const { user } = req.session

    // verifica se o usuário já existe, redirecionando para a home caso não esteja logado
    if (!user) {
      return res.redirect('/')
    }
    res.render('usuario')
  }

}

module.exports = UsuarioController
