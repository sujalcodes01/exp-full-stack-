import { useEffect, useState } from 'react';
import { fetchAdminDashboard } from '../api/auth';

export default function AdminDashboard({ auth }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetchAdminDashboard(auth.token);
        setData(response);
      } catch (err) {
        setError(err.message);
      }
    }
    loadData();
  }, [auth.token]);

  return (
    <div className="card">
      <h2>Admin Dashboard</h2>
      {error && <div className="error">{error}</div>}
      {data ? (
        <div>
          <p>Total users: <strong>{data.totalUsers}</strong></p>
          <div className="badge-list">
            {data.roles.map((role) => (
              <span key={role._id} className="badge">{role._id}: {role.count}</span>
            ))}
          </div>
          <p>Only admins can see this page.</p>
        </div>
      ) : (
        <p>Loading dashboard...</p>
      )}
    </div>
  );
}
