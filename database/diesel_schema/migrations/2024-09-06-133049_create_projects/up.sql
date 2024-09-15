CREATE TABLE app_user (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    dataowner VARCHAR(255) DEFAULT 'system',
    regist_date TIMESTAMP DEFAULT current_timestamp,
    enable_start_date TIMESTAMP DEFAULT '1970-01-01 00:00:00',
    enable_end_date TIMESTAMP DEFAULT '9999-12-31 23:59:59',
    version BIGINT DEFAULT 1
);

CREATE TABLE app_team (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    api_key VARCHAR(255) NOT NULL,
    dataowner VARCHAR(255) DEFAULT 'system',
    regist_date TIMESTAMP DEFAULT current_timestamp,
    enable_start_date TIMESTAMP DEFAULT '1970-01-01 00:00:00',
    enable_end_date TIMESTAMP DEFAULT '9999-12-31 23:59:59',
    version BIGINT DEFAULT 1
);

CREATE TABLE permission_allocation (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT,
    team_id BIGINT,
    ordinary_read BOOLEAN DEFAULT FALSE,
    hyper_read BOOLEAN DEFAULT FALSE,
    auth_read BOOLEAN DEFAULT FALSE,
    ordinary_write BOOLEAN DEFAULT FALSE,
    hyper_write BOOLEAN DEFAULT FALSE,
    auth_write BOOLEAN DEFAULT FALSE,
    dataowner VARCHAR(255) DEFAULT 'system',
    regist_date TIMESTAMP DEFAULT current_timestamp,
    enable_start_date TIMESTAMP DEFAULT '1970-01-01 00:00:00',
    enable_end_date TIMESTAMP DEFAULT '9999-12-31 23:59:59',
    version BIGINT DEFAULT 1,
    FOREIGN KEY (user_id) REFERENCES app_user(id),
    FOREIGN KEY (team_id) REFERENCES app_team(id)
);

INSERT INTO app_user (name, email) VALUES
('hamaji', 'koma4024@gmail.com'),
('tanaka', 'tanaka@example.com'),
('suzuki', 'suzuki@example.com');

INSERT INTO app_team (name, api_key) VALUES
('ひまわり組', 'team1-key'),
('team2', 'team2-key');

INSERT INTO permission_allocation (user_id, team_id, ordinary_read) VALUES
(1, 1, TRUE);