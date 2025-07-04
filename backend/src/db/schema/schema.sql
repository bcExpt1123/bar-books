-- Order Schema --
DROP TABLE IF EXISTS orders;

CREATE TABLE orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product TEXT NOT NULL,
    qty INTEGER NOT NULL,
    price REAL NOT NULL
);
