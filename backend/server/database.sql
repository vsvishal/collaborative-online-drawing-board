-- Create a database and use it
CREATE DATABASE IF NOT EXISTS drawing_board;
USE drawing_board;

-- Create a table to store drawing elements
CREATE TABLE IF NOT EXISTS drawings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ip VARCHAR(15) NOT NULL,
  group_id VARCHAR(50) NOT NULL,
  shape VARCHAR(20) NOT NULL
);