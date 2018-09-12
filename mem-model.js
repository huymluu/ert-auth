/*
 * Constructor.
 */

InMemoryCache = {}
InMemoryCache.clients = [{clientId: 'application', clientSecret: 'secret', grants: ['password'], redirectUris: ['']}]
InMemoryCache.tokens = []
InMemoryCache.users = [{id: '1', username: 'pedroetb', password: 'password'}]

/**
 * Dump the cache.
 */

InMemoryCache.dump = function () {
  console.log('clients', InMemoryCache.clients)
  console.log('tokens', InMemoryCache.tokens)
  console.log('users', InMemoryCache.users)
}


InMemoryCache.generateAccessToken = function(client, user, scope){
  return '12312314asdfsdsxdgdfg'
}

/*
 * Get access token.
 */

InMemoryCache.getAccessToken = function (bearerToken) {
  var tokens = InMemoryCache.tokens.filter(function (token) {
    return token.accessToken === bearerToken
  })

  return tokens.length ? tokens[0] : false
}

/**
 * Get refresh token.
 */

InMemoryCache.getRefreshToken = function (bearerToken) {
  var tokens = InMemoryCache.tokens.filter(function (token) {
    return token.refreshToken === bearerToken
  })

  return tokens.length ? tokens[0] : false
}

/**
 * Get client.
 */

InMemoryCache.getClient = function (clientId, clientSecret) {
  var clients = InMemoryCache.clients.filter(function (client) {
    return client.clientId === clientId && client.clientSecret === clientSecret
  })

  return clients.length ? clients[0] : false
}

/**
 * Save token.
 */

InMemoryCache.saveToken = function (token, client, user) {

  var newToken = {
    accessToken: token.accessToken,
    accessTokenExpiresAt: token.accessTokenExpiresAt,
    refreshToken: token.refreshToken,
    refreshTokenExpiresAt: token.refreshTokenExpiresAt,
    client: client,
    user: user
  }

  InMemoryCache.tokens.push(newToken)

  console.log(newToken)

  return newToken

}

/*
 * Get user.
 */

InMemoryCache.getUser = function (username, password) {
  var users = InMemoryCache.users.filter(function (user) {
    return user.username === username && user.password === password
  })

  return users.length ? users[0] : false
}

// InMemoryCache.saveAuthorizationCode = function(code, client, user) {
//   console.log(code)
//   return {}
// }

/**
 * Export constructor.
 */

module.exports = InMemoryCache