module.exports = (req, res, next) => {
  const { user } = req.session

  if (user) {
    // caso o usuario esteja logado, salvar a informação para reutilização global
    res.locals.user = user

    return next()
  }

  // caso o usuário não esteja logado, redirecionar a pagina de login
  res.redirect('/login')
}
