var bodyParser = require('body-parser')
var express = require('express')
var OAuthServer = require('express-oauth-server')

var app = express()

app.oauth = new OAuthServer({
  model: require('./oauth-mysql-model.js'),
  grants: ['password'],
  debug: true
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use('/token', app.oauth.token())
app.use('/user', app.oauth.authenticate())

app.use(function (req, res) {
  res.send('Secret area')
})

app.listen(8081)

// DB
var db = require('./db')

db.connect('localhost', 8000, 'ert', 'ert', 'ert', function () {

})
