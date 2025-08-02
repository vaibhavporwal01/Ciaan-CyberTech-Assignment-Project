-- CIAAN Cyber Tech Database Setup
-- Run this script first to create the required tables

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    bio TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_posts_user_id ON posts(user_id);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Insert sample data (optional)
-- Uncomment the lines below if you want some test data

-- INSERT INTO users (name, email, password_hash, bio) VALUES 
-- ('John Doe', 'john@ciaancybertech.com', '$2a$12$example_hash', 'Software Engineer at CIAAN Cyber Tech'),
-- ('Jane Smith', 'jane@ciaancybertech.com', '$2a$12$example_hash', 'Project Manager at CIAAN Cyber Tech');
