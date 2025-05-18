import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';

export default function AuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [processing, setProcessing] = useState(true);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        setProcessing(true);
        
        // Check if we have a hash in the URL (for magic link auth)
        const hash = window.location.hash;
        
        if (hash && hash.includes('access_token')) {
          // Let Supabase handle the hash
          const { data, error } = await supabase.auth.getSession();
          
          if (error) {
            throw error;
          }
          
          if (data.session) {
            setSuccess(true);
            setTimeout(() => navigate('/'), 1500);
            return;
          }
        }
        
        // If no hash or session from hash, try to get type and token from query params
        const type = searchParams.get('type');
        const email = searchParams.get('email');
        const token = searchParams.get('token');
        
        if (!email || !token) {
          console.error('Missing email or token in URL');
          setError('Invalid login link. Missing required parameters.');
          setTimeout(() => navigate('/login'), 3000);
          return;
        }
        
        // Verify the OTP
        const { data, error } = await supabase.auth.verifyOtp({
          type: 'magiclink',
          email,
          token,
        });
        
        if (error) {
          console.error('Error verifying OTP:', error);
          throw error;
        }
        
        if (data.session) {
          setSuccess(true);
          setTimeout(() => navigate('/'), 1500);
        } else {
          throw new Error('No session created after verification');
        }
      } catch (error: any) {
        console.error('Error in auth callback:', error);
        setError(error.message || 'An unexpected error occurred. Please try again.');
        setTimeout(() => navigate('/login'), 3000);
      } finally {
        setProcessing(false);
      }
    };

    handleCallback();
  }, [navigate, searchParams]);

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center p-6 max-w-md">
          <div className="text-green-500 mb-4">
            <CheckCircle className="h-12 w-12 mx-auto" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Successfully signed in!</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">Redirecting you to the dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center p-6 max-w-md">
          <div className="text-red-500 mb-4">
            <AlertCircle className="h-12 w-12 mx-auto" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Authentication Error</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{error}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Redirecting you to the login page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <Loader2 className="animate-spin h-12 w-12 mx-auto text-purple-500 mb-4" />
        <p className="text-gray-600 dark:text-gray-300">
          {processing ? 'Verifying your login...' : 'Redirecting...'}
        </p>
      </div>
    </div>
  );
}