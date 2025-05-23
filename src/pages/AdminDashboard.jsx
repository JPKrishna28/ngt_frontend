import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { FiUsers, FiClock, FiCalendar, FiInfo } from 'react-icons/fi';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    activeEmployees: 0,
    totalHoursToday: 0,
    totalHoursTodayAdjusted: 0,
    totalHoursThisWeek: 0,
    totalHoursThisWeekAdjusted: 0,
  });
  const [recentLogs, setRecentLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch employees
        const employeesRes = await api.get('/api/employees');
        
        // Fetch all time logs
        const logsRes = await api.get('/api/timelogs');
        
        // Calculate stats
        calculateStats(employeesRes.data, logsRes.data);
        
        // Set recent logs
        setRecentLogs(logsRes.data.slice(0, 10));
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);
  
  const calculateStats = (employees, logs) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const oneWeekAgo = new Date(today);
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    // Count active employees (who have active sessions)
    const activeEmployeeIds = new Set(
      logs
        .filter((log) => log.status === 'active')
        .map((log) => log.employeeId)
    );
    
    let hoursToday = 0;
    let hoursTodayAdjusted = 0;
    let hoursThisWeek = 0;
    let hoursThisWeekAdjusted = 0;
    
    logs.forEach((log) => {
      if (log.status === 'completed') {
        const logDate = new Date(log.loginTime);
        const adjustedHours = log.adjustedHours !== undefined ? log.adjustedHours : log.totalHours;
        
        if (logDate >= today) {
          hoursToday += log.totalHours;
          hoursTodayAdjusted += adjustedHours;
        }
        
        if (logDate >= oneWeekAgo) {
          hoursThisWeek += log.totalHours;
          hoursThisWeekAdjusted += adjustedHours;
        }
      }
    });
    
    setStats({
      totalEmployees: employees.length,
      activeEmployees: activeEmployeeIds.size,
      totalHoursToday: hoursToday.toFixed(2),
      totalHoursTodayAdjusted: hoursTodayAdjusted.toFixed(2),
      totalHoursThisWeek: hoursThisWeek.toFixed(2),
      totalHoursThisWeekAdjusted: hoursThisWeekAdjusted.toFixed(2),
    });
  };
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  const formatTime = (dateString) => {
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleTimeString('en-US', options);
  };
  
  if (loading) {
    return <div className="text-center py-8">Loading admin dashboard...</div>;
  }
  
  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Monitor employee time tracking activity</p>
      </div>
      
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8 rounded-md">
        <div className="flex">
          <div className="flex-shrink-0">
            <FiInfo className="h-5 w-5 text-yellow-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              <strong>Lunch Break Policy:</strong> For shifts longer than 5 hours, 1 hour is automatically deducted for lunch break.
            </p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Total Employees</h2>
            <FiUsers className="text-blue-600 text-xl" />
          </div>
          <p className="text-3xl font-bold text-blue-600">{stats.totalEmployees}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Active Now</h2>
            <FiUsers className="text-green-600 text-xl" />
          </div>
          <p className="text-3xl font-bold text-green-600">{stats.activeEmployees}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Hours Today</h2>
            <FiClock className="text-purple-600 text-xl" />
          </div>
          <p className="text-3xl font-bold text-purple-600">{stats.totalHoursTodayAdjusted}</p>
          {stats.totalHoursToday !== stats.totalHoursTodayAdjusted && (
            <p className="text-xs text-gray-500 mt-1">
              Before lunch: {stats.totalHoursToday} hrs
            </p>
          )}
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Hours This Week</h2>
            <FiCalendar className="text-orange-600 text-xl" />
          </div>
          <p className="text-3xl font-bold text-orange-600">{stats.totalHoursThisWeekAdjusted}</p>
          {stats.totalHoursThisWeek !== stats.totalHoursThisWeekAdjusted && (
            <p className="text-xs text-gray-500 mt-1">
              Before lunch: {stats.totalHoursThisWeek} hrs
            </p>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Recent Time Logs</h2>
              <Link
                to="/employees"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                View All Employees
              </Link>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Employee ID</th>
                    <th className="py-3 px-6 text-left">Date</th>
                    <th className="py-3 px-6 text-left">Clock In</th>
                    <th className="py-3 px-6 text-left">Clock Out</th>
                    <th className="py-3 px-6 text-right">Worked</th>
                    <th className="py-3 px-6 text-right">Paid</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm">
                  {recentLogs.length > 0 ? (
                    recentLogs.map((log) => (
                      <tr key={log._id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-3 px-6 text-left">{log.employeeId}</td>
                        <td className="py-3 px-6 text-left">{formatDate(log.loginTime)}</td>
                        <td className="py-3 px-6 text-left">{formatTime(log.loginTime)}</td>
                        <td className="py-3 px-6 text-left">
                          {log.logoutTime ? formatTime(log.logoutTime) : '---'}
                        </td>
                        <td className="py-3 px-6 text-right">
                          {log.totalHours > 0 ? log.totalHours.toFixed(2) : '---'}
                        </td>
                        <td className="py-3 px-6 text-right">
                          {log.adjustedHours !== undefined ? 
                            log.adjustedHours.toFixed(2) : 
                            (log.totalHours > 0 ? log.totalHours.toFixed(2) : '---')}
                          {log.lunchBreakDeducted && <sup>*</sup>}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="py-6 text-center text-gray-500">
                        No time logs found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <div className="mt-2 text-xs text-gray-500">
                * Lunch break (1 hour) automatically deducted for shifts over 5 hours
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Quick Actions</h2>
          
          <div className="flex flex-col space-y-3">
            <Link
              to="/employees"
              className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100"
            >
              <FiUsers className="text-blue-600 mr-3 text-lg" />
              <span>Manage Employees</span>
            </Link>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-800 mb-4">System Status</h3>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600">Server Status</span>
                <span className="flex items-center text-green-600">
                  <span className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></span>
                  Online
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Last Updated</span>
                <span className="text-gray-600">{new Date().toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Date/time indicator in footer */}
      <div className="mt-8 text-center text-xs text-gray-500">
        <p>Date: 2025-05-23 | Time: 11:05:11 UTC</p>
        <p>Current user: Krizzna69</p>
      </div>
    </div>
  );
};

export default AdminDashboard;