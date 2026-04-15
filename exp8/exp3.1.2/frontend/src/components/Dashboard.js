import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthService from '../services/authService';

function Dashboard() {
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = AuthService.getToken();
    if (token) {
      axios.get('http://localhost:5000/api/protected', {
        headers: {
          'x-access-token': token
        }
      })
      .then(response => {
        setMessage(response.data.message);
        setUser(response.data.user);
      })
      .catch(error => {
        console.error('Error accessing protected route:', error);
        setMessage('Failed to access protected route');
      });
    }
  }, []);

  const handleLogout = () => {
    AuthService.logout();
    navigate('/login');
  };

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h2>Dashboard</h2>
      <p>{message}</p>
      {user && (
        <div>
          <p>Welcome, {user.username}!</p>
          <p>User ID: {user.id}</p>
        </div>
      )}
      <button
        onClick={handleLogout}
        style={{ padding: '10px 20px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '20px' }}
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;