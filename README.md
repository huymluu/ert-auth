# ERT Auth Server

This is Auth Server, support OAuth2 with Authorization Code grant.

For simplicity, I combine Auth server and API server into 1 instance.

## Configuration

Please see `./config/default.js` file for server configuration, i.e. port, database...

Here the Auth Server run on port 7000, connects to ERT database server on port 6000

### Endpoints

For user authentication:
```
/login
/logout
```

For OAuth authorization:
```
/dialog/authorize
/dialog/authorize/decision    # Accept/Deny authorization from other apps
/oauth/token                  # Exchange authorization code for token
/revokeAll                    # User revoke all apps authorization
```

For API resource access:
```
/api/check_token    # Validate token
/api/me             # Get current user info
/api/users          # Get all user info
/api/user           # Add new user (POST) and Edit user info (PATCH)
```

## Usage

### Run in host machine

```
npm start
```

### Run in docker

```
docker-compose up -d
```

### For development
```
npm install
npm run dev
```
