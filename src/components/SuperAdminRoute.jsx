import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const SuperAdminRoute = () => {
  const { auth } = useContext(AuthContext);

  // Check if user is authenticated and has superadmin role
  if (!auth.token || auth.role !== 'superadmin') {
    // Redirect to login if not authenticated or not a superadmin
    return <Navigate to="/login" replace />;
  }

  // If authenticated and has superadmin role, render the child routes
  return <Outlet />;
};

export default SuperAdminRoute;