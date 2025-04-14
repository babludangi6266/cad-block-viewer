CREATE TABLE files (
    id SERIAL PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
    originalname VARCHAR(255) NOT NULL,
    filepath VARCHAR(255) NOT NULL,
    upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE blocks (
    id SERIAL PRIMARY KEY,
    file_id INTEGER REFERENCES files(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    layer VARCHAR(255),
    type VARCHAR(100),
    x_coordinate FLOAT,
    y_coordinate FLOAT,
    z_coordinate FLOAT,
    properties JSONB
);