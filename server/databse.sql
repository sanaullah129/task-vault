CREATE DATABASE taskvault;

CREATE TABLE tasks (
    task_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);

CREATE TABLE users (
    email VARCHAR(255) PRIMARY KEY,
    username VARCHAR(255),
    password VARCHAR(255)
);