module.exports = (req, res, next) => {
  const { user } = req.session

  if (user) {
    // console.log(user);
    // caso o usuario esteja logado, salvar a informação para reutilização global
    res.locals.user = user
  }

  // caso o usuário não esteja logado, continuar a execução da rota
  next()
}
