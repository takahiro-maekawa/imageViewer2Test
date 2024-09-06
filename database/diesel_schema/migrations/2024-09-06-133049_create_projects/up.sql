-- Your SQL goes here
CREATE TABLE app_user (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
    enable_date TIMESTAMP DEFAULT '1970-01-01 00:00:00',
    disable_date TIMESTAMP DEFAULT '9999-12-31 23:59:59',
    version INTEGER NOT NULL DEFAULT 1
);