
const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const session = require('express-session')
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger-output.json')

const indexRouter = require('./src/routes/index')
const contatoRouter = require('./src/routes/contato')
const loginRouter = require('./src/routes/login')
const cadastroRouter = require('./src/routes/cadastro')
const produtoRouter = require('./src/routes/produto')
const sobreRouter = require('./src/routes/sobre')
const usuarioRouter = require('./src/routes/usuario')
const painelRouter = require('./src/routes/painel')
const cartRouter = require('./src/routes/cart')
const paymentRouter = require('./src/routes/payment')
const logMiddleware = require('./src/middlewares/logSite')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'src', 'views'))
app.set('view engine', 'ejs')

// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24

// habilitando sessões
app.use(session({
  secret: 'projectExpress',
  cookie: { maxAge: oneDay },
  resave: true,
  saveUninitialized: true
}))

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(logMiddleware)

app.get('*', (req, res, next) => { res.locals = ({ req }); next() })
// Importing routes
app.use('/', indexRouter)
app.use('/contato', contatoRouter)
app.use('/login', loginRouter)
app.use('/cadastro', cadastroRouter)
app.use('/produto', produtoRouter)
app.use('/sobre', sobreRouter)
app.use('/usuario', usuarioRouter)
app.use('/painel', painelRouter)
app.use('/carrinho', cartRouter)
app.use('/pagamento', paymentRouter)

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

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
