import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { toast } from 'react-toastify';
import { 
  FiUser, FiUserPlus, FiEdit2, FiTrash2, FiSearch, 
  FiUpload, FiDownload, FiEye, FiFilter, FiCheck 
} from 'react-icons/fi';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });
  const fileInputRef = useRef();
  const csvTemplateRef = useRef();
  const [formData, setFormData] = useState({
    employeeId: '',
    name: '',
    password: '',
    role: 'employee',
  });
  
  useEffect(() => {
    fetchEmployees();
  }, []);
  
  useEffect(() => {
    let filtered = [...employees];
    
    // Apply role filter
    if (filterRole !== 'all') {
      filtered = filtered.filter(employee => employee.role === filterRole);
    }
    
    // Apply search filter
    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(
        employee => 
          employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          employee.role.toLowerCase().includes(searchTerm.toLowerCase())
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
    
    setFilteredEmployees(filtered);
  }, [searchTerm, employees, filterRole, sortConfig]);
  
  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/api/employees');
      setEmployees(data);
      setFilteredEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
      toast.error(error.response?.data?.message || 'Failed to fetch employees');
    } finally {
      setLoading(false);
    }
  };
  
  const handleOpenModal = (employee = null) => {
    if (employee) {
      setEditMode(true);
      setCurrentEmployee(employee);
      setFormData({
        employeeId: employee.employeeId,
        name: employee.name,
        password: '',
        role: employee.role,
      });
    } else {
      setEditMode(false);
      setCurrentEmployee(null);
      setFormData({
        employeeId: '',
        name: '',
        password: '',
        role: 'employee',
      });
    }
    setShowModal(true);
  };
  
  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentEmployee(null);
    setFormData({
      employeeId: '',
      name: '',
      password: '',
      role: 'employee',
    });
  };
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editMode) {
        // Update employee
        await api.put(`/api/employees/${currentEmployee.employeeId}`, {
          name: formData.name,
          role: formData.role,
          ...(formData.password && { password: formData.password }),
        });
        toast.success('Employee updated successfully');
      } else {
        // Create new employee - using the admin-only register endpoint
        await api.post('/api/auth/register', formData);
        toast.success('Employee created successfully');
      }
      
      // Refresh employee list
      fetchEmployees();
      
      // Close modal
      handleCloseModal();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };
  
  const handleDeleteEmployee = async (employeeId) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await api.delete(`/api/employees/${employeeId}`);
        toast.success('Employee deleted successfully');
        fetchEmployees();
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to delete employee');
      }
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const handleRoleFilter = (role) => {
    setFilterRole(role);
  };
  
  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
  
  // CSV Upload Handler
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleCSVUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);

    try {
      setLoading(true);
      const response = await api.post('/api/employees/upload-csv', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success(`Created: ${response.data.created}, Skipped: ${response.data.skipped}`);
      if (response.data.errors && response.data.errors.length > 0) {
        toast.error('Some entries failed (see console)');
        console.log('CSV Upload Errors:', response.data.errors);
      }
      fetchEmployees();
      // Reset file input
      e.target.value = null;
    } catch (err) {
      toast.error(err.response?.data?.message || 'CSV upload failed');
    } finally {
      setLoading(false);
    }
  };
  
  // CSV Template Download
  const handleTemplateDownload = () => {
    const header = 'employeeId,name,password,role\n';
    const sampleData = 'E001,John Doe,password123,employee\nE002,Jane Smith,secret456,admin\n';
    const csvContent = header + sampleData;
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    csvTemplateRef.current.href = url;
    csvTemplateRef.current.download = 'employee_template.csv';
    csvTemplateRef.current.click();
    
    // Clean up
    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 100);
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-3 text-gray-700">Loading employees...</span>
      </div>
    );
  }
  
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">Employee Management</h1>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full md:w-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
          <button
            onClick={handleOpenModal}
            className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FiUserPlus className="mr-2" />
            Add Employee
          </button>
          <div className="relative">
            <button
              onClick={handleUploadClick}
              className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <FiUpload className="mr-2" />
              Upload CSV
            </button>
            <input
              type="file"
              accept=".csv"
              ref={fileInputRef}
              onChange={handleCSVUpload}
              style={{ display: 'none' }}
            />
          </div>
          
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex space-x-2 mb-2 sm:mb-0">
              <button
                onClick={() => handleRoleFilter('all')}
                className={`px-3 py-1 rounded-md text-sm ${
                  filterRole === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                All
              </button>
              <button
                onClick={() => handleRoleFilter('admin')}
                className={`px-3 py-1 rounded-md text-sm ${
                  filterRole === 'admin'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Admins
              </button>
              <button
                onClick={() => handleRoleFilter('employee')}
                className={`px-3 py-1 rounded-md text-sm ${
                  filterRole === 'employee'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Employees
              </button>
            </div>
            <div className="text-sm text-gray-500">
              {filteredEmployees.length} employee{filteredEmployees.length !== 1 ? 's' : ''} found
            </div>
          </div>
        </div>
        
        {filteredEmployees.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                  <th 
                    className="py-3 px-6 text-left cursor-pointer hover:bg-gray-200"
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
                    className="py-3 px-6 text-left cursor-pointer hover:bg-gray-200"
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
                    className="py-3 px-6 text-left cursor-pointer hover:bg-gray-200"
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
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm">
                {filteredEmployees.map((employee) => (
                  <tr key={employee._id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      <div className="flex items-center">
                        <FiUser className="mr-2 text-gray-500" />
                        {employee.employeeId}
                      </div>
                    </td>
                    <td className="py-3 px-6 text-left">{employee.name}</td>
                    <td className="py-3 px-6 text-left">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          employee.role === 'admin'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {employee.role}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex items-center justify-center space-x-3">
                        <Link
                          to={`/employees/${employee.employeeId}/details`}
                          className="text-green-600 hover:text-green-900 transition-colors"
                          title="View Details"
                        >
                          <FiEye size={18} />
                        </Link>
                        <button
                          onClick={() => handleOpenModal(employee)}
                          className="text-blue-600 hover:text-blue-900 transition-colors"
                          title="Edit"
                        >
                          <FiEdit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteEmployee(employee.employeeId)}
                          className="text-red-600 hover:text-red-900 transition-colors"
                          title="Delete"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-8 text-center text-gray-500">
            {searchTerm || filterRole !== 'all' ? 'No employees match your search criteria' : 'No employees found'}
          </div>
        )}
      </div>
      
      {/* Employee Modal - Add/Edit */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50" onClick={handleCloseModal}></div>
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md z-10 p-6 mx-4">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              {editMode ? 'Edit Employee' : 'Add New Employee'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Employee ID
                </label>
                <input
                  type="text"
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleChange}
                  disabled={editMode}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                />
                {editMode && (
                  <p className="text-xs text-gray-500 mt-1">Employee ID cannot be changed</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password {editMode && '(Leave blank to keep unchanged)'}
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required={!editMode}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="employee">Employee</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {editMode ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Date/time indicator in footer */}
      <div className="mt-8 text-center text-xs text-gray-500">
        <p>Date: 2025-05-26 | Time: 12:22:31 UTC</p>
        <p>Current user: JPKrishna28</p>
      </div>
    </div>
  );
};

export default EmployeeList;