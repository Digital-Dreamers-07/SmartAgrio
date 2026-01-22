import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Sprout, Menu, X, User, LogOut, Settings, Bell,
  Home, Cloud, Bug, Droplets, TrendingUp, MessageSquare
} from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinks = [
    { path: '/dashboard', label: 'Dashboard', icon: Home },
    { path: '/crops', label: 'Crops', icon: Sprout },
    { path: '/weather', label: 'Weather', icon: Cloud },
    { path: '/disease', label: 'Disease', icon: Bug },
    { path: '/irrigation', label: 'Irrigation', icon: Droplets },
    { path: '/market', label: 'Market', icon: TrendingUp },
    { path: '/chatbot', label: 'Chatbot', icon: MessageSquare },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/dashboard" className="navbar-logo">
          <div className="logo-icon-wrapper">
            <Sprout size={28} strokeWidth={2.5} />
          </div>
          <span className="logo-text">SmartFarm AI</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="navbar-links desktop-only">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
              >
                <Icon size={18} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Right Side Actions */}
        <div className="navbar-actions">
          {/* Notifications */}
          <button className="icon-btn">
            <Bell size={20} />
            <span className="notification-dot"></span>
          </button>

          {/* Profile Dropdown */}
          <div className="profile-dropdown">
            <button
              className="profile-btn"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              <div className="profile-avatar">
                <User size={20} />
              </div>
              <div className="profile-info desktop-only">
                <div className="profile-name">{user?.name}</div>
                <div className="profile-location">{user?.location?.state}</div>
              </div>
            </button>

            {/* Dropdown Menu */}
            {showProfileMenu && (
              <div className="dropdown-menu animate-slide-down">
                <div className="dropdown-header">
                  <div className="dropdown-user-info">
                    <div className="dropdown-name">{user?.name}</div>
                    <div className="dropdown-email">{user?.email}</div>
                  </div>
                </div>
                <div className="dropdown-divider"></div>
                <Link
                  to="/profile"
                  className="dropdown-item"
                  onClick={() => setShowProfileMenu(false)}
                >
                  <User size={18} />
                  <span>Profile</span>
                </Link>
                <Link
                  to="/settings"
                  className="dropdown-item"
                  onClick={() => setShowProfileMenu(false)}
                >
                  <Settings size={18} />
                  <span>Settings</span>
                </Link>
                <div className="dropdown-divider"></div>
                <button onClick={handleLogout} className="dropdown-item logout">
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-btn mobile-only"
            onClick={() => setShowMenu(!showMenu)}
          >
            {showMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMenu && (
        <div className="mobile-menu animate-slide-down">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`mobile-menu-item ${isActive(link.path) ? 'active' : ''}`}
                onClick={() => setShowMenu(false)}
              >
                <Icon size={20} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
};

export default Navbar;