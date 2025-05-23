import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../api/axios';
import useAuth from '../hooks/useAuth';
import { FiLogIn, FiLogOut, FiClock } from 'react-icons/fi';

const TimeClock = () => {
  const { auth } = useAuth();
  const [activeSession, setActiveSession] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [activeTime, setActiveTime] = useState('0:00:00');
  
  // Check if there's an active session
  useEffect(() => {
    const fetchActiveSession = async () => {
      try {
        const { data } = await api.get('/api/timelogs/me');
        const active = data.find((log) => log.status === 'active');
        
        if (active) {
          setActiveSession(active);
        }
      } catch (error) {
        console.error('Error fetching active session:', error);
      }
    };
    
    fetchActiveSession();
  }, []);
  
  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      
      if (activeSession) {
        const loginTime = new Date(activeSession.loginTime);
        const diff = new Date() - loginTime;
        
        // Format time as HH:MM:SS
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        setActiveTime(
          `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        );
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, [activeSession]);
  
  const handleClockIn = async () => {
    try {
      setIsLoading(true);
      const { data } = await api.post('/api/timelogs/login');
      setActiveSession(data);
      toast.success('Clocked in successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to clock in');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleClockOut = async () => {
    try {
      setIsLoading(true);
      await api.put('/api/timelogs/logout');
      setActiveSession(null);
      toast.success('Clocked out successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to clock out');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Time Clock</h1>
        <p className="text-gray-600">
          Welcome, {auth.name} (ID: {auth.employeeId})
        </p>
      </div>
      
      <div className="flex flex-col items-center mb-8">
        <div className="text-5xl font-bold mb-4 text-gray-800">
          {currentTime.toLocaleTimeString()}
        </div>
        <div className="text-lg text-gray-600">
          {currentTime.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </div>
      </div>
      
      {activeSession ? (
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <div className="flex items-center justify-center mb-3">
            <FiClock className="text-blue-600 mr-2" />
            <span className="font-medium">Active Session</span>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">{activeTime}</div>
            <p className="text-sm text-gray-600">
              Started at:{' '}
              {new Date(activeSession.loginTime).toLocaleString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600 mb-6">You're currently not clocked in</p>
      )}
      
      <div className="flex justify-center">
        {activeSession ? (
          <button
            onClick={handleClockOut}
            disabled={isLoading}
            className="flex items-center px-6 py-3 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 disabled:opacity-50"
          >
            <FiLogOut className="mr-2" />
            Clock Out
          </button>
        ) : (
          <button
            onClick={handleClockIn}
            disabled={isLoading}
            className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50"
          >
            <FiLogIn className="mr-2" />
            Clock In
          </button>
        )}
      </div>
    </div>
  );
};

export default TimeClock;