import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../api/axios';
import { FiUserPlus, FiShield, FiInfo } from 'react-icons/fi';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    employeeId: '',
    name: '',
    password: '',
    confirmPassword: '',
    role: 'employee', // Default role
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showSuperAdminOption, setShowSuperAdminOption] = useState(false);
  
  const navigate = useNavigate();
  
  const { employeeId, name, password, confirmPassword, role } = formData;
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  
  const toggleSuperAdminOption = () => {
    setShowSuperAdminOption(!showSuperAdminOption);
  };

  // Function to get current date and time in UTC
  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toISOString().split('T')[0] + ' ' + 
           now.toTimeString().split(' ')[0];
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!employeeId || !name || !password || !confirmPassword) {
      return toast.error('Please fill in all fields');
    }
    
    if (password !== confirmPassword) {
      return toast.error('Passwords do not match');
    }

    // Special validation for superadmin
    if (role === 'superadmin' && password.length < 8) {
      return toast.error('Superadmin password must be at least 8 characters');
    }
    
    try {
      setIsLoading(true);
      
      // Choose endpoint based on role
      const endpoint = role === 'superadmin' 
        ? '/api/auth/register-super-admin'
        : '/api/auth/public-register';

      // Log attempt
      console.log(`Attempting to register ${role} account:`, {
        employeeId,
        name,
        role,
        time: getCurrentDateTime()
      });
      
      // Register user
      const response = await api.post(endpoint, {
        employeeId,
        name,
        password,
        role: role,
      });
      
      if (role === 'superadmin') {
        toast.success('🔐 Superadmin created successfully! Please login.', {
          autoClose: 5000
        });
        console.log('SUPERADMIN CREATION SUCCESS:', {
          employeeId,
          name,
          time: getCurrentDateTime(),
          response: response.data
        });
      } else {
        toast.success('Registration successful! Please login.');
      }
      
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <FiUserPlus className="mx-auto text-blue-600 text-5xl" />
          <h1 className="mt-4 text-3xl font-bold text-gray-900">Create Account</h1>
          <p className="mt-2 text-gray-600">Register to track your work hours</p>
          
          {/* Debug info */}
          <div className="mt-2 text-xs text-gray-400">
            <p>Current Date and Time (UTC): {getCurrentDateTime()}</p>
          </div>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700">
              Employee ID
            </label>
            <input
              id="employeeId"
              name="employeeId"
              type="text"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your Employee ID"
              value={employeeId}
              onChange={handleChange}
            />
          </div>
          
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your full name"
              value={name}
              onChange={handleChange}
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
              value={password}
              onChange={handleChange}
            />
          </div>
          
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={handleChange}
            />
          </div>

          {/* Secret option to show superadmin role */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={toggleSuperAdminOption}
              className="text-xs text-gray-400 hover:text-gray-600 flex items-center"
            >
              <FiInfo className="mr-1" size={12} />
              Advanced options
            </button>
          </div>
          
          {/* Role selection (only shown when toggled) */}
          {showSuperAdminOption && (
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                Account Type
              </label>
              <div className="mt-1">
                <select
                  id="role"
                  name="role"
                  value={role}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="employee">Employee</option>
                  <option value="admin">Admin</option>
                  <option value="superadmin">Super Admin</option>
                </select>
              </div>
              
              {role === 'superadmin' && (
                <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-md">
                  <div className="flex items-start">
                    <FiShield className="text-red-600 mt-0.5 mr-2" />
                    <div className="text-xs text-red-800">
                      <p className="font-semibold">You are creating a Superadmin account</p>
                      <p>This account will have full access to all system features and data.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          
          <div>
            <button
              type="submit"
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                role === 'superadmin'
                  ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
                  : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
              }`}
              disabled={isLoading}
            >
              {isLoading ? 'Registering...' : role === 'superadmin' ? 'Create Superadmin' : 'Register'}
            </button>
          </div>
        </form>
        
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;