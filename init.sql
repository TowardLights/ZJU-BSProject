create database IF NOT EXISTS PriceCmpWeb CHARACTER SET utf8 COLLATE utf8_general_ci;
CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(25) NOT NULL unique,
    email VARCHAR(25) NOT NULL unique,
    password VARCHAR(25) NOT NULL
);
create table if not exists products(
    product_id INT auto_increment primary key,
    product_name varchar(255) not null,
    image_url varchar(255),
    current_price DECIMAL(10, 2) NOT NULL,
    platform varchar(255) not null,
    store_name varchar(255),
    product_url varchar(255) not null
) DEFAULT CHARSET = utf8;
create table if not exists priceAlert(
    alert_id INT auto_increment primary key,
    email VARCHAR(25) NOT NULL,
    product_name varchar(255) not null,
    target_price DECIMAL(10, 2) NOT NULL
);