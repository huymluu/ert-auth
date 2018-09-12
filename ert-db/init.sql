USE ert;

CREATE TABLE IF NOT EXISTS users (
  id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(256) UNIQUE,
  password VARCHAR(256),
  full_name VARCHAR(200),
  dob DATE,
  PRIMARY KEY (id)
);

INSERT INTO users (username, password, full_name, dob) VALUES ("admin", "admin", "Administrator", "1988-11-11");

CREATE TABLE IF NOT EXISTS oauth_clients (
  id INT NOT NULL AUTO_INCREMENT,
  client_id TEXT,
  client_secret TEXT,
  redirect_uri TEXT,
  grants TEXT,
  PRIMARY KEY (id)
);

INSERT INTO oauth_clients (client_id, client_secret, redirect_uri, grants) VALUES ("123", "asd", "", "password");

CREATE TABLE IF NOT EXISTS oauth_tokens (
  access_token TEXT NOT NULL,
  access_token_expires_at TEXT NOT NULL,
  client_id TEXT NOT NULL,
  user_id TEXT NOT NULL
);