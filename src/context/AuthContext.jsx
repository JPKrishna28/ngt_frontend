import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

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
        
        // Set default headers for axios requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${userInfo.token}`;
      }
      setLoading(false);
    };
    
    checkLoggedIn();
  }, []);

  // Login user
  const login = async (employeeId, password) => {
    try {
      const { data } = await axios.post('/api/auth/login', { employeeId, password });
      
      localStorage.setItem('userInfo', JSON.stringify(data));
      setAuth(data);
      
      // Set default headers for axios requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('userInfo');
    setAuth({});
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;