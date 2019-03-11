CREATE TABLE IF NOT EXISTS accounts(
    accountId INTEGER PRIMARY KEY AUTO_INCREMENT,
    fullName VARCHAR(50),
    email VARCHAR(50) UNIQUE,
    adress VARCHAR (100),
    postalCode varchar(50),
    password VARCHAR(255),
    admin VARCHAR(10)
);


CREATE TABLE IF NOT EXISTS products(
    productId INTEGER PRIMARY KEY AUTO_INCREMENT, 
    productImage BLOB, 
    price INTEGER,
    productName VARCHAR (45),
    productDescription LONGTEXT
);


CREATE TABLE IF NOT EXISTS orders(
    orderId INTEGER AUTO_INCREMENT NOT NULL, 
    accountId INTEGER,
    productId INTEGER,
    PRIMARY KEY(orderId),
    CONSTRAINT FOREIGN KEY(accountId) REFERENCES accounts(accountId),
    CONSTRAINT FOREIGN KEY(productId) REFERENCES products(productId)
    
);
