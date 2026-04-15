require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const adminRoutes = require('./routes/admin');
const User = require('./models/User');

const app = express();
const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/rbac_app';

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

async function createDefaultAdmin() {
  const existingAdmin = await User.findOne({ role: 'admin' });
  if (!existingAdmin) {
    const password = await bcrypt.hash('Admin@123', 10);
    await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password,
      role: 'admin'
    });
    console.log('Default admin created: admin@example.com / Admin@123');
  }
}

mongoose
  .connect(mongoUri)
  .then(async () => {
    console.log('MongoDB connected');
    await createDefaultAdmin();
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });
