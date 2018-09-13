'use strict'

const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const errorHandler = require('errorhandler')
const session = require('express-session')
const passport = require('passport')
const routes = require('./routes')

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

// Passport configuration
require('./auth')

require('./db/mysql').connect('localhost', 8000, 'ert', 'ert', 'ert')

app.get('/', routes.site.index)
app.get('/login', routes.site.loginForm)
app.post('/login', routes.site.login)
app.get('/logout', routes.site.logout)
app.get('/account', routes.site.account)

app.get('/dialog/authorize', routes.oauth2.authorization)
app.post('/dialog/authorize/decision', routes.oauth2.decision)
app.post('/oauth/token', routes.oauth2.token)

app.get('/api/userinfo', routes.user.info)
app.get('/api/clientinfo', routes.client.info)

var request = require('request')
app.get('/callback', function (req, res) {

  var postBody = 'grant_type=authorization_code&code=' +req.query.code +
    '&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&client_id=abc123&client_secret=ssh-secret'
  console.log(postBody)
  request.post({
    headers: {'content-type': 'application/x-www-form-urlencoded'},
    url: 'http://localhost:3000/oauth/token',
    body: postBody
  }, function (error, response, body) {
    console.log('error:', error) // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode) // Print the response status code if a response was received
    console.log('body:', body) // Print the HTML for the Google homepage.

  })

  res.send('OK')
})

app.listen(process.env.PORT || 3000)
