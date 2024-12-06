-- Create the database
CREATE DATABASE IF NOT EXISTS finance_tracker;

-- Use the newly created database
USE finance_tracker;

-- Table to store user information
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table to store transaction categories
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    type ENUM('income', 'expense') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Table to store transactions
CREATE TABLE transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    category_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    transaction_date DATE NOT NULL,
    note TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- Table to store user settings
CREATE TABLE user_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    theme VARCHAR(20) DEFAULT 'light',
    notifications_enabled BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Table to store reports
CREATE TABLE reports (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Insert demo user (Ensure this user exists for categories)
INSERT INTO users (username, email, password_hash) VALUES 
('demo_user', 'demo@example.com', 'demo_password_hash');

-- Insert default categories (Use the correct user_id)
INSERT INTO categories (user_id, name, type) 
SELECT id, 'Salary', 'income' FROM users WHERE username = 'demo_user';
INSERT INTO categories (user_id, name, type) 
SELECT id, 'Freelance', 'income' FROM users WHERE username = 'demo_user';
INSERT INTO categories (user_id, name, type) 
SELECT id, 'Rent', 'expense' FROM users WHERE username = 'demo_user';
INSERT INTO categories (user_id, name, type) 
SELECT id, 'Groceries', 'expense' FROM users WHERE username = 'demo_user';
INSERT INTO categories (user_id, name, type) 
SELECT id, 'Utilities', 'expense' FROM users WHERE username = 'demo_user';
