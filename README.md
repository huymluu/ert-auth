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

## Detail Flow explanation

### 1. Authorization request

User visit `/dialog/authorize` endpoint with params
```
response_type=code
client_id=<ID>
redirect_uri=<URL>
```

Handled by `routes.oauth2.authorization()`:

- Check user logged in (by `connect-ensure-login`)
- Check valid params (valid client info)
- Check if user already authorized client (token exist)
  - If user already authorized client, skip to step 3.
  - If not, render dialog asking for permission

### 2. Submit decision

In dialog, user submit form to `/dialog/authorize/decision`, which is handle by `routes.oauth2.decision()`

### 3. Redirect to client callback endpoint

An authorization code is generated.

User is redirected to `<redirect_uri>` (served by client app server) with param `code`.

In this endpoint, client app server uses param `code` to exchange for token.

### 4. Exchange for token

Client app exchanges code for token by this OAuth server endpoint `/oauth/token`, request body:

```
grant_type=authorization_code
&code=<code>
&client_id=...
&client_secret=...
&redirect_uri=...
```

In OAuth server, endpoint `/oauth/token` is handled:

- Parse detail information of the `code` (includes userId, clientId)
- Use those information to find existed token
- Generate new token if not existed, and response to client app

Now, client app can use the token to access resource.