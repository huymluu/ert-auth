'use strict'

var mysql = require('promise-mysql')
var connection = undefined

const users = require('./users')
const clients = require('./clients')
const accessTokens = require('./access_tokens')
const authorizationCodes = require('./authorization_codes')

module.exports = {
  users,
  clients,
  accessTokens,
  authorizationCodes,
  connect: function (host, port, database, user, password, callback) {
    mysql.createConnection({
      host: host,
      port: port,
      user: user,
      password: password,
      database: database
    }).then(function (conn) {
      connection = conn
      console.log('DB connected!')

      users.init(connection)
      clients.init(connection)
      accessTokens.init(connection)

      callback && callback()
    })
  },
}
