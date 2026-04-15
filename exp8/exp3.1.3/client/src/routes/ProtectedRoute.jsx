import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ auth, requiredRole, children }) {
  if (!auth?.token) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && auth.user?.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
