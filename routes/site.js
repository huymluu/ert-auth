'use strict';

const passport = require('passport');
const login = require('connect-ensure-login');

module.exports.index = (request, response) => response.render('index');

module.exports.loginForm = (request, response) => response.render('login');

module.exports.loginError = (request, response) => response.render('loginError');

module.exports.login = passport.authenticate('local', { successReturnToOrRedirect: '/', failureRedirect: '/loginError' });

module.exports.logout = (request, response) => {
  request.logout();
  response.redirect('/');
};

module.exports.account = [
  login.ensureLoggedIn(),
  (request, response) => response.render('account', { user: request.user }),
];
