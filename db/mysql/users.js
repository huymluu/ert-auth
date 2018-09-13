'use strict'

var connection = undefined

module.exports.init = (conn) => {
  connection = conn
}

module.exports.findById = (id, done) => {
  connection.query('SELECT * FROM users WHERE id = ?', [id])
    .then(function (results) {
      done(null, results[0])
    })
    .catch(function (error) {
      done(error)
    })
}

module.exports.findByUsername = (username, done) => {
  connection.query('SELECT * FROM users WHERE username = ?', [username])
    .then(function (results) {
      done(null, results[0])
    })
    .catch(function (error) {
      done(error)
    })
}
