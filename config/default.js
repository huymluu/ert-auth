module.exports = {
  server: {
    env: process.env.NODE_ENV || 'production',
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || 3000,
    database: {
      name: 'mysql',
      host: 'localhost',
      port: 8000,
      database: 'ert',
      user: 'ert',
      password: 'ert'
    }
  }
}