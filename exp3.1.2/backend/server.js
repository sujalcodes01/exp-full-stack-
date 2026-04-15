const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = 5000;
const JWT_SECRET = 'your-secret-key'; // In production, use environment variable

app.use(cors());
app.use(express.json());

// Mock user database (in real app, use a database)
const users = [
  {
    id: 1,
    username: 'admin',
    password: bcrypt.hashSync('password', 8)
  }
];

// Auth routes
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const passwordIsValid = bcrypt.compareSync(password, user.password);
  if (!passwordIsValid) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
    expiresIn: 86400 // 24 hours
  });

  res.status(200).json({
    auth: true,
    token: token,
    user: { id: user.id, username: user.username }
  });
});

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(403).json({ auth: false, message: 'No token provided.' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
    }
    req.userId = decoded.id;
    req.username = decoded.username;
    next();
  });
};

// Protected route
app.get('/api/protected', verifyToken, (req, res) => {
  res.status(200).json({
    auth: true,
    message: 'Welcome to the protected route!',
    user: { id: req.userId, username: req.username }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});