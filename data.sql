\c list

DROP TABLE IF EXISTS list;

CREATE TABLE list (
    name text PRIMARY KEY,
    price float NOT NULL
);

INSERT INTO list
VALUES ('cheetos', 2.00),
('pizza', 5.50),
('candy', .50);

SELECT * FROM list;
