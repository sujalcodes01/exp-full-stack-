const express = require('express');
const authMiddleware = require('../middleware/auth');
const { requireRole } = require('../middleware/roles');
const User = require('../models/User');

const router = express.Router();

router.use(authMiddleware);
router.use(requireRole('admin'));

router.get('/dashboard', async (req, res) => {
  const totalUsers = await User.countDocuments();
  const roles = await User.aggregate([
    { $group: { _id: '$role', count: { $sum: 1 } } }
  ]);

  res.json({ message: 'Admin dashboard data', totalUsers, roles });
});

router.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  if (req.user._id.toString() === id) {
    return res.status(400).json({ message: 'Admin cannot delete self' });
  }
  await User.findByIdAndDelete(id);
  res.json({ message: 'User deleted' });
});

module.exports = router;
