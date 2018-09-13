'use strict'

let connection = undefined

module.exports.init = (conn) => {
  connection = conn
}

module.exports.findById = (id, done) => {
  connection.query('SELECT * FROM oauth_clients WHERE id = ?', [id])
    .then(function (results) {
      const data = results[0]

      done(null, {
        id: data.id,
        name: data.client_name,
        clientId: data.client_id,
        clientSecret: data.client_secret,
        isTrusted: data.is_trusted == 'true',
      })
    })
    .catch(function (error) {
      done(error)
    })
}

module.exports.findByClientId = (clientId, done) => {
  connection.query('SELECT * FROM oauth_clients WHERE client_id = ?', [clientId])
    .then(function (results) {
      const data = results[0]

      done(null, {
        id: data.id,
        name: data.client_name,
        clientId: data.client_id,
        clientSecret: data.client_secret,
        isTrusted: data.is_trusted == 'true',
      })
    })
    .catch(function (error) {
      done(error)
    })
}
