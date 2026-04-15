const { ROLE_HIERARCHY } = require('../roles');

const requireRole = (requiredRole) => (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  const userRank = ROLE_HIERARCHY[req.user.role] || 0;
  const requiredRank = ROLE_HIERARCHY[requiredRole] || 0;

  if (userRank < requiredRank) {
    return res.status(403).json({ message: 'Access denied' });
  }

  next();
};

module.exports = {
  requireRole
};
