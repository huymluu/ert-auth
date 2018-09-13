'use strict'

let connection = undefined

module.exports.init = (conn) => {
  connection = conn
}

module.exports.find = (key, done) => {
  connection.query('SELECT * FROM oauth_tokens WHERE access_token = ?', [key])
    .then(function (results) {
      const data = results[0]
      if (!data) throw 'Not found token: ' + key
      else {
        done(null, {
          userId: data.user_id,
          clientId: data.client_id
        })
      }
    })
    .catch(function (error) {
      done(error)
    })
}

module.exports.findByUserIdAndClientId = (userId, clientId) => {
  return connection.query('SELECT * FROM oauth_tokens WHERE user_id = ? AND client_id = ?', [userId, clientId])
    .then(function (results) {
      const data = results[0]
      if (!data) throw 'Not found token for userId=' + userId + ', clientId=' + clientId
      else {
        return data
      }
    })
}

module.exports.findByUserId = (userId) => {
  return connection.query('SELECT * FROM oauth_tokens WHERE user_id = ?', [userId])
}

module.exports.save = (token, userId, clientId, done) => {
  connection.query('INSERT INTO oauth_tokens (access_token, access_token_expires_at, client_id, user_id)' +
    'VALUES (?,?,?,?)', [token, '', clientId, userId])
    .then(function (results) {
      done()
    })
    .catch(function (error) {
      done(error)
    })
}

module.exports.deleteAllByUserId = (userId) => {
  return connection.query('DELETE FROM oauth_tokens WHERE user_id = ?', [userId])
}