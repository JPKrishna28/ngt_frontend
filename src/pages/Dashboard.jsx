import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import useAuth from '../hooks/useAuth';
import { FiClock, FiCalendar, FiInfo } from 'react-icons/fi';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const { auth } = useAuth();
  const [timeLogs, setTimeLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    today: 0,
    todayAdjusted: 0,
    week: 0,
    weekAdjusted: 0,
    month: 0,
    monthAdjusted: 0,
  });
  
  useEffect(() => {
    const fetchTimeLogs = async () => {
      try {
        const { data } = await api.get('/api/timelogs/me');
        setTimeLogs(data);
        
        // Calculate stats with adjusted hours
        calculateStats(data);
      } catch (error) {
        console.error('Error fetching time logs:', error);
        toast.error('Failed to fetch time logs');
      } finally {
        setLoading(false);
      }
    };
    
    fetchTimeLogs();
  }, []);
  
  const calculateStats = (logs) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const oneWeekAgo = new Date(today);
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const oneMonthAgo = new Date(today);
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    
    let todayHours = 0;
    let todayAdjustedHours = 0;
    let weekHours = 0;
    let weekAdjustedHours = 0;
    let monthHours = 0;
    let monthAdjustedHours = 0;
    
    logs.forEach((log) => {
      const logDate = new Date(log.loginTime);
      
      if (log.status === 'completed') {
        // Use adjusted hours if available, otherwise use total hours
        const adjustedHours = log.adjustedHours !== undefined ? log.adjustedHours : log.totalHours;
        
        if (logDate >= today) {
          todayHours += log.totalHours;
          todayAdjustedHours += adjustedHours;
        }
        
        if (logDate >= oneWeekAgo) {
          weekHours += log.totalHours;
          weekAdjustedHours += adjustedHours;
        }
        
        if (logDate >= oneMonthAgo) {
          monthHours += log.totalHours;
          monthAdjustedHours += adjustedHours;
        }
      }
    });
    
    setStats({
      today: todayHours.toFixed(2),
      todayAdjusted: todayAdjustedHours.toFixed(2),
      week: weekHours.toFixed(2),
      weekAdjusted: weekAdjustedHours.toFixed(2),
      month: monthHours.toFixed(2),
      monthAdjusted: monthAdjustedHours.toFixed(2),
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
  
  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Employee Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Welcome back, {auth.name} (Employee ID: {auth.employeeId})
        </p>
      </div>
      
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8 rounded-md">
        <div className="flex">
          <div className="flex-shrink-0">
            <FiInfo className="h-5 w-5 text-yellow-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              <strong>Note:</strong> For shifts longer than 5 hours, 1 hour is automatically deducted for lunch break.
            </p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Today</h2>
            <FiClock className="text-blue-600 text-xl" />
          </div>
          <p className="text-3xl font-bold text-blue-600">{stats.todayAdjusted} hrs</p>
          {stats.today !== stats.todayAdjusted && (
            <p className="text-xs text-gray-500 mt-1">
              Total: {stats.today} hrs (Lunch break deducted)
            </p>
          )}
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">This Week</h2>
            <FiCalendar className="text-green-600 text-xl" />
          </div>
          <p className="text-3xl font-bold text-green-600">{stats.weekAdjusted} hrs</p>
          {stats.week !== stats.weekAdjusted && (
            <p className="text-xs text-gray-500 mt-1">
              Total: {stats.week} hrs (Lunch breaks deducted)
            </p>
          )}
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">This Month</h2>
            <FiCalendar className="text-purple-600 text-xl" />
          </div>
          <p className="text-3xl font-bold text-purple-600">{stats.monthAdjusted} hrs</p>
          {stats.month !== stats.monthAdjusted && (
            <p className="text-xs text-gray-500 mt-1">
              Total: {stats.month} hrs (Lunch breaks deducted)
            </p>
          )}
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Recent Time Logs</h2>
          <Link
            to="/time-clock"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Clock In/Out
          </Link>
        </div>
        
        {loading ? (
          <div className="text-center py-4">Loading...</div>
        ) : timeLogs.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Date</th>
                  <th className="py-3 px-6 text-left">Clock In</th>
                  <th className="py-3 px-6 text-left">Clock Out</th>
                  <th className="py-3 px-6 text-right">Worked</th>
                  <th className="py-3 px-6 text-right">Paid</th>
                  <th className="py-3 px-6 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm">
                {timeLogs.slice(0, 10).map((log) => (
                  <tr key={log._id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      {formatDate(log.loginTime)}
                    </td>
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
                    <td className="py-3 px-6 text-center">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          log.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {log.status === 'active' ? 'Active' : 'Completed'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-2 text-xs text-gray-500">
              * Lunch break (1 hour) automatically deducted for shifts over 5 hours
            </div>
          </div>
        ) : (
          <div className="text-center py-4 text-gray-500">No time logs found</div>
        )}
      </div>
      
      {/* Date/time indicator in footer */}
      <div className="mt-8 text-center text-xs text-gray-500">
        <p>Date: 2025-05-23 | Time: 11:05:11 UTC</p>
        <p>Current user: Krizzna69</p>
      </div>
    </div>
  );
};

export default Dashboard;