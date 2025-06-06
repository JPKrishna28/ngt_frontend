import axios from 'axios';
import { toast } from 'react-toastify';

const baseURL = 'http://localhost:5000';

// Create axios instance
const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Add a request interceptor to set the auth token
api.interceptors.request.use(
  (config) => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const { token } = JSON.parse(userInfo);
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor for global error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle specific error codes
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      
      // Unauthorized - Token may be invalid or user doesn't have permission
      if (error.response.status === 401) {
        toast.error('Authentication error: Please log in again');
        // Optionally redirect to login if not already there
        if (window.location.pathname !== '/login') {
          localStorage.removeItem('userInfo');
          window.location.href = '/login';
        }
      }
      
      // Forbidden - User is authenticated but doesn't have permission
      else if (error.response.status === 403) {
        toast.error('You do not have permission to perform this action');
      }
    } else if (error.request) {
      // The request was made but no response was received
      toast.error('Network error: Server is not responding');
    } else {
      // Something happened in setting up the request
      toast.error('Error: ' + error.message);
    }
    
    return Promise.reject(error);
  }
);

export default api;