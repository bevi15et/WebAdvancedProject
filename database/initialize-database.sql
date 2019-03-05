CREATE TABLE IF NOT EXISTS customerAccounts(
    customerId INTEGER PRIMARY KEY AUTO_INCREMENT,
    fullName VARCHAR(50),
    email VARCHAR(50),
    adress VARCHAR (100),
    postalCode varchar(50),
    password VARCHAR(25)
);


CREATE TABLE IF NOT EXISTS products(
    productId INTEGER PRIMARY KEY AUTO_INCREMENT, 
    productImage BLOB, 
    productName VARCHAR (45),
    productDescription LONGTEXT
);


CREATE TABLE IF NOT EXISTS orders(
    orderId INTEGER AUTO_INCREMENT NOT NULL, 
    customerId INTEGER,
    productId INTEGER,
    PRIMARY KEY(orderId),
    CONSTRAINT FOREIGN KEY(customerId) REFERENCES customerAccounts(customerId),
    CONSTRAINT FOREIGN KEY(productId) REFERENCES products(productId)
    
);
