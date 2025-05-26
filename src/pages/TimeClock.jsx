import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import useAuth from '../hooks/useAuth';
import { toast } from 'react-toastify';
import { FiClock, FiCoffee, FiAlertCircle } from 'react-icons/fi';

const TimeClock = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [activeSession, setActiveSession] = useState(null);
  const [activeBreak, setActiveBreak] = useState(null);
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState(new Date());
  const [stats, setStats] = useState({
    totalHoursToday: 0,
    totalBreakHours: 0,
    netWorkHours: 0,
  });

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch active session on load
  useEffect(() => {
    const fetchActiveSession = async () => {
      try {
        setLoading(true);
        const { data } = await api.get('/api/timelogs/me');
        
        // Find active session if any
        const active = data.find(log => log.status === 'active');
        if (active) {
          setActiveSession(active);
          
          // Find active break if any
          const currentBreak = active.breaks?.find(b => b.status === 'active');
          if (currentBreak) {
            setActiveBreak(currentBreak);
          }
          
          // Calculate stats
          setStats({
            totalHoursToday: calculateHoursElapsed(new Date(active.loginTime), new Date()),
            totalBreakHours: active.totalBreakHours || 0,
            netWorkHours: calculateHoursElapsed(new Date(active.loginTime), new Date()) - (active.totalBreakHours || 0)
          });
        }
      } catch (error) {
        console.error('Error fetching active session:', error);
        toast.error('Failed to fetch active session');
      } finally {
        setLoading(false);
      }
    };

    fetchActiveSession();
  }, []);

  // Calculate hours elapsed between two dates
  const calculateHoursElapsed = (startDate, endDate) => {
    const diffMs = endDate - startDate;
    return parseFloat((diffMs / (1000 * 60 * 60)).toFixed(2));
  };

  // Clock in handler
  const handleClockIn = async () => {
    try {
      setLoading(true);
      const { data } = await api.post('/api/timelogs/login');
      setActiveSession(data);
      toast.success('Successfully clocked in');
    } catch (error) {
      console.error('Clock in error:', error);
      toast.error(error.response?.data?.message || 'Failed to clock in');
    } finally {
      setLoading(false);
    }
  };

  // Clock out handler
  const handleClockOut = async () => {
    if (activeBreak) {
      toast.error('Please end your break before clocking out');
      return;
    }

    if (window.confirm('Are you sure you want to clock out?')) {
      try {
        setLoading(true);
        await api.put('/api/timelogs/logout');
        setActiveSession(null);
        toast.success('Successfully clocked out');
        navigate('/dashboard');
      } catch (error) {
        console.error('Clock out error:', error);
        toast.error(error.response?.data?.message || 'Failed to clock out');
      } finally {
        setLoading(false);
      }
    }
  };

  // Start break handler
  const handleStartBreak = async () => {
    try {
      setLoading(true);
      const { data } = await api.post('/api/timelogs/break/start');
      setActiveSession(data);
      const newBreak = data.breaks.find(b => b.status === 'active');
      setActiveBreak(newBreak);
      toast.success('Break started');
    } catch (error) {
      console.error('Start break error:', error);
      toast.error(error.response?.data?.message || 'Failed to start break');
    } finally {
      setLoading(false);
    }
  };

  // End break handler
  const handleEndBreak = async () => {
    try {
      setLoading(true);
      const { data } = await api.put('/api/timelogs/break/end');
      setActiveSession(data);
      setActiveBreak(null);
      setStats({
        totalHoursToday: calculateHoursElapsed(new Date(data.loginTime), new Date()),
        totalBreakHours: data.totalBreakHours || 0,
        netWorkHours: calculateHoursElapsed(new Date(data.loginTime), new Date()) - (data.totalBreakHours || 0)
      });
      toast.success('Break ended');
    } catch (error) {
      console.error('End break error:', error);
      toast.error(error.response?.data?.message || 'Failed to end break');
    } finally {
      setLoading(false);
    }
  };

  // Format time as HH:MM:SS
  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  };

  // Format date as Month DD, YYYY
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Time Clock</h1>
        <p className="text-gray-600 mt-2">
          {formatDate(time)} | {formatTime(time)}
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-6">
          <div className="flex items-center mb-4 md:mb-0">
            <FiClock className="text-blue-600 text-4xl mr-4" />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {activeSession
                  ? 'Currently Clocked In'
                  : 'Not Clocked In'}
              </h2>
              {activeSession && (
                <p className="text-gray-600">
                  Since: {formatTime(new Date(activeSession.loginTime))}
                </p>
              )}
            </div>
          </div>
          
          {activeSession && activeBreak && (
            <div className="flex items-center text-yellow-600 bg-yellow-50 px-4 py-2 rounded-md">
              <FiCoffee className="mr-2" />
              <span>On Break</span>
            </div>
          )}
        </div>

        {activeSession && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-md">
              <p className="text-sm text-gray-600">Total Hours Today</p>
              <p className="text-2xl font-bold text-blue-600">
                {calculateHoursElapsed(new Date(activeSession.loginTime), time).toFixed(2)}
              </p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-md">
              <p className="text-sm text-gray-600">Break Time</p>
              <p className="text-2xl font-bold text-yellow-600">
                {activeBreak 
                  ? ((activeSession.totalBreakHours || 0) + calculateHoursElapsed(new Date(activeBreak.startTime), time)).toFixed(2)
                  : (activeSession.totalBreakHours || 0).toFixed(2)}
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-md">
              <p className="text-sm text-gray-600">Net Working Hours</p>
              <p className="text-2xl font-bold text-green-600">
                {activeBreak
                  ? (calculateHoursElapsed(new Date(activeSession.loginTime), time) - 
                     ((activeSession.totalBreakHours || 0) + calculateHoursElapsed(new Date(activeBreak.startTime), time))).toFixed(2)
                  : (calculateHoursElapsed(new Date(activeSession.loginTime), time) - (activeSession.totalBreakHours || 0)).toFixed(2)}
              </p>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-4 justify-center">
          {!activeSession && (
            <button
              onClick={handleClockIn}
              disabled={loading}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50"
            >
              Clock In
            </button>
          )}

          {activeSession && !activeBreak && (
            <>
              <button
                onClick={handleStartBreak}
                disabled={loading}
                className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 disabled:opacity-50"
              >
                Start Break
              </button>

              <button
                onClick={handleClockOut}
                disabled={loading}
                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50"
              >
                Clock Out
              </button>
            </>
          )}

          {activeSession && activeBreak && (
            <button
              onClick={handleEndBreak}
              disabled={loading}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            >
              End Break
            </button>
          )}
        </div>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-md">
        <div className="flex">
          <div className="flex-shrink-0">
            <FiAlertCircle className="h-5 w-5 text-blue-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              <strong>Note:</strong> Please remember to track your breaks by using the "Start Break" and "End Break" buttons.
            </p>
          </div>
        </div>
      </div>

      {/* Date/time indicator in footer */}
      
    </div>
  );
};

export default TimeClock;