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

module.exports.findAll = () => {
  return connection.query('SELECT * FROM users')
}

module.exports.edit = (id, data) => {
  return connection.query('UPDATE users SET full_name=?, dob=? WHERE id=?', [data.full_name, data.dob, id])
    .catch(function (error) {
      throw error.sqlMessage
    })
}

module.exports.add = (data) => {
  return connection.query('INSERT INTO users (username, password, full_name, dob) VALUES (?,?,?,?)', [data.username, data.password, data.full_name, data.dob])
    .catch(function (error) {
      throw error.sqlMessage
    })
}