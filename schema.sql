DROP DATABASE IF EXISTS bamazonDB;
CREATE database bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(8,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

SELECT * FROM products;

/* mock data */

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Harry Potter Book Series', 'Books', 50.00, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Toothpaste', 'Toiletries', 2.75, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('LG 65-inch 4k TV', 'Electronics', 599.99, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Yellow Accent Chair', 'Home Furniture', 249.99, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Black Leather Loveseat', 'Home Furniture', 445.60, 8);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Step Brothers DVD', 'DVDs', 9.99, 45);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Black Printer Ink Cartridge', 'Computers and Office', 20.85, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Kindle Paperwhite eReader', 'Books', 120.99, 95);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Mens Blue Jeans', 'Apparel', 49.00, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Travel Duffel Bag', 'Luggage', 40.10, 27);
