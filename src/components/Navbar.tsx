import { useState, useRef, useEffect } from 'react';
import { Home, User, Mail, Moon, Sun, Clock, LogOut, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { theme, isAutoMode, toggleTheme, toggleAutoMode } = useTheme();
  const { user, signOut } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showAutoTooltip, setShowAutoTooltip] = useState(false);
  const [showMoodTooltip, setShowMoodTooltip] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [flagLoaded, setFlagLoaded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isScrollingDown = prevScrollPos < currentScrollPos;
      const isScrollingUp = prevScrollPos > currentScrollPos;
      const scrollDelta = Math.abs(currentScrollPos - prevScrollPos);

      if (scrollDelta > 5) {
        if (isScrollingDown) {
          setVisible(false);
          setShowMobileMenu(false);
        } else if (isScrollingUp) {
          setVisible(true);
        }
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getMoodMessage = () => {
    if (theme === 'dark') {
      return {
        title: '🌙 Night Owl Mode',
        messages: [
          'grinding that CRS score at 3AM fr fr 💯',
          'PNP application szn, no sleep gang 😤',
          'PR grindset = different breed 🔥'
        ]
      };
    }
    return {
      title: '☀️ Main Character Energy',
      messages: [
        'slay bestie, let\'s chase that PR dream ✨',
        'no cap, you\'re gonna make it fr fr',
        'it\'s giving immigrant success story'
      ]
    };
  };

  const moodInfo = getMoodMessage();

  return (
    <nav 
      className={`
        ${theme === 'dark' 
          ? 'bg-gray-200/10 backdrop-blur-md border-b border-gray-300/10' 
          : 'bg-[rgb(206,191,182)] border-4 border-[rgb(193,177,166)]'
        }
        fixed top-0 left-0 right-0 z-[100]
        transform transition-all duration-300 ease-in-out
        ${visible ? 'translate-y-0' : '-translate-y-full'}
      `}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="flex items-center">
                <div 
                  className={`w-6 h-6 flex-shrink-0 transition-opacity duration-300 ${
                    flagLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Flag_of_Canada_%28Pantone%29.svg"
                    alt="Canadian Flag"
                    className="w-full h-full object-contain"
                    style={{
                      minWidth: '24px',
                      minHeight: '24px',
                      display: 'block'
                    }}
                    onLoad={() => setFlagLoaded(true)}
                    loading="eager"
                    fetchPriority="high"
                  />
                </div>
                <span className="brand-text text-xl pl-2">
                  MyCIP
                </span>
              </div>
            </Link>
          </div>

          {/* Theme Switch Section - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-3">
            <div className="relative">
              <div
                onClick={toggleAutoMode}
                onMouseEnter={() => setShowAutoTooltip(true)}
                onMouseLeave={() => setShowAutoTooltip(false)}
                className={`theme-toggle flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-300 ${
                  theme === 'dark'
                    ? 'hover:bg-gray-300/10'
                    : 'hover:bg-gray-300/50'
                } ${isAutoMode ? 'ring-2 ring-purple-500 auto-mode-active' : ''}`}
              >
                <Clock className={`h-4 w-4 ${isAutoMode ? 'text-purple-500' : 'text-gray-500'}`} />
              </div>

              {showAutoTooltip && (
                <div className="fixed transform -translate-x-1/2 z-[200] tooltip-animate"
                     style={{ left: '50%', top: '100%', marginTop: '0.5rem' }}>
                  <div className="relative">
                    <div className={`${
                      theme === 'dark' 
                        ? 'bg-gray-800/90 backdrop-blur-md border-gray-600/50' 
                        : 'bg-gray-600/90 border-gray-500'
                    } border rounded-[4px] p-2 min-w-[140px] shadow-xl`}>
                      <div className="text-center">
                        <p className={`text-xs font-bold text-gray-100`}>
                          Auto Dark Mode
                        </p>
                        <div className="text-[10px] mt-1 text-gray-200">
                          <p className="font-medium">Light: 6 AM - 6 PM</p>
                          <p className="font-medium">Dark: 6 PM - 6 AM</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <div
                onClick={!isAutoMode ? toggleTheme : undefined}
                onMouseEnter={() => setShowMoodTooltip(true)}
                onMouseLeave={() => setShowMoodTooltip(false)}
                className={`theme-toggle flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-300 ${
                  theme === 'dark'
                    ? 'hover:bg-gray-300/10 text-yellow-300'
                    : 'hover:bg-gray-300/50 text-gray-700'
                } ${!isAutoMode ? 'ring-2 ring-purple-500' : ''} ${isAutoMode ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                {theme === 'dark' ? (
                  <Moon className="h-4 w-4 mood-switch-moon" />
                ) : (
                  <Sun className="h-4 w-4 mood-switch-sun" />
                )}
              </div>

              {showMoodTooltip && (
                <div className="fixed transform -translate-x-1/2 z-[200] tooltip-animate"
                     style={{ left: '50%', top: '100%', marginTop: '0.5rem' }}>
                  <div className="relative">
                    <div className={`${
                      theme === 'dark' 
                        ? 'bg-gray-800/90 backdrop-blur-md border-gray-600/50' 
                        : 'bg-gray-600/90 border-gray-500'
                    } border rounded-[4px] p-2 min-w-[140px] shadow-xl`}>
                      <div className="text-center">
                        <p className={`text-xs font-bold mb-1 text-gray-100`}>
                          {moodInfo.title}
                        </p>
                        <div className="space-y-1 text-gray-200">
                          {moodInfo.messages.map((message, index) => (
                            <p
                              key={index}
                              className="text-[10px] font-medium transform transition-all duration-300"
                              style={{ transitionDelay: `${index * 100}ms` }}
                            >
                              {message}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/"
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                theme === 'dark' 
                  ? 'text-white hover:bg-gray-300/10' 
                  : 'text-gray-700 hover:bg-gray-200'
              } transition-colors`}
            >
              <Home className="h-5 w-5 mr-1" />
              Home
            </Link>
            <Link
              to="/contact"
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                theme === 'dark' 
                  ? 'text-white hover:bg-gray-300/10' 
                  : 'text-gray-700 hover:bg-gray-200'
              } transition-colors`}
            >
              <Mail className="h-5 w-5 mr-1" />
              Contact
            </Link>

            {/* User Profile Section */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className={`flex items-center space-x-2 p-2 rounded-full ${
                  theme === 'dark'
                    ? 'bg-gray-300/10 hover:bg-gray-300/20 text-white'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                } transition-colors`}
              >
                <User className="h-5 w-5" />
                <span className="text-sm font-medium hidden md:block">
                  {user?.email?.split('@')[0] || 'User'}
                </span>
              </button>

              {/* Dropdown Menu */}
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 rounded-md py-1 bg-white dark:bg-gray-800/90 backdrop-blur-md ring-1 ring-black ring-opacity-5 z-[200] shadow-xl">
                  <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200">
                    <p className="font-medium">Signed in as</p>
                    <p className="truncate">{user?.email || 'User'}</p>
                  </div>
                  <hr className={theme === 'dark' ? 'border-gray-600/50' : 'border-gray-200'} />
                  <button
                    onClick={signOut}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className={`p-2 rounded-md ${
                theme === 'dark' 
                  ? 'text-white hover:bg-gray-300/10' 
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              {showMobileMenu ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {showMobileMenu && (
          <div className="md:hidden pb-3 space-y-1">
            <Link
              to="/"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                theme === 'dark' 
                  ? 'text-white hover:bg-gray-300/10' 
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setShowMobileMenu(false)}
            >
              <Home className="h-5 w-5 inline-block mr-2" />
              Home
            </Link>
            <Link
              to="/contact"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                theme === 'dark' 
                  ? 'text-white hover:bg-gray-300/10' 
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setShowMobileMenu(false)}
            >
              <Mail className="h-5 w-5 inline-block mr-2" />
              Contact
            </Link>
            <div className="px-3 py-2">
              <div className="flex items-center space-x-4">
                <div
                  onClick={toggleAutoMode}
                  className={`theme-toggle flex items-center justify-center w-8 h-8 rounded-full ${
                    theme === 'dark'
                      ? 'hover:bg-gray-300/10'
                      : 'hover:bg-gray-300/50'
                  } ${isAutoMode ? 'ring-2 ring-purple-500' : ''}`}
                >
                  <Clock className={`h-4 w-4 ${isAutoMode ? 'text-purple-500' : 'text-gray-500'}`} />
                </div>
                <div
                  onClick={!isAutoMode ? toggleTheme : undefined}
                  className={`theme-toggle flex items-center justify-center w-8 h-8 rounded-full ${
                    theme === 'dark'
                      ? 'hover:bg-gray-300/10 text-yellow-300'
                      : 'hover:bg-gray-300/50 text-gray-700'
                  } ${!isAutoMode ? 'ring-2 ring-purple-500' : ''}`}
                >
                  {theme === 'dark' ? (
                    <Moon className="h-4 w-4" />
                  ) : (
                    <Sun className="h-4 w-4" />
                  )}
                </div>
              </div>
            </div>
            <button
              onClick={signOut}
              className={`w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                theme === 'dark' 
                  ? 'text-white hover:bg-gray-300/10' 
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              <LogOut className="h-5 w-5 inline-block mr-2" />
              Sign out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}