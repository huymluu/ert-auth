'use strict'

const passport = require('passport')
const db = require('../db')
const _ = require('lodash')

module.exports.info = [
  passport.authenticate('bearer', {session: false}),
  (request, response) => {
    // request.authInfo is set using the `info` argument supplied by
    // `BearerStrategy`. It is typically used to indicate scope of the token,
    // and used in access control checks. For illustrative purposes, this
    // example simply returns the scope in the response.
    response.json({user_id: request.user.id, name: request.user.name, scope: request.authInfo.scope})
  }
]

module.exports.me = [
  passport.authenticate('bearer', {session: false}),
  (request, response) => {
    response.json({
      id: request.user.id,
      username: request.user.username,
      full_name: request.user.full_name,
      dob: request.user.dob,
    })
  }
]

module.exports.checkToken = [
  passport.authenticate('bearer', {session: false}),
  (request, response) => {
    response.sendStatus(200)
  }
]

module.exports.fetchAll = [
  passport.authenticate('bearer', {session: false}),
  (request, response) => {

    db.users.findAll()
      .then((results) => {
        response.json(_.map(results, function (user) {
          return {
            id: user.id,
            username: user.username,
            full_name: user.full_name,
            dob: user.dob,
          }
        }))
      })
      .catch(function (error) {
        response.status(500).json(error)
      })
  }
]