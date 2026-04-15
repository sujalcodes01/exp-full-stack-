import { useEffect, useState } from 'react';
import { fetchProfile } from '../api/auth';

export default function ProfilePage({ auth }) {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadProfile() {
      try {
        const result = await fetchProfile(auth.token);
        setProfile(result.user);
      } catch (err) {
        setError(err.message);
      }
    }
    loadProfile();
  }, [auth.token]);

  return (
    <div className="card">
      <h2>Your Profile</h2>
      {error && <div className="error">{error}</div>}
      {profile ? (
        <div className="profile-grid">
          <div><strong>Name:</strong> {profile.name}</div>
          <div><strong>Email:</strong> {profile.email}</div>
          <div><strong>Role:</strong> {profile.role}</div>
          <div><strong>ID:</strong> {profile._id}</div>
        </div>
      ) : (
        <p>Loading your profile...</p>
      )}
    </div>
  );
}
