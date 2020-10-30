\c list-test

DROP TABLE IF EXISTS list;

CREATE TABLE list (
    name text PRIMARY KEY,
    price float NOT NULL
);

SELECT * FROM list;
