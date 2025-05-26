import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import useAuth from '../hooks/useAuth';
import { FiClock, FiCalendar, FiInfo, FiCoffee } from 'react-icons/fi';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const { auth } = useAuth();
  const [timeLogs, setTimeLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    today: 0,
    todayBreaks: 0,
    todayNet: 0,
    week: 0,
    weekBreaks: 0,
    weekNet: 0,
    month: 0,
    monthBreaks: 0,
    monthNet: 0,
  });
  
  useEffect(() => {
    const fetchTimeLogs = async () => {
      try {
        const { data } = await api.get('/api/timelogs/me');
        setTimeLogs(data);
        
        // Calculate stats
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
    let todayBreaks = 0;
    let todayNet = 0;
    let weekHours = 0;
    let weekBreaks = 0;
    let weekNet = 0;
    let monthHours = 0;
    let monthBreaks = 0;
    let monthNet = 0;
    
    logs.forEach((log) => {
      const logDate = new Date(log.loginTime);
      
      if (log.status === 'completed') {
        if (logDate >= today) {
          todayHours += log.totalHours || 0;
          todayBreaks += log.totalBreakHours || 0;
          todayNet += log.netWorkHours || 0;
        }
        
        if (logDate >= oneWeekAgo) {
          weekHours += log.totalHours || 0;
          weekBreaks += log.totalBreakHours || 0;
          weekNet += log.netWorkHours || 0;
        }
        
        if (logDate >= oneMonthAgo) {
          monthHours += log.totalHours || 0;
          monthBreaks += log.totalBreakHours || 0;
          monthNet += log.netWorkHours || 0;
        }
      }
    });
    
    setStats({
      today: todayHours.toFixed(2),
      todayBreaks: todayBreaks.toFixed(2),
      todayNet: todayNet.toFixed(2),
      week: weekHours.toFixed(2),
      weekBreaks: weekBreaks.toFixed(2),
      weekNet: weekNet.toFixed(2),
      month: monthHours.toFixed(2),
      monthBreaks: monthBreaks.toFixed(2),
      monthNet: monthNet.toFixed(2),
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
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Today</h2>
            <FiClock className="text-blue-600 text-xl" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total:</span>
              <span className="text-lg font-semibold text-gray-800">{stats.today} hrs</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Breaks:</span>
              <span className="text-lg font-semibold text-yellow-600">{stats.todayBreaks} hrs</span>
            </div>
            <div className="flex justify-between items-center border-t pt-2">
              <span className="text-sm text-gray-600">Net:</span>
              <span className="text-lg font-semibold text-blue-600">{stats.todayNet} hrs</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">This Week</h2>
            <FiCalendar className="text-green-600 text-xl" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total:</span>
              <span className="text-lg font-semibold text-gray-800">{stats.week} hrs</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Breaks:</span>
              <span className="text-lg font-semibold text-yellow-600">{stats.weekBreaks} hrs</span>
            </div>
            <div className="flex justify-between items-center border-t pt-2">
              <span className="text-sm text-gray-600">Net:</span>
              <span className="text-lg font-semibold text-green-600">{stats.weekNet} hrs</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">This Month</h2>
            <FiCalendar className="text-purple-600 text-xl" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total:</span>
              <span className="text-lg font-semibold text-gray-800">{stats.month} hrs</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Breaks:</span>
              <span className="text-lg font-semibold text-yellow-600">{stats.monthBreaks} hrs</span>
            </div>
            <div className="flex justify-between items-center border-t pt-2">
              <span className="text-sm text-gray-600">Net:</span>
              <span className="text-lg font-semibold text-purple-600">{stats.monthNet} hrs</span>
            </div>
          </div>
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
                  <th className="py-3 px-6 text-right">Total</th>
                  <th className="py-3 px-6 text-right">Breaks</th>
                  <th className="py-3 px-6 text-right">Net</th>
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
                      {log.totalBreakHours > 0 ? (
                        <span className="flex items-center justify-end">
                          <FiCoffee className="mr-1 text-yellow-500" />
                          {log.totalBreakHours.toFixed(2)}
                        </span>
                      ) : '0.00'}
                    </td>
                    <td className="py-3 px-6 text-right">
                      {log.netWorkHours > 0 ? log.netWorkHours.toFixed(2) : '---'}
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
          </div>
        ) : (
          <div className="text-center py-4 text-gray-500">No time logs found</div>
        )}
      </div>
      
      {/* Date/time indicator in footer */}
     
    </div>
  );
};

export default Dashboard;