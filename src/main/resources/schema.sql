CREATE TABLE person(
p_id int PRIMARY KEY AUTO_INCREMENT,
a_level int NOT NULL,
username char(200) NOT NULL UNIQUE,
password char(200) NOT NULL,
first_name char(200) NOT NULL,
last_name char(200) NOT NULL,
email char(200) UNIQUE NOT NULL,
phone int UNIQUE NOT NULL
);

CREATE TABLE freight_load(
f_id int PRIMARY KEY AUTO_INCREMENT,
rate decimal(10,2),
start_address char(200) NOT NULL,
end_address char(200) NOT NULL,
gas_cost decimal(10,2),
load_cost decimal(10,2),
driver_pay decimal(10,2),
insurance_cost decimal(10,2),
maintenance_cost decimal(10,2),
p_id int,
status int,
CONSTRAINT fk_person FOREIGN KEY (p_id) REFERENCES person(p_id)
);