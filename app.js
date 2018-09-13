'use strict'

const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const errorHandler = require('errorhandler')
const session = require('express-session')
const passport = require('passport')
const routes = require('./routes')
const config = require('config')

// Express configuration
const app = express()
app.set('view engine', 'ejs')
app.use(cookieParser())
app.use(bodyParser.json({extended: false}))
app.use(bodyParser.urlencoded({extended: false}))
app.use(errorHandler())
app.use(session({secret: 'keyboard cat', resave: false, saveUninitialized: false}))
app.use(passport.initialize())
app.use(passport.session())

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  next()
})

app.options('*', function (req, res, next) {
  res.sendStatus(200)
})

// Passport configuration
require('./auth')

require('./db')

app.get('/', routes.site.index)
app.get('/login', routes.site.loginForm)
app.get('/loginError', routes.site.loginError)
app.post('/login', routes.site.login)
app.get('/logout', routes.site.logout)
app.get('/account', routes.site.account)

app.get('/dialog/authorize', routes.oauth2.authorization)
app.post('/dialog/authorize/decision', routes.oauth2.decision)
app.post('/oauth/token', routes.oauth2.token)
app.get('/revokeAll', routes.oauth2.revokeAll)

// API
app.get('/api/check_token', routes.user.checkToken)
app.get('/api/me', routes.user.me)
app.get('/api/users', routes.user.fetchAll)
app.patch('/api/user/:id', routes.user.edit)
app.post('/api/user', routes.user.add)

// Internal API
app.get('/api/clientinfo', routes.client.info)

app.listen(config.server.port, config.server.host)
