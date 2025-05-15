import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { 
  Calendar, 
  Home, 
  User, 
  Heart, 
  PanelBottomClose, 
  PillIcon,
  Info,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useAppContext } from '../../hooks/useAppContext';

const Navigation: React.FC = () => {
  const { logout, isAuthenticated } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!isAuthenticated) {
    return null;
  }

  const isActive = (path: string) => {
    return location.pathname === path ? 'text-rose-500' : 'text-gray-600';
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-50 md:hidden bg-white rounded-full p-2 shadow-md"
      >
        {isSidebarOpen ? (
          <X className="w-6 h-6 text-gray-600" />
        ) : (
          <Menu className="w-6 h-6 text-gray-600" />
        )}
      </button>

      {/* Sidebar */}
      <div 
        className={`fixed top-0 left-0 h-screen bg-white border-r border-gray-200 py-8 px-4 transition-all duration-300 z-40 w-64 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 shadow-lg`}
      >
        <div className="mb-10 text-center">
          <h1 className="text-2xl font-semibold text-rose-500">Luna</h1>
          <p className="text-gray-500 text-sm">Menstrual Cycle Tracker</p>
        </div>
        
        <nav className="flex-1 space-y-2">
          <Link 
            to="/" 
            className={`flex items-center px-4 py-3 rounded-lg hover:bg-rose-50 transition-colors ${isActive('/')}`}
            onClick={() => setIsSidebarOpen(false)}
          >
            <Home className="w-5 h-5 mr-3" />
            <span>Dashboard</span>
          </Link>
          
          <Link 
            to="/calendar" 
            className={`flex items-center px-4 py-3 rounded-lg hover:bg-rose-50 transition-colors ${isActive('/calendar')}`}
            onClick={() => setIsSidebarOpen(false)}
          >
            <Calendar className="w-5 h-5 mr-3" />
            <span>Calendar</span>
          </Link>
          
          <Link 
            to="/tracking" 
            className={`flex items-center px-4 py-3 rounded-lg hover:bg-rose-50 transition-colors ${isActive('/tracking')}`}
            onClick={() => setIsSidebarOpen(false)}
          >
            <Heart className="w-5 h-5 mr-3" />
            <span>Mood & Symptoms</span>
          </Link>
          
          <Link 
            to="/medications" 
            className={`flex items-center px-4 py-3 rounded-lg hover:bg-rose-50 transition-colors ${isActive('/medications')}`}
            onClick={() => setIsSidebarOpen(false)}
          >
            <PillIcon className="w-5 h-5 mr-3" />
            <span>Medications</span>
          </Link>
          
          <Link 
            to="/mindfulness" 
            className={`flex items-center px-4 py-3 rounded-lg hover:bg-rose-50 transition-colors ${isActive('/mindfulness')}`}
            onClick={() => setIsSidebarOpen(false)}
          >
            <PanelBottomClose className="w-5 h-5 mr-3" />
            <span>Mindfulness</span>
          </Link>
          
          <Link 
            to="/tips" 
            className={`flex items-center px-4 py-3 rounded-lg hover:bg-rose-50 transition-colors ${isActive('/tips')}`}
            onClick={() => setIsSidebarOpen(false)}
          >
            <Info className="w-5 h-5 mr-3" />
            <span>Health Tips</span>
          </Link>
        </nav>
        
        <div className="mt-auto space-y-2">
          <Link 
            to="/profile" 
            className={`flex items-center px-4 py-3 rounded-lg hover:bg-rose-50 transition-colors ${isActive('/profile')}`}
            onClick={() => setIsSidebarOpen(false)}
          >
            <User className="w-5 h-5 mr-3" />
            <span>Profile</span>
          </Link>
          
          <button 
            onClick={() => {
              handleLogout();
              setIsSidebarOpen(false);
            }}
            className="flex items-center w-full px-4 py-3 rounded-lg hover:bg-rose-50 text-gray-600 transition-colors"
          >
            <LogOut className="w-5 h-5 mr-3" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Navigation;