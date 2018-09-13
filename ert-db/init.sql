USE ert;

CREATE TABLE IF NOT EXISTS users (
  id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(256) UNIQUE,
  password VARCHAR(256),
  full_name VARCHAR(200),
  dob DATE,
  PRIMARY KEY (id)
);

INSERT INTO users (username, password, full_name, dob) VALUES ("alice", "123", "Liz Alice", "1988-11-11");
INSERT INTO users (username, password, full_name, dob) VALUES ("bob", "123", "Sean Bob", "1990-01-21");
INSERT INTO users (username, password, full_name, dob) VALUES ("charlie", "123", "Carter Charlie", "1980-02-22");
INSERT INTO users (username, password, full_name, dob) VALUES ("david", "123", "Kyron David", "1992-05-01");
INSERT INTO users (username, password, full_name, dob) VALUES ("frank", "123", "Frank Shannon", "1950-09-09");

CREATE TABLE IF NOT EXISTS oauth_clients (
  client_id VARCHAR(256) NOT NULL UNIQUE,
  client_name TEXT NOT NULL,
  client_secret TEXT NOT NULL,
  redirect_uri TEXT
);

INSERT INTO oauth_clients (client_name, client_id, client_secret, redirect_uri) VALUES ("ERT user management", "abc123", "ssh-secret", "");

CREATE TABLE IF NOT EXISTS oauth_tokens (
  access_token TEXT NOT NULL,
  access_token_expires_at TEXT NOT NULL,
  client_id TEXT NOT NULL,
  user_id TEXT NOT NULL
);