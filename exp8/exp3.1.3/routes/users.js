const express = require('express');
const authMiddleware = require('../middleware/auth');
const { requireRole } = require('../middleware/roles');
const User = require('../models/User');

const router = express.Router();

router.use(authMiddleware);

router.get('/me', async (req, res) => {
  res.json({ user: req.user });
});

router.get('/', requireRole('admin'), async (req, res) => {
  const users = await User.find().select('-password');
  res.json({ users });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  if (req.user.role !== 'admin' && req.user._id.toString() !== id) {
    return res.status(403).json({ message: 'Access denied' });
  }

  const user = await User.findById(id).select('-password');
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json({ user });
});

module.exports = router;
