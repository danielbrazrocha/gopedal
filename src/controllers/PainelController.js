const PainelController = {

  async show (req, res, next) {
    return res.render('dashboard', {
      arquivoCss: 'dashboard.css',
      principal: true
    })
  }

}

module.exports = PainelController
