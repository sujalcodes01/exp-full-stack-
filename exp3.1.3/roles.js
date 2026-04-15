const ROLE_HIERARCHY = {
  admin: 3,
  manager: 2,
  user: 1
};

const ROLE_PERMISSIONS = {
  admin: [
    'view_dashboard',
    'manage_users',
    'view_profile',
    'view_admin_dashboard'
  ],
  manager: [
    'view_dashboard',
    'view_profile'
  ],
  user: ['view_profile']
};

module.exports = {
  ROLE_HIERARCHY,
  ROLE_PERMISSIONS
};
