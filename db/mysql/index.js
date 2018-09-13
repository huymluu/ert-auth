'use strict'

const mysql = require('promise-mysql')
let connection = undefined

const users = require('./users')
const clients = require('./clients')
const accessTokens = require('./access_tokens')
const authorizationCodes = require('./authorization_codes')

module.exports = {
  users,
  clients,
  accessTokens,
  authorizationCodes,
  init: function (config) {
    mysql.createConnection({
      host: config.host,
      port: config.port,
      user: config.user,
      password: config.password,
      database: config.database
    }).then(function (conn) {
      connection = conn
      console.log('MySQL DB initialized')

      users.init(connection)
      clients.init(connection)
      accessTokens.init(connection)
    })
  },
}
