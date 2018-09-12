var db = require('./db')

module.exports.getAccessToken = function (bearerToken) {
  return db.getConnection().query('SELECT * FROM oauth_tokens WHERE access_token = ?', [bearerToken])
    .then(function (results) {
      var data = results[0]
      var token = {
        accessToken: data.access_token,
        accessTokenExpiresAt: new Date(data.access_token_expires_at),
        client: {id: data.client_id},
        user: {id: data.user_id}
      }
      return token
    })
    .catch(function (error) {
      return false
    })
}

module.exports.getClient = function (clientId, clientSecret) {
  return db.getConnection().query('SELECT * FROM oauth_clients WHERE client_id = ? AND client_secret = ?', [clientId, clientSecret])
    .then(function (results) {
      var data = results[0]
      return {
        id: data.client_id,
        grants: [data.grants]
      }
    })
    .catch(function (error) {
      return false
    })

}

module.exports.saveToken = function (token, client, user) {
  var newToken = {
    accessToken: token.accessToken,
    accessTokenExpiresAt: token.accessTokenExpiresAt,
    client: client,
    user: user
  }

  db.getConnection().query('INSERT INTO oauth_tokens (access_token, access_token_expires_at, client_id, user_id)' +
    'VALUES (?,?,?,?)', [token.accessToken, token.accessTokenExpiresAt, client.id, user.id])

  return newToken
}

module.exports.getUser = function (username, password) {
  return db.getConnection().query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password])
    .then(function (results) {
      var data = results[0]
      return data
    })
    .catch(function (error) {
      return false
    })
}