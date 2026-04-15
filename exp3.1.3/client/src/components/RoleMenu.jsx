export default function RoleMenu({ role }) {
  const menuItems = {
    admin: [
      { label: 'Admin Dashboard', path: '/admin' },
      { label: 'Profile', path: '/profile' }
    ],
    manager: [
      { label: 'Profile', path: '/profile' }
    ],
    user: [
      { label: 'Profile', path: '/profile' }
    ]
  };

  const items = menuItems[role] || [];

  if (!items.length) {
    return null;
  }

  return (
    <section className="role-menu">
      <h3>Available actions for {role}</h3>
      <ul>
        {items.map((item) => (
          <li key={item.path}>{item.label}</li>
        ))}
      </ul>
    </section>
  );
}
