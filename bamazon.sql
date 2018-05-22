CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products(
    id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR (30) NULL,
    product_description VARCHAR (250) NOT NULL,
    price DECIMAL (10,2)  NULL,
    stock_quantity INTEGER, 
    PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, product_description ,price, stock_quantity) VALUES ("iPhone 6s+","Electronis", "Best Phone ever!", 600.00, 100);
INSERT INTO products (product_name, department_name, product_description ,price, stock_quantity) VALUES ("iPhone 8+","Electronis", "Best Phone ever! If you can't afford the 10.", 900.00, 100);
INSERT INTO products (product_name, department_name, product_description ,price, stock_quantity) VALUES ("Learning JavaScript Design Patterns","Books", "Learning JavaScript Design Patterns, you’ll learn how to write beautiful, structured, and maintainable JavaScript ", 25.89, 100);
INSERT INTO products (product_name, department_name, product_description ,price, stock_quantity) VALUES ("COWIN E7 ","Electronics", "Best headphoens  ever!", 69.99, 100);
INSERT INTO products (product_name, department_name, product_description ,price, stock_quantity) VALUES ("Soylent Bundle","Nutrition", "Original, Cacao, Chai & Coffiest Flavors, Nutritionally Complete Ready to Drink Beverage, 14 oz, 1 Bottle Per Flavor", 27.75, 100);
INSERT INTO products (product_name, department_name, product_description ,price, stock_quantity) VALUES ("Kenmore 68132 ","Appliences", "8.8 cu. ft. Electric Dryer in White, includes delivery and hookup", 649.99, 100);
INSERT INTO products (product_name, department_name, product_description ,price, stock_quantity) VALUES ("Huggies","Babies", "ize 1, 216 Count, ECONOMY PLUS ", 30.58, 100);
INSERT INTO products (product_name, department_name, product_description ,price, stock_quantity) VALUES ("The Sims 2","Games", "Best of business Collection", 13.85, 100);
INSERT INTO products (product_name, department_name, product_description ,price, stock_quantity) VALUES ("Instax Mini 8+ ","Electronis", "Instant Film Camera", 300.00, 100);
INSERT INTO products (product_name, department_name, product_description ,price, stock_quantity) VALUES ("Ceramic Fragrance diffuser","Appliences", "Diffuser essential for oils", 21.00, 100);
INSERT INTO products (product_name, department_name, product_description ,price, stock_quantity) VALUES ("Pusheen","Accesories", "Pusheen Snackable Ice Cream Stuff Animal ", 20.00, 100);