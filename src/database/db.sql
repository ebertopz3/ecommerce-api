CREATE TABLE users
(
    id         SERIAL PRIMARY KEY,
    name       varchar(255) NOT NULL,
    email      varchar(255) NOT NULL,
    password   bytea NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (name, email, password)
VALUES ('Geronimo Hernandes', 'geroher@gmail.com', '12345'),
       ('Roberto Hernandes', 'robercc86@gmail.com', '54321'),
       ('Maria Gonzales', 'marialeonor90@gmail.com', '12345');

CREATE TABLE products
(
    id: SERIAL PRIMARY KEY,
    title VARCHAR(455) NOT NULL,
    description TEXTNOT NULL,
    sku VARCHAR(255) NOT NULL,
    grams NUMERIC,
    stock INT NOT NULL,
    price NUMERIC NOT NULL,
    barcode VARCHAR(255),
    image TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

COPY products (title, description, sku, grams, stock, price, compare_price, barcode, image)
    FROM 'C:\Productos.csv' DELIMITER ';' CSV HEADER;