import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import type { User } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  signInWithEmail: (email: string) => Promise<{ error: Error | null; message?: string }>;
  signOut: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  signInWithEmail: async () => ({ error: null }),
  signOut: async () => {},
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if we have a stored user
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const signInWithEmail = async (email: string): Promise<{ error: Error | null; message?: string }> => {
    try {
      if (!email || !email.trim()) {
        return {
          error: new Error('Email is required'),
          message: 'Please enter your email address',
        };
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return {
          error: new Error('Invalid email format'),
          message: 'Please enter a valid email address',
        };
      }

      // Create a simple user object
      const mockUser = {
        id: crypto.randomUUID(),
        email: email,
        created_at: new Date().toISOString(),
      };

      // Store user in localStorage
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser as User);

      // Navigate to the requested page or home
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });

      return { 
        error: null,
        message: 'Successfully signed in!'
      };
    } catch (error) {
      console.error('Sign in error:', error);
      return {
        error: error as Error,
        message: 'An unexpected error occurred. Please try again.',
      };
    }
  };

  const signOut = async () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{
      user,
      signInWithEmail,
      signOut,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);