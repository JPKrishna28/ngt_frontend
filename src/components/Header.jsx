import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FiMenu, FiX, FiLogOut, FiClock, FiUser, FiUsers } from 'react-icons/fi';
import useAuth from '../hooks/useAuth';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link to="/dashboard" className="text-xl font-bold">
            TimeTracker
          </Link>
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/dashboard" className="flex items-center space-x-1 hover:text-blue-200">
            <FiClock />
            <span>Dashboard</span>
          </Link>
          <Link to="/time-clock" className="flex items-center space-x-1 hover:text-blue-200">
            <FiClock />
            <span>Time Clock</span>
          </Link>
          {auth.role === 'admin' && (
            <Link to="/admin" className="flex items-center space-x-1 hover:text-blue-200">
              <FiUsers />
              <span>Admin</span>
            </Link>
          )}
          <Link to="/profile" className="flex items-center space-x-1 hover:text-blue-200">
            <FiUser />
            <span>Profile</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-1 hover:text-blue-200"
          >
            <FiLogOut />
            <span>Logout</span>
          </button>
        </nav>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-blue-500 pb-4">
          <div className="container mx-auto px-4 flex flex-col space-y-3">
            <Link to="/dashboard" className="flex items-center space-x-2 py-2 hover:bg-blue-600 px-3 rounded" onClick={() => setIsOpen(false)}>
              <FiClock />
              <span>Dashboard</span>
            </Link>
            <Link to="/time-clock" className="flex items-center space-x-2 py-2 hover:bg-blue-600 px-3 rounded" onClick={() => setIsOpen(false)}>
              <FiClock />
              <span>Time Clock</span>
            </Link>
            {auth.role === 'admin' && (
              <Link to="/admin" className="flex items-center space-x-2 py-2 hover:bg-blue-600 px-3 rounded" onClick={() => setIsOpen(false)}>
                <FiUsers />
                <span>Admin</span>
              </Link>
            )}
            <Link to="/profile" className="flex items-center space-x-2 py-2 hover:bg-blue-600 px-3 rounded" onClick={() => setIsOpen(false)}>
              <FiUser />
              <span>Profile</span>
            </Link>
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="flex items-center space-x-2 py-2 hover:bg-blue-600 px-3 rounded text-left"
            >
              <FiLogOut />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;