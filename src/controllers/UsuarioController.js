const UsuarioController = {

  index: (req, res) => {
    try {
      return res.render('usuario', {
        arquivoCss: 'dashboard.css',
        principal: true
      })
    } catch (error) {
      return res.status(500).render({ message: 'Error' + error })
    }
  }
}

module.exports = UsuarioController
