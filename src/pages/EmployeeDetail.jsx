import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { toast } from 'react-toastify';
import { 
  FiUser, FiClock, FiCalendar, FiArrowLeft, 
  FiCoffee, FiPieChart, FiBarChart2, FiTrendingUp, FiFileText, FiMail
} from 'react-icons/fi';
import OfferLetterForm from '../components/OfferLetterForm';

const EmployeeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [employee, setEmployee] = useState(null);
  const [timeLogs, setTimeLogs] = useState([]);
  const [stats, setStats] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [showOfferForm, setShowOfferForm] = useState(false);
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/api/employees/${id}/details`);
        setEmployee(data.employee);
        setTimeLogs(data.timeLogs);
        setStats(data.stats);
      } catch (error) {
        console.error('Error fetching employee details:', error);
        toast.error(error.response?.data?.message || 'Failed to fetch employee details');
        navigate('/employees');
      } finally {
        setLoading(false);
      }
    };

    const fetchEmployeeOffers = async () => {
      try {
        const { data } = await api.get(`/api/offers/employee/${id}`);
        setOffers(data);
      } catch (error) {
        // Don't toast here, not critical
      }
    };

    fetchEmployeeDetails();
    fetchEmployeeOffers();
  }, [id, navigate]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const formatTime = (dateString) => {
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleTimeString('en-US', options);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-3 text-gray-700">Loading employee details...</span>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center py-8">
          <h2 className="text-xl font-semibold text-gray-800">Employee not found</h2>
          <Link
            to="/employees"
            className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <FiArrowLeft className="mr-2" />
            Back to Employees
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Link
          to="/employees"
          className="mr-4 text-blue-600 hover:text-blue-800"
        >
          <FiArrowLeft size={20} />
        </Link>
        <h1 className="text-3xl font-bold text-gray-800">Employee Details</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <FiUser className="text-blue-600 text-xl" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">{employee.name}</h2>
              <p className="text-gray-600">ID: {employee.employeeId}</p>
            </div>
          </div>
          <div>
            <span className={`px-3 py-1 rounded-full text-sm ${
              employee.role === 'admin' 
                ? 'bg-purple-100 text-purple-800' 
                : 'bg-blue-100 text-blue-800'
            }`}>
              {employee.role.charAt(0).toUpperCase() + employee.role.slice(1)}
            </span>
            <p className="text-sm text-gray-500 mt-2">Joined: {formatDate(employee.createdAt)}</p>
          </div>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-4">
        <nav className="flex border-b">
          <button
            className={`py-4 px-6 focus:outline-none ${
              activeTab === 'overview'
                ? 'border-b-2 border-blue-500 text-blue-600 font-medium'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`py-4 px-6 focus:outline-none ${
              activeTab === 'time-logs'
                ? 'border-b-2 border-blue-500 text-blue-600 font-medium'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('time-logs')}
          >
            Time Logs
          </button>
          <button
            className={`py-4 px-6 focus:outline-none ${
              activeTab === 'break-analysis'
                ? 'border-b-2 border-blue-500 text-blue-600 font-medium'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('break-analysis')}
          >
            Break Analysis
          </button>
          <button
            className={`py-4 px-6 focus:outline-none ${
              activeTab === 'offers'
                ? 'border-b-2 border-blue-500 text-blue-600 font-medium'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('offers')}
          >
            Offer Letters
          </button>
        </nav>
        <button
          className="ml-auto flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          onClick={() => setShowOfferForm(true)}
        >
          <FiFileText className="mr-2" />
          Generate Offer Letter
        </button>
      </div>

      {activeTab === 'overview' && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Today</h3>
                <FiClock className="text-blue-600 text-xl" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Hours:</span>
                  <span className="text-lg font-semibold text-gray-800">{stats.today.total} hrs</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Break Time:</span>
                  <span className="text-lg font-semibold text-yellow-600">{stats.today.breaks} hrs</span>
                </div>
                <div className="flex justify-between items-center border-t pt-2">
                  <span className="text-sm text-gray-600">Net Working:</span>
                  <span className="text-lg font-semibold text-blue-600">{stats.today.net} hrs</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">This Week</h3>
                <FiCalendar className="text-green-600 text-xl" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Hours:</span>
                  <span className="text-lg font-semibold text-gray-800">{stats.week.total} hrs</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Break Time:</span>
                  <span className="text-lg font-semibold text-yellow-600">{stats.week.breaks} hrs</span>
                </div>
                <div className="flex justify-between items-center border-t pt-2">
                  <span className="text-sm text-gray-600">Net Working:</span>
                  <span className="text-lg font-semibold text-green-600">{stats.week.net} hrs</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">This Month</h3>
                <FiCalendar className="text-purple-600 text-xl" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Hours:</span>
                  <span className="text-lg font-semibold text-gray-800">{stats.month.total} hrs</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Break Time:</span>
                  <span className="text-lg font-semibold text-yellow-600">{stats.month.breaks} hrs</span>
                </div>
                <div className="flex justify-between items-center border-t pt-2">
                  <span className="text-sm text-gray-600">Net Working:</span>
                  <span className="text-lg font-semibold text-purple-600">{stats.month.net} hrs</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">All Time</h3>
                <FiTrendingUp className="text-red-600 text-xl" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Hours:</span>
                  <span className="text-lg font-semibold text-gray-800">{stats.allTime.total} hrs</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Break Time:</span>
                  <span className="text-lg font-semibold text-yellow-600">{stats.allTime.breaks} hrs</span>
                </div>
                <div className="flex justify-between items-center border-t pt-2">
                  <span className="text-sm text-gray-600">Net Working:</span>
                  <span className="text-lg font-semibold text-red-600">{stats.allTime.net} hrs</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <FiClock className="text-blue-600 text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Avg. Daily Hours</p>
                <p className="text-2xl font-bold text-blue-600">{stats.avgDailyHours}</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
              <div className="bg-yellow-100 p-3 rounded-full mr-4">
                <FiCoffee className="text-yellow-600 text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Avg. Break Time</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.avgBreakTime}</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <FiCalendar className="text-green-600 text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Days Worked</p>
                <p className="text-2xl font-bold text-green-600">{stats.totalDaysWorked}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'time-logs' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Time Log History</h2>
          </div>
          
          {timeLogs.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Date</th>
                    <th className="py-3 px-6 text-left">Clock In</th>
                    <th className="py-3 px-6 text-left">Clock Out</th>
                    <th className="py-3 px-6 text-right">Total Hours</th>
                    <th className="py-3 px-6 text-right">Break Time</th>
                    <th className="py-3 px-6 text-right">Net Hours</th>
                    <th className="py-3 px-6 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm">
                  {timeLogs.map((log) => (
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
      )}

      {activeTab === 'break-analysis' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Break Analysis</h2>
            <FiPieChart className="text-purple-600 text-xl" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-yellow-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Morning Breaks</h3>
              <p className="text-3xl font-bold text-yellow-600">{stats.breakDistribution.morning} hrs</p>
              <p className="text-sm text-gray-600 mt-1">Before 12:00 PM</p>
            </div>

            <div className="bg-orange-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Afternoon Breaks</h3>
              <p className="text-3xl font-bold text-orange-600">{stats.breakDistribution.afternoon} hrs</p>
              <p className="text-sm text-gray-600 mt-1">12:00 PM - 5:00 PM</p>
            </div>

            <div className="bg-red-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Evening Breaks</h3>
              <p className="text-3xl font-bold text-red-600">{stats.breakDistribution.evening} hrs</p>
              <p className="text-sm text-gray-600 mt-1">After 5:00 PM</p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Break Distribution</h3>
            <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
              {stats.breakDistribution.morning + 
                stats.breakDistribution.afternoon + 
                stats.breakDistribution.evening > 0 ? (
                <>
                  <div 
                    className="h-full bg-yellow-500 float-left" 
                    style={{ 
                      width: `${(stats.breakDistribution.morning / 
                        (stats.breakDistribution.morning + 
                        stats.breakDistribution.afternoon + 
                        stats.breakDistribution.evening)) * 100}%` 
                    }}
                  ></div>
                  <div 
                    className="h-full bg-orange-500 float-left" 
                    style={{ 
                      width: `${(stats.breakDistribution.afternoon / 
                        (stats.breakDistribution.morning + 
                        stats.breakDistribution.afternoon + 
                        stats.breakDistribution.evening)) * 100}%` 
                    }}
                  ></div>
                  <div 
                    className="h-full bg-red-500 float-left" 
                    style={{ 
                      width: `${(stats.breakDistribution.evening / 
                        (stats.breakDistribution.morning + 
                        stats.breakDistribution.afternoon + 
                        stats.breakDistribution.evening)) * 100}%` 
                    }}
                  ></div>
                </>
              ) : (
                <div className="h-full bg-gray-300" style={{ width: '100%' }}></div>
              )}
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-600">
              <span>Morning</span>
              <span>Afternoon</span>
              <span>Evening</span>
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Breaks</h3>
            {timeLogs.some(log => log.breaks && log.breaks.length > 0) ? (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                      <th className="py-3 px-6 text-left">Date</th>
                      <th className="py-3 px-6 text-left">Start Time</th>
                      <th className="py-3 px-6 text-left">End Time</th>
                      <th className="py-3 px-6 text-right">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 text-sm">
                    {timeLogs
                      .filter(log => log.breaks && log.breaks.length > 0)
                      .slice(0, 5)
                      .flatMap(log => 
                        log.breaks.map((breakItem, index) => (
                          <tr key={`${log._id}-${index}`} className="border-b border-gray-200 hover:bg-gray-50">
                            <td className="py-3 px-6 text-left whitespace-nowrap">
                              {formatDate(log.loginTime)}
                            </td>
                            <td className="py-3 px-6 text-left">
                              {formatTime(breakItem.startTime)}
                            </td>
                            <td className="py-3 px-6 text-left">
                              {breakItem.endTime ? formatTime(breakItem.endTime) : '---'}
                            </td>
                            <td className="py-3 px-6 text-right">
                              {breakItem.duration ? breakItem.duration.toFixed(2) : '---'} hrs
                            </td>
                          </tr>
                        ))
                      )
                    }
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-4 text-gray-500">No break records found</div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'offers' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <FiFileText className="mr-2" /> Offer Letters
          </h2>
          {offers.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Position</th>
                    <th className="py-3 px-6 text-left">Sent On</th>
                    <th className="py-3 px-6 text-left">Start Date</th>
                    <th className="py-3 px-6 text-left">Status</th>
                    <th className="py-3 px-6 text-left">To</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm">
                  {offers.map((offer) => (
                    <tr key={offer._id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-3 px-6 text-left">{offer.offerDetails.position}</td>
                      <td className="py-3 px-6 text-left">{formatDate(offer.offerDetails.sentDate || offer.createdAt)}</td>
                      <td className="py-3 px-6 text-left">
                        {offer.offerDetails.startDate ? formatDate(offer.offerDetails.startDate) : '--'}
                      </td>
                      <td className="py-3 px-6 text-left">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          offer.status === 'accepted' ? 'bg-green-100 text-green-800'
                            : offer.status === 'declined' ? 'bg-red-100 text-red-800'
                            : offer.status === 'expired' ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {offer.status.charAt(0).toUpperCase() + offer.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-3 px-6 text-left">
                        <span className="flex items-center">
                          <FiMail className="mr-1" />
                          {offer.offerDetails.recipientEmail}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-4 text-gray-500">
              No offer letters found for this employee.
            </div>
          )}
        </div>
      )}

      {showOfferForm && (
        <OfferLetterForm 
          employee={employee} 
          onClose={() => {
            setShowOfferForm(false);
            // Refresh offers tab after sending
            api.get(`/api/offers/employee/${id}`).then(({ data }) => setOffers(data));
          }}
        />
      )}

      {/* Date/time indicator in footer */}
      
    </div>
  );
};

export default EmployeeDetail;