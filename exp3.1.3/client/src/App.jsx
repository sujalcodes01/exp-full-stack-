import { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import ProfilePage from './pages/ProfilePage';
import UnauthorizedPage from './pages/UnauthorizedPage';
import RoleMenu from './components/RoleMenu';

const STORAGE_KEY = 'rbac_auth';

function App() {
  const [auth, setAuth] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : { token: null, user: null };
  });
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(auth));
  }, [auth]);

  const handleLogout = () => {
    setAuth({ token: null, user: null });
    navigate('/login');
  };

  const updateAuth = (data) => {
    setAuth({ token: data.token, user: data.user });
    navigate('/');
  };

  return (
    <div className="app-shell">
      <header>
        <div className="brand">RBAC Demo</div>
        <nav>
          <Link to="/">Home</Link>
          {auth.user ? (
            <>
              <Link to="/profile">Profile</Link>
              {auth.user.role === 'admin' && <Link to="/admin">Admin</Link>}
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </nav>
      </header>

      <RoleMenu role={auth.user?.role} />

      <main>
        <Routes>
          <Route path="/" element={<HomePage auth={auth} />} />
          <Route path="/login" element={<LoginPage onLogin={updateAuth} />} />
          <Route path="/profile" element={<ProtectedRoute auth={auth}><ProfilePage auth={auth} /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute auth={auth} requiredRole="admin"><AdminDashboard auth={auth} /></ProtectedRoute>} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
