-- Create demo user for quick access
-- Run this script to add a demo account

INSERT INTO users (name, email, password_hash, bio) 
VALUES (
  'Demo User', 
  'demo@ciaancybertech.com', 
  '$2a$12$LQv3c1yX1Q2xrfMsRgHCoe.AGssxMiFUiikjqhYnvdMHtqbNyOgTa', -- password: demo123
  'Demo account for exploring CIAAN Cyber Tech platform features'
) ON CONFLICT (email) DO NOTHING;

-- Add some demo posts
INSERT INTO posts (user_id, content) 
SELECT 
  u.id,
  'Welcome to CIAAN Cyber Tech! 🚀 This is a demo post showcasing our professional networking platform. Feel free to like, comment, and share!'
FROM users u 
WHERE u.email = 'demo@ciaancybertech.com'
ON CONFLICT DO NOTHING;

INSERT INTO posts (user_id, content) 
SELECT 
  u.id,
  'Just completed an amazing project using cutting-edge cybersecurity technologies. The future of digital security looks bright! 💻🔒 #CyberSecurity #Innovation'
FROM users u 
WHERE u.email = 'demo@ciaancybertech.com'
ON CONFLICT DO NOTHING;

INSERT INTO posts (user_id, content) 
SELECT 
  u.id,
  'Excited to be part of the CIAAN Cyber Tech community! Looking forward to connecting with fellow tech professionals and sharing knowledge. 🌟 #Networking #TechCommunity'
FROM users u 
WHERE u.email = 'demo@ciaancybertech.com'
ON CONFLICT DO NOTHING;
