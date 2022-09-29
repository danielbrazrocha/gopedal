const PainelController = {

  async show (req, res, next) {
    try {
      return res.render('dashboard', {
        arquivoCss: 'dashboard.css',
        principal: true
      })
    } catch (error) {
      return res.status(500).render({ message: 'Error' + error })
    }
  }
}

module.exports = PainelController
