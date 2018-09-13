'use strict'

let connection = undefined

module.exports.init = (conn) => {
  connection = conn
}

module.exports.findByClientId = (clientId, done) => {
  connection.query('SELECT * FROM oauth_clients WHERE client_id = ?', [clientId])
    .then(function (results) {
      const data = results[0]

      done(null, {
        clientName: data.client_name,
        clientId: data.client_id,
        clientSecret: data.client_secret,
        redirectUri: data.redirect_uri
      })
    })
    .catch(function (error) {
      done(error)
    })
}
