import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { toast } from 'react-toastify';
import AuthContext from '../context/AuthContext';
import { 
  FiUsers, FiUserPlus, FiEdit2, FiTrash2, FiSearch, 
  FiFilter, FiDownload, FiUpload, FiRefreshCw, FiShield,
  FiUserCheck, FiUserX, FiActivity, FiCheckCircle, FiUser
} from 'react-icons/fi';

const SuperAdminDashboard = () => {
  const { auth } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [showDeletedUsers, setShowDeletedUsers] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: 'employeeId', direction: 'ascending' });
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [formData, setFormData] = useState({
    employeeId: '',
    name: '',
    password: '',
    role: 'employee',
  });
  const [stats, setStats] = useState({
    totalUsers: 0,
    admins: 0,
    employees: 0,
    superadmins: 0,
    recentlyActive: 0,
  });

  // Load users on component mount
  useEffect(() => {
    fetchAllUsers();
  }, []);

  // Filter and sort users whenever dependencies change
  useEffect(() => {
    let filtered = [...users];
    
    // Apply role filter
    if (filterRole !== 'all') {
      filtered = filtered.filter(user => user.role === filterRole);
    }
    
    // Apply search
    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(
        user => 
          user.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.role.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply sorting
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    
    setFilteredUsers(filtered);
    
    // Calculate stats
    setStats({
      totalUsers: users.length,
      employees: users.filter(user => user.role === 'employee').length,
      admins: users.filter(user => user.role === 'admin').length,
      superadmins: users.filter(user => user.role === 'superadmin').length,
      recentlyActive: Math.floor(Math.random() * users.length), // Mock data - replace with real data
    });
  }, [users, searchTerm, filterRole, sortConfig]);

  // Fetch all users from the API
  const fetchAllUsers = async () => {
    try {
      setLoading(true);
      
      // This would be the endpoint for superadmins to get all users
      const { data } = await api.get('/api/employees/all');
      
      console.log('Fetched users:', data);
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to load users. ' + (error.response?.data?.message || ''));
    } finally {
      setLoading(false);
    }
  };

  // Handle search input change
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle role filter change
  const handleRoleFilter = (role) => {
    setFilterRole(role);
  };

  // Handle column sorting
  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Open modal to add/edit user
  const handleUserModal = (user = null) => {
    if (user) {
      // Edit mode
      setSelectedUser(user);
      setFormData({
        employeeId: user.employeeId,
        name: user.name,
        password: '', // Don't show existing password
        role: user.role,
      });
    } else {
      // Add mode
      setSelectedUser(null);
      setFormData({
        employeeId: '',
        name: '',
        password: '',
        role: 'employee',
      });
    }
    setShowUserModal(true);
  };

  // Handle form input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (selectedUser) {
        // Update existing user
        const updateData = {
          name: formData.name,
          role: formData.role,
        };
        
        // Only include password if it was changed
        if (formData.password) {
          updateData.password = formData.password;
        }
        
        await api.put(`/api/employees/${selectedUser.employeeId}`, updateData);
        toast.success(`User ${selectedUser.employeeId} updated successfully`);
      } else {
        // Create new user
        await api.post('/api/auth/register', formData);
        toast.success(`User ${formData.employeeId} created successfully`);
      }
      
      // Refresh user list
      fetchAllUsers();
      
      // Close modal
      setShowUserModal(false);
    } catch (error) {
      console.error('Error saving user:', error);
      toast.error('Failed to save user: ' + (error.response?.data?.message || 'Unknown error'));
    }
  };

  // Handle user deletion
  const handleDeleteUser = async (user) => {
    if (user.employeeId === auth.employeeId) {
      return toast.error("You cannot delete your own account");
    }
    
    if (!window.confirm(`Are you sure you want to delete ${user.name} (${user.employeeId})?`)) {
      return;
    }
    
    try {
      await api.delete(`/api/employees/${user.employeeId}`);
      toast.success(`User ${user.employeeId} deleted successfully`);
      fetchAllUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user: ' + (error.response?.data?.message || 'Unknown error'));
    }
  };

  // Get current date and time in formatted string
  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toISOString().split('T')[0] + ' ' + 
           now.toTimeString().split(' ')[0];
  };

  // Generate a role badge with appropriate styling
  const RoleBadge = ({ role }) => {
    let bgColor, textColor, icon;
    
    switch (role) {
      case 'superadmin':
        bgColor = 'bg-red-100';
        textColor = 'text-red-800';
        icon = <FiShield className="mr-1" />;
        break;
      case 'admin':
        bgColor = 'bg-purple-100';
        textColor = 'text-purple-800';
        icon = <FiUserCheck className="mr-1" />;
        break;
      default:
        bgColor = 'bg-blue-100';
        textColor = 'text-blue-800';
        icon = <FiUser className="mr-1" />;
    }
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
        {icon}
        {role}
      </span>
    );
  };

  // Loading state
  if (loading && users.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
        <span className="ml-3 text-xl font-semibold text-gray-700">Loading...</span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Dashboard Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Super Admin Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Full system control and user management
        </p>
        <div className="mt-1 text-xs text-gray-400">
          <p>Current Date and Time: {getCurrentDateTime()}</p>
          <p>Logged in as: {auth.name} ({auth.employeeId}) - {auth.role}</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                <FiUsers className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Users</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">{stats.totalUsers}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                <FiUser className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Employees</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">{stats.employees}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                <FiUserCheck className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Admins</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">{stats.admins}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-red-500 rounded-md p-3">
                <FiShield className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Super Admins</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">{stats.superadmins}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* User Management Section */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
          <div className="flex flex-wrap items-center justify-between">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              User Management
            </h3>
            <div className="mt-3 sm:mt-0 flex space-x-3">
              <button
                onClick={() => handleUserModal()}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <FiUserPlus className="-ml-1 mr-2 h-5 w-5" />
                Add User
              </button>
              <button
                onClick={fetchAllUsers}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <FiRefreshCw className="-ml-1 mr-2 h-5 w-5" />
                Refresh
              </button>
            </div>
          </div>
        </div>
        
        {/* Search and Filters */}
        <div className="px-4 py-3 bg-gray-50 sm:px-6">
          <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={handleSearch}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-red-500 focus:border-red-500 sm:text-sm"
              />
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleRoleFilter('all')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  filterRole === 'all'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                All
              </button>
              <button
                onClick={() => handleRoleFilter('employee')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  filterRole === 'employee'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Employees
              </button>
              <button
                onClick={() => handleRoleFilter('admin')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  filterRole === 'admin'
                    ? 'bg-purple-100 text-purple-800'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Admins
              </button>
              <button
                onClick={() => handleRoleFilter('superadmin')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  filterRole === 'superadmin'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Super Admins
              </button>
            </div>
          </div>
        </div>
        
        {/* User Table */}
        <div className="overflow-x-auto">
          {filteredUsers.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('employeeId')}
                  >
                    <div className="flex items-center">
                      ID
                      {sortConfig.key === 'employeeId' && (
                        <span className="ml-1">
                          {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center">
                      Name
                      {sortConfig.key === 'name' && (
                        <span className="ml-1">
                          {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('role')}
                  >
                    <div className="flex items-center">
                      Role
                      {sortConfig.key === 'role' && (
                        <span className="ml-1">
                          {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('createdAt')}
                  >
                    <div className="flex items-center">
                      Created At
                      {sortConfig.key === 'createdAt' && (
                        <span className="ml-1">
                          {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {user.employeeId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.name}
                      {user.employeeId === auth.employeeId && (
                        <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                          You
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <RoleBadge role={user.role} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-3">
                        <button
                          onClick={() => handleUserModal(user)}
                          className="text-indigo-600 hover:text-indigo-900"
                          title="Edit User"
                        >
                          <FiEdit2 className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user)}
                          className={`text-red-600 hover:text-red-900 ${
                            user.employeeId === auth.employeeId ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                          disabled={user.employeeId === auth.employeeId}
                          title={user.employeeId === auth.employeeId ? "Cannot delete your own account" : "Delete User"}
                        >
                          <FiTrash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="py-10 text-center text-gray-500">
              <FiUserX className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No users found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm || filterRole !== 'all' 
                  ? 'Try adjusting your search or filter criteria' 
                  : 'Get started by adding a new user.'}
              </p>
              <div className="mt-6">
                <button
                  onClick={() => handleUserModal()}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                >
                  <FiUserPlus className="-ml-1 mr-2 h-5 w-5" />
                  Add User
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Pagination (simplified for now) */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Previous
            </button>
            <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{filteredUsers.length}</span> of{' '}
                <span className="font-medium">{users.length}</span> users
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">
                Simplified pagination (showing all results)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* User Modal */}
      {showUserModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      {selectedUser ? <FiEdit2 className="h-6 w-6 text-red-600" /> : <FiUserPlus className="h-6 w-6 text-red-600" />}
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        {selectedUser ? 'Edit User' : 'Add New User'}
                      </h3>
                      <div className="mt-2">
                        <div className="mb-3">
                          <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700">
                            Employee ID
                          </label>
                          <input
                            type="text"
                            name="employeeId"
                            id="employeeId"
                            value={formData.employeeId}
                            onChange={handleChange}
                            disabled={!!selectedUser}
                            className="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            required
                          />
                          {selectedUser && (
                            <p className="mt-1 text-xs text-gray-500">Employee ID cannot be changed</p>
                          )}
                        </div>
                        <div className="mb-3">
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Full Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password {selectedUser && '(Leave blank to keep unchanged)'}
                          </label>
                          <input
                            type="password"
                            name="password"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            required={!selectedUser}
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                            Role
                          </label>
                          <select
                            name="role"
                            id="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                          >
                            <option value="employee">Employee</option>
                            <option value="admin">Admin</option>
                            <option value="superadmin">Super Admin</option>
                          </select>
                          {formData.role === 'superadmin' && (
                            <p className="mt-1 text-xs text-red-500">
                              ⚠️ Super Admins have full access to the entire system. Assign with caution.
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    {selectedUser ? 'Update' : 'Create'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowUserModal(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuperAdminDashboard;