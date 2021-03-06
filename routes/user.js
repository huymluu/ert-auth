'use strict'

const passport = require('passport')
const db = require('../db')
const _ = require('lodash')
const bcrypt = require('bcrypt');

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

function validateDate (dateString) {
  if (!dateString || !dateString.includes('-')) {
    return false
  }
  let date = new Date(dateString)
  return date instanceof Date && isFinite(date)
}

module.exports.edit = [
  passport.authenticate('bearer', {session: false}),
  (request, response) => {

    // Validate
    if (!request.params.id) {
      response.status(404).send('Invalid user ID')
    } else if (!validateDate(request.body.dob)) {
      response.status(400).send('Invalid date of birth. Should be YYYY-MM-DD')
    } else {
      db.users.edit(request.params.id, {
        full_name: request.body.full_name,
        dob: request.body.dob
      })
        .then(() => {
          response.sendStatus(200)
        })
        .catch(function (error) {
          response.status(500).json(error)
        })
    }
  }
]

module.exports.add = [
  passport.authenticate('bearer', {session: false}),
  (request, response) => {

    // Validate
    if (!request.body.username) {
      response.status(400).send('Invalid username')
    } else if (!request.body.password) {
      response.status(400).send('Invalid password')
    } else if (!request.body.full_name) {
      response.status(400).send('Invalid full name')
    } else if (!validateDate(request.body.dob)) {
      response.status(400).send('Invalid date of birth. Should be YYYY-MM-DD')
    } else {
      db.users.add({
        username: request.body.username,
        password: bcrypt.hashSync(request.body.password, 8),
        full_name: request.body.full_name,
        dob: request.body.dob
      })
        .then(() => {
          response.sendStatus(201)
        })
        .catch(function (error) {
          response.status(500).send(error)
        })
    }
  }
]