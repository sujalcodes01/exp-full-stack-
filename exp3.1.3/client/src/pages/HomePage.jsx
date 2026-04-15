export default function HomePage({ auth }) {
  return (
    <div className="card">
      <h2>RBAC Experiment 3.1.3</h2>
      <p>Use the login page to authenticate and see role-based routes and menus.</p>
      {auth.user ? (
        <p>You are signed in as <strong>{auth.user.name}</strong> with role <strong>{auth.user.role}</strong>.</p>
      ) : (
        <p>Please login to access protected pages.</p>
      )}
    </div>
  );
}
