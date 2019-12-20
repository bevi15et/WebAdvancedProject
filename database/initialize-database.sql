CREATE TABLE IF NOT EXISTS accounts(
    accountId INTEGER PRIMARY KEY AUTO_INCREMENT,
    fullName VARCHAR(50),
    email VARCHAR(50) UNIQUE,
    adress VARCHAR (100),
    postalCode varchar(50),
    password VARCHAR(255),
    orderHistory INTEGER,
    admin VARCHAR(10)
);

CREATE TABLE IF NOT EXISTS products(
    productId INTEGER PRIMARY KEY AUTO_INCREMENT, 
    productImage TEXT, 
    price INTEGER,
    productName VARCHAR (45),
    productDescription LONGTEXT
);

CREATE TABLE IF NOT EXISTS orders(
    orderId INTEGER AUTO_INCREMENT NOT NULL,
    accountId INTEGER,
    PRIMARY KEY(orderId),
    CONSTRAINT FOREIGN KEY(accountId) REFERENCES accounts(accountId)
);

CREATE TABLE IF NOT EXISTS currentOrder(
	currentOrderId INTEGER NOT NULL,
	productId INTEGER NOT NULL,
    orderStatus VARCHAR (100),
	CONSTRAINT FOREIGN KEY(currentOrderId) REFERENCES orders(orderId) ON DELETE CASCADE,
	FOREIGN KEY(productId) REFERENCES products(productId)
)
