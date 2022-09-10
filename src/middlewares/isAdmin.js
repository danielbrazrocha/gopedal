module.exports = (req, res, next) => {
  const { user } = req.session;

  //verificando se o kind do usuario é do tipo admin, caso contrário, redirecionar para a home
  if (!user || user.kind != "admin") {
    // console.log('redirecionando para a home');
    res.redirect("/");
  }

  //res.locals.user = user;
  next();
};