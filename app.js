


var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var multer = require('multer')

var indexRouter = require('./src/routes/index');
var contatoRouter = require('./src/routes/contato');
var loginRouter = require('./src/routes/login');
var cadastroRouter = require('./src/routes/cadastro');
var produtoRouter = require('./src/routes/produto');
var sobreRouter = require('./src/routes/sobre');
var usuarioRouter = require('./src/routes/usuario');
var adicionarProdutoRouter = require('./src/routes/adicionarProduto');
var logMiddleware = require('./src/middlewares/logSite');
var cookieMiddleware = require('./src/middlewares/cookiesLogin');


var app = express();

// view engine setup  
app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

//habilitando sessões
app.use(session({
  secret:"projectExpress",
  resave:true,
  saveUninitialized:true
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieMiddleware);
app.use(logMiddleware);

//Importing routes
app.use('/', indexRouter);
app.use('/contato', contatoRouter);
app.use('/login', loginRouter);
app.use('/cadastro', cadastroRouter);
app.use('/produto', produtoRouter);
app.use('/sobre', sobreRouter);
app.use('/usuario', usuarioRouter);
app.use('/adicionarProduto', adicionarProdutoRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler brasil
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
