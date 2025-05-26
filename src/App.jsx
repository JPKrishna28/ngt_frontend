import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage'; // Add this import
import Dashboard from './pages/Dashboard';
import TimeClock from './pages/TimeClock';
import AdminDashboard from './pages/AdminDashboard';
import SuperAdminDashboard from './pages/SuperAdminDashboard';
import EmployeeList from './pages/EmployeeList';
import EmployeeDetail from './pages/EmployeeDetail';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import SuperAdminRoute from './components/SuperAdminRoute';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LoginPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} /> {/* Add this route */}
          
          {/* Protected Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="time-clock" element={<TimeClock />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          
          {/* Admin Routes */}
          <Route element={<AdminRoute />}>
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="employees" element={<EmployeeList />} />
            <Route path="employees/:id/details" element={<EmployeeDetail />} />
          </Route>
          
          {/* Super Admin Routes */}
          <Route element={<SuperAdminRoute />}>
            <Route path="super-admin" element={<SuperAdminDashboard />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;