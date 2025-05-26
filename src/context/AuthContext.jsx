import { createContext, useState, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    // Initialize auth state from localStorage
    const savedAuth = localStorage.getItem('auth');
    return savedAuth ? JSON.parse(savedAuth) : {};
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set Authorization header for all requests if token exists
    if (auth?.token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${auth.token}`;
    } else {
      delete api.defaults.headers.common['Authorization'];
    }
    
    setLoading(false);
  }, [auth]);

  const login = async (employeeId, password) => {
    try {
      const response = await api.post('/api/auth/login', { employeeId, password });
      
      // Log the response to debug
      console.log('Login response:', response.data);
      
      // Check for the expected data structure
      if (!response.data || !response.data.token) {
        throw new Error('Invalid response format from server');
      }
      
      // Extract user data safely with fallbacks
      const userData = {
        token: response.data.token,
        employeeId: response.data.employeeId || response.data.user?.employeeId || '',
        name: response.data.name || response.data.user?.name || '',
        role: response.data.role || response.data.user?.role || 'employee',
      };
      
      // Store user data in auth context
      setAuth(userData);
      
      // Store user data in localStorage
      localStorage.setItem('auth', JSON.stringify(userData));
      
      // Set token as default Authorization header
      api.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    // Clear auth context
    setAuth({});
    
    // Remove from localStorage
    localStorage.removeItem('auth');
    
    // Remove Authorization header
    delete api.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ auth, loading, login, logout, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;