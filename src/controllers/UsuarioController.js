const UsuarioController = {

  index: (req, res) => {
    const { user } = req.session
    if (!user) {
      return res.redirect('/')
    }
    return res.render('usuario', {
      arquivoCss: 'dashboard.css',
      principal: true
    })
  }
}

module.exports = UsuarioController
