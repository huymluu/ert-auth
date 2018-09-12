var mysql = require('promise-mysql')

var connection = undefined

module.exports = {
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
      callback && callback()
    })
  },
  getConnection: function () {
    return connection
  }
}