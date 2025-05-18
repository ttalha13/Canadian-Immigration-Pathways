import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Circuit breaker state
let failureCount = 0;
const FAILURE_THRESHOLD = 5;
const RESET_TIMEOUT = 30000; // 30 seconds
let circuitBreakerTimer: NodeJS.Timeout | null = null;

// Add jitter to retry delay to prevent thundering herd
const getRetryDelay = (attempt: number) => {
  const baseDelay = Math.min(1000 * Math.pow(2, attempt), 30000); // Increased max delay to 30s
  const jitter = Math.random() * 2000; // Increased jitter range
  return baseDelay + jitter;
};

// Reset circuit breaker after timeout
const resetCircuitBreaker = () => {
  failureCount = 0;
  if (circuitBreakerTimer) {
    clearTimeout(circuitBreakerTimer);
    circuitBreakerTimer = null;
  }
};

// Check if circuit breaker is tripped
const isCircuitBreakerTripped = () => {
  return failureCount >= FAILURE_THRESHOLD;
};

// Create a custom fetch function with timeout and error handling
const customFetch = async (input: RequestInfo | URL, init?: RequestInit) => {
  // Check circuit breaker first
  if (isCircuitBreakerTripped()) {
    throw new Error('Service temporarily unavailable. Please try again later.');
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 60000);

  try {
    // Test network connectivity first
    if (!navigator.onLine) {
      throw new Error('You are offline. Please check your internet connection.');
    }

    // Create new headers object to avoid modifying the original
    const headers = new Headers(init?.headers);
    
    // Ensure correct content type for JSON requests
    if (!headers.has('Content-Type') && init?.body) {
      headers.set('Content-Type', 'application/json');
    }
    
    // Add required Supabase headers
    if (!headers.has('apikey')) {
      headers.set('apikey', supabaseAnonKey);
    }
    if (!headers.has('Authorization')) {
      headers.set('Authorization', `Bearer ${supabaseAnonKey}`);
    }

    // Add CORS mode and credentials
    const fetchOptions = {
      ...init,
      signal: controller.signal,
      headers,
      mode: 'cors' as RequestMode,
      credentials: 'same-origin' as RequestCredentials,
      keepalive: true
    };

    const response = await fetch(input, fetchOptions);

    if (!response.ok) {
      // Increment failure count for 5xx errors
      if (response.status >= 500) {
        failureCount++;
        
        // Set circuit breaker timeout if threshold reached
        if (isCircuitBreakerTripped() && !circuitBreakerTimer) {
          circuitBreakerTimer = setTimeout(resetCircuitBreaker, RESET_TIMEOUT);
        }
      }

      // Handle specific HTTP errors
      switch (response.status) {
        case 401:
          throw new Error('Unauthorized. Please check your Supabase credentials.');
        case 403:
          throw new Error('Forbidden. Please check your Supabase project configuration.');
        case 404:
          throw new Error('Resource not found. Please check your Supabase URL.');
        case 429:
          throw new Error('Too many requests. Please try again later.');
        case 503:
          throw new Error('Supabase service is temporarily unavailable. Please try again later.');
        case 500:
        case 502:
        case 504:
          throw new Error('Server error. Please try again later.');
        default:
          throw new Error(`HTTP error! status: ${response.status}`);
      }
    }

    // Reset failure count on successful response
    failureCount = 0;
    if (circuitBreakerTimer) {
      clearTimeout(circuitBreakerTimer);
      circuitBreakerTimer = null;
    }

    return response;
  } catch (error: any) {
    console.error('Fetch error details:', {
      url: typeof input === 'string' ? input : input.url,
      error: error.message,
      stack: error.stack
    });

    if (error.name === 'AbortError') {
      throw new Error('Request timed out. Please try again.');
    }
    
    if (!navigator.onLine) {
      throw new Error('You are offline. Please check your internet connection.');
    }

    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error('Network error. Please check your connection and try again.');
    }

    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
    debug: import.meta.env.DEV,
    storage: window.sessionStorage
  },
  global: {
    fetch: customFetch,
    headers: {
      'apikey': supabaseAnonKey,
      'Authorization': `Bearer ${supabaseAnonKey}`
    }
  },
  db: {
    schema: 'public'
  },
  realtime: {
    params: {
      eventsPerSecond: 1 // Reduced to prevent overwhelming the service
    }
  },
  httpClient: {
    retryAttempts: 5, // Increased retry attempts
    retryInterval: getRetryDelay,
    timeout: 60000
  }
});