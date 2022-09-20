const UsuarioController = {

  index: (req, res) => {
    return res.render('usuario', {
      arquivoCss: 'dashboard.css',
      principal: true
    })
  }
}

module.exports = UsuarioController
