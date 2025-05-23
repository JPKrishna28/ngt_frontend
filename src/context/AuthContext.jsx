import { createContext, useState, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const checkLoggedIn = async () => {
      if (localStorage.getItem('userInfo')) {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        setAuth(userInfo);
      }
      setLoading(false);
    };
    
    checkLoggedIn();
  }, []);

  // Login user
  const login = async (employeeId, password) => {
    try {
      const { data } = await api.post('/api/auth/login', { employeeId, password });
      
      localStorage.setItem('userInfo', JSON.stringify(data));
      setAuth(data);
      
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('userInfo');
    setAuth({});
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;