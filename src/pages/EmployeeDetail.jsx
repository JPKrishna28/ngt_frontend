import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { toast } from 'react-toastify';
import { 
  FiUser, FiClock, FiCalendar, FiArrowLeft, 
  FiCoffee, FiPieChart, FiBarChart2, FiTrendingUp, FiFileText, FiMail
} from 'react-icons/fi';
// Offer letter form import (assumes you have this component)
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
            {/* ... (overview cards as before) ... */}
            {/* (Omitted for brevity, identical to your existing code) */}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* ... (average and other stats cards as before) ... */}
          </div>
        </div>
      )}

      {activeTab === 'time-logs' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* ... (time logs table as before) ... */}
        </div>
      )}

      {activeTab === 'break-analysis' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* ... (break analysis as before) ... */}
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
      <div className="mt-8 text-center text-xs text-gray-500">
        <p>Date: 2025-05-26 | Time: 12:10:26 UTC</p>
        <p>Current user: JPKrishna28</p>
      </div>
    </div>
  );
};

export default EmployeeDetail;