
const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const session = require('express-session')

const indexRouter = require('./src/routes/index')
const contatoRouter = require('./src/routes/contato')
const loginRouter = require('./src/routes/login')
const cadastroRouter = require('./src/routes/cadastro')
const produtoRouter = require('./src/routes/produto')
const sobreRouter = require('./src/routes/sobre')
const usuarioRouter = require('./src/routes/usuario')
const adicionarProdutoRouter = require('./src/routes/adicionarProduto')
const painelRouter = require('./src/routes/painel')
const logMiddleware = require('./src/middlewares/logSite')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'src', 'views'))
app.set('view engine', 'ejs')

// habilitando sessões
app.use(session({
  secret: 'projectExpress',
  resave: true,
  saveUninitialized: true
}))

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(logMiddleware)

// Importing routes
app.use('/', indexRouter)
app.use('/contato', contatoRouter)
app.use('/login', loginRouter)
app.use('/cadastro', cadastroRouter)
app.use('/produto', produtoRouter)
app.use('/sobre', sobreRouter)
app.use('/usuario', usuarioRouter)
app.use('/adicionarProduto', adicionarProdutoRouter)
app.use('/painel', painelRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler brasil
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
