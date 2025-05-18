import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MapPin, Loader2, WifiOff, Mail, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import toast, { Toaster } from 'react-hot-toast';

export default function LoginPage() {
  const { user, signInWithEmail } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [networkError, setNetworkError] = useState<string | null>(null);
  const [lastAttempt, setLastAttempt] = useState<number | null>(null);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setNetworkError(null);
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      setNetworkError('You are currently offline. Please check your internet connection.');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    if (user) {
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  }, [user, navigate, location]);

  const validateEmail = (email: string): boolean => {
    if (!email || !email.trim()) {
      setEmailError('Email is required');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return false;
    }

    setEmailError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setNetworkError(null);
    
    if (!isOnline) {
      setNetworkError('You appear to be offline. Please check your internet connection and try again.');
      toast.error('You appear to be offline. Please check your internet connection and try again.');
      return;
    }

    const now = Date.now();
    if (lastAttempt && now - lastAttempt < 10000) {
      toast.error('Please wait a moment before trying again');
      return;
    }
    setLastAttempt(now);

    if (!validateEmail(email)) {
      toast.error(emailError || 'Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { error, message } = await signInWithEmail(email);
      
      if (error) {
        console.error('Login error:', error);
        
        if (error.message && (
            error.message.includes('fetch') || 
            error.message.includes('network') ||
            error.message.includes('Failed to fetch') ||
            error.message.includes('NetworkError')
        )) {
          setNetworkError('Network error. Please check your internet connection and try again.');
          toast.error('Network error. Please check your internet connection and try again.');
        } else {
          toast.error(message || error.message);
        }
      }
    } catch (error: any) {
      console.error('Unexpected error during login:', error);
      toast.error(error.message || 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailError) {
      validateEmail(e.target.value);
    }
  };

  const inputClasses = `mt-1 block w-full px-4 py-3 rounded-lg border-2 shadow-lg 
    backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white
    ${emailError 
      ? 'border-red-300 focus:border-red-500 focus:ring focus:ring-red-200 focus:ring-opacity-50' 
      : theme === 'dark' 
        ? 'border-purple-400/30 focus:border-purple-400 focus:ring focus:ring-purple-300 focus:ring-opacity-50'
        : 'border-pink-200 focus:border-pink-400 focus:ring focus:ring-pink-200 focus:ring-opacity-50'
    }
    transition-all duration-200 ease-in-out`;

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 w-1/2 bg-pink-50 dark:bg-pink-900/20" />
        <div className="absolute inset-0 left-1/2 bg-blue-50 dark:bg-blue-900/20" />
      </div>
      
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-pink-200/30 dark:bg-pink-500/10 rounded-full filter blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-200/30 dark:bg-blue-500/10 rounded-full filter blur-3xl" />

      {!isOnline && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-red-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center space-x-2 animate-pulse">
          <WifiOff className="h-4 w-4" />
          <span className="text-sm font-medium">You are offline</span>
        </div>
      )}

      <Toaster position="top-center" />
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center">
          <div className="transform transition-transform duration-500 animate-bounce">
            <MapPin className={`h-12 w-12 ${theme === 'dark' ? 'text-purple-400' : 'text-pink-400'}`} />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl brand-text">
          Welcome to MyCIP
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Your gateway to <span className="text-red-600">C</span>anadian <span className="text-red-600">I</span>mmigration <span className="text-red-600">P</span>athways
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="backdrop-blur-lg bg-white/80 dark:bg-gray-800/80 py-8 px-4 shadow-2xl sm:rounded-lg sm:px-10 border-2 border-white/50 dark:border-gray-700/50">
          {networkError && (
            <div className="mb-4 p-3 rounded-md bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-red-400 mr-2 flex-shrink-0" />
                <p className="text-sm text-red-600 dark:text-red-300">{networkError}</p>
              </div>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={`${inputClasses} pl-10`}
                  value={email}
                  onChange={handleEmailChange}
                  disabled={isSubmitting}
                  placeholder="Enter your email"
                />
              </div>
              {emailError && (
                <p className="mt-1 text-xs text-red-500">{emailError}</p>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting || !isOnline}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-sm font-medium text-white 
                  ${theme === 'dark'
                    ? 'bg-purple-500 hover:bg-purple-600'
                    : 'bg-gradient-to-r from-pink-400 to-blue-400 hover:from-pink-500 hover:to-blue-500'
                  } 
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 dark:focus:ring-purple-500 
                  transition-all duration-200
                  ${(isSubmitting || !isOnline) ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <Loader2 className="animate-spin h-5 w-5 mr-2" />
                    Signing in...
                  </div>
                ) : (
                  'Sign in with email'
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Enter your email to sign in or create an account
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}