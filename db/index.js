const config = require('config')

let db = require('./' + config.server.database.name)
db.init(config.server.database)

module.exports = db