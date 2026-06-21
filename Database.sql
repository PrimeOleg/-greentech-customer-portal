CREATE DATABASE rolsa_tech;
USE rolsa_tech;

CREATE TABLE users (
id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
name varchar(255) NOT NULL,
email varchar(255) NOT NULL UNIQUE,
password_hash varchar(255) NOT NULL
);

CREATE TABLE carbon_calculator (
id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
user_id int(11),
electricity_kwh float NOT NULL,
distance_travelled_miles float NOT NULL,
total_carbon float NOT NULL,
date_of_calculation TIMESTAMP DEFAULT now(),
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE bookings (
id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
user_id int(11),
service varchar(100),
date_booked date,
extra_info TEXT,
date_created TIMESTAMP DEFAULT now(),
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
)
