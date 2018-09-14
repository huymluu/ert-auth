'use strict'

const passport = require('passport')
const login = require('connect-ensure-login')
const db = require('../db')

module.exports.index = (request, response) => {
  if (request.user) {
    db.accessTokens.findByUserId(request.user.id)
      .then(function (results) {
        response.render('index', {user: request.user, tokens: results})
      })
      .catch(function (error) {
        response.render('index', {user: request.user, tokens: []})
      })
  } else {
    response.render('index', {user: undefined})
  }
}

module.exports.loginForm = (request, response) => response.render('login')

module.exports.loginError = (request, response) => response.render('loginError')

module.exports.login = passport.authenticate('local', {successReturnToOrRedirect: '/', failureRedirect: '/loginError'})

module.exports.logout = (request, response) => {
  request.logout()
  response.redirect('/')
}
