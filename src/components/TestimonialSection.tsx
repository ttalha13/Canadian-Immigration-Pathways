import { useState, useEffect, useRef } from 'react';
import { Star, MessageSquare, Loader2, Trash2, ChevronLeft, ChevronRight, WifiOff, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

interface Testimonial {
  id: string;
  user_name: string;
  rating: number;
  comment: string;
  created_at: string;
  immigration_status: string;
}

function TestimonialSection() {
  const { user } = useAuth();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 3;
  const retryTimeoutRef = useRef<NodeJS.Timeout>();
  const [deleting, setDeleting] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [formData, setFormData] = useState({
    rating: 5,
    comment: '',
    immigration_status: 'Student',
  });

  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      // Retry fetching when coming back online
      if (testimonials.length === 0) {
        fetchTestimonials();
      }
    };
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [testimonials.length]);

  const fetchTestimonials = async () => {
    if (!isOnline) {
      setLoading(false);
      setError('You are offline. Please check your internet connection.');
      return;
    }

    try {
      const { data, error: supabaseError } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });

      if (supabaseError) {
        throw supabaseError;
      }

      if (!data) {
        throw new Error('No data received from Supabase');
      }

      setTestimonials(data);
      setError(null);
      setRetryCount(0);
    } catch (error: any) {
      console.error('Error fetching testimonials:', error);
      setError(error.message || 'Failed to load testimonials');
      
      // Implement exponential backoff retry
      if (retryCount < MAX_RETRIES) {
        const delay = Math.min(1000 * Math.pow(2, retryCount), 10000);
        const jitter = Math.random() * 1000;
        const retryDelay = delay + jitter;
        
        setRetryCount(prev => prev + 1);
        toast.error(`Failed to load testimonials. Retrying in ${Math.ceil(retryDelay/1000)} seconds...`);
        
        // Clear any existing timeout
        if (retryTimeoutRef.current) {
          clearTimeout(retryTimeoutRef.current);
        }
        
        // Set new retry timeout
        retryTimeoutRef.current = setTimeout(() => {
          fetchTestimonials();
        }, retryDelay);
      } else {
        toast.error('Failed to load testimonials after multiple attempts. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    fetchTestimonials();

    // Set up real-time subscription
    const subscription = supabase
      .channel('testimonials_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'testimonials' }, () => {
        fetchTestimonials();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleDelete = async (id: string) => {
    if (!user) {
      toast.error('You must be signed in to delete a testimonial');
      return;
    }

    if (!isOnline) {
      toast.error('You are offline. Please check your internet connection.');
      return;
    }

    const isConfirmed = window.confirm('Are you sure you want to delete this testimonial?');
    if (!isConfirmed) return;

    setDeleting(id);
    try {
      const { error: deleteError } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id)
        .eq('user_name', user.email?.split('@')[0]);

      if (deleteError) throw deleteError;

      toast.success('Testimonial deleted successfully');
      await fetchTestimonials();
    } catch (error: any) {
      console.error('Error deleting testimonial:', error);
      toast.error(error.message || 'Failed to delete testimonial');
    } finally {
      setDeleting(null);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  const nextTestimonial = () => {
    if (isTransitioning || testimonials.length <= 1) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const prevTestimonial = () => {
    if (isTransitioning || testimonials.length <= 1) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  useEffect(() => {
    let autoAdvance: NodeJS.Timeout;

    if (!isPaused && testimonials.length > 1) {
      autoAdvance = setInterval(() => {
        if (!isTransitioning) {
          nextTestimonial();
        }
      }, 5000);
    }

    return () => {
      if (autoAdvance) {
        clearInterval(autoAdvance);
      }
    };
  }, [testimonials.length, isTransitioning, isPaused]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please sign in to submit a testimonial');
      return;
    }

    if (!isOnline) {
      toast.error('You are offline. Please check your internet connection.');
      return;
    }

    if (formData.comment.length < 10) {
      toast.error('Please write a more detailed story (at least 10 characters)');
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase.from('testimonials').insert([
        {
          user_name: user.email?.split('@')[0],
          ...formData,
        },
      ]);

      if (error) throw error;

      toast.success('Thank you for sharing your story!');
      setShowForm(false);
      setFormData({ rating: 5, comment: '', immigration_status: 'Student' });
      await fetchTestimonials();
    } catch (error: any) {
      console.error('Error submitting testimonial:', error);
      toast.error(error.message || 'Failed to submit your story. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOnline) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-center">
          <WifiOff className="h-12 w-12 mx-auto text-red-500 mb-4" />
          <p className="text-gray-600 dark:text-gray-300">You are offline. Please check your internet connection.</p>
          <button
            onClick={fetchTestimonials}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-red-500 mb-4" />
          <p className="text-gray-600 dark:text-gray-300">Loading testimonials...</p>
        </div>
      </div>
    );
  }

  if (error && retryCount >= MAX_RETRIES) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 mx-auto text-red-500 mb-4" />
          <p className="text-gray-600 dark:text-gray-300">{error}</p>
          <button
            onClick={() => {
              setRetryCount(0);
              setError(null);
              fetchTestimonials();
            }}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="py-8 sm:py-12 bg-[rgb(236,230,227)] dark:bg-gray-800 rounded-xl border-4 border-[rgb(206,191,182)] dark:border-transparent"
    >
      <Toaster position="top-center" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 sm:mb-6 relative">
            <div className="flex justify-center px-4 sm:px-0">
              <div className="inline-flex justify-center w-full max-w-[90vw] sm:max-w-none overflow-visible">
                {["People's", " ", "Voice"].map((letter, i) => (
                  <span
                    key={i}
                    className={`
                      testimonial-fancy-letter
                      ${isVisible ? 'testimonial-animate-glow' : ''}
                      transform transition-all duration-1000 ease-out
                      ${isVisible ? 'translate-x-0 opacity-100 scale-100' : '-translate-x-full opacity-0 scale-50'}
                      mx-[0.5px] sm:mx-1
                    `}
                    style={{
                      transitionDelay: `${i * 100}ms`,
                      color: letter === ' ' ? 'transparent' : `hsl(${i * 20}, 70%, 45%)`
                    }}
                  >
                    {letter}
                  </span>
                ))}
              </div>
            </div>
          </h2>

          <div className="overflow-hidden">
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 border-b-2 border-[rgb(206,191,182)] dark:border-gray-700 pb-4 max-w-3xl mx-auto px-2">
              <span className="flex flex-wrap justify-center gap-2">
                {"Read what our community members say about their immigration journey"
                  .split(' ')
                  .map((word, i) => (
                    <span
                      key={i}
                      className={`
                        inline-block transform transition-all duration-1000 ease-out
                        ${isVisible ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-full opacity-0 scale-75'}
                        hover:scale-110 cursor-default
                      `}
                      style={{
                        transitionDelay: `${(3 * 100) + (i * 150)}ms`,
                        color: `hsl(${i * 15}, 60%, 45%)`
                      }}
                    >
                      {word}
                    </span>
                  ))}
              </span>
            </p>
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={() => setShowForm(!showForm)}
            className="mb-6 sm:mb-8 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-300 transform hover:scale-105"
          >
            <MessageSquare className="h-5 w-5 mr-2" />
            {showForm ? 'Close Form' : 'Share Your Story'}
          </button>

          {showForm && (
            <form onSubmit={handleSubmit} className="mb-8 sm:mb-12 bg-[#f5f5f5] dark:bg-gray-700 p-4 sm:p-6 rounded-lg shadow-xl">
              <div className="mb-4 sm:mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Immigration Status
                </label>
                <select
                  value={formData.immigration_status}
                  onChange={(e) => setFormData({ ...formData, immigration_status: e.target.value })}
                  className="w-full rounded-md border border-gray-300 bg-[#e8e8e8] dark:bg-gray-600 
                  shadow-inner focus:border-red-500 focus:ring-red-500 dark:border-gray-500 dark:text-white 
                  transition-colors duration-200 hover:bg-[#e0e0e0] dark:hover:bg-gray-550 p-2 sm:p-3"
                >
                  <option value="Student">International Student</option>
                  <option value="Work Permit">Work Permit Holder</option>
                  <option value="PR">Permanent Resident</option>
                  <option value="Citizen">Canadian Citizen</option>
                </select>
              </div>

              <div className="mb-4 sm:mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Rating
                </label>
                <div className="flex items-center p-2 sm:p-3 bg-[#e8e8e8] dark:bg-gray-600 rounded-md border border-gray-300 dark:border-gray-500">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: star })}
                      className={`${
                        star <= formData.rating ? 'text-yellow-400' : 'text-gray-300'
                      } hover:scale-110 focus:outline-none transition-transform duration-200 mx-1`}
                    >
                      <Star className="h-6 w-6 sm:h-8 sm:w-8 fill-current" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4 sm:mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Your Story
                </label>
                <textarea
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  rows={4}
                  className="w-full rounded-md border border-gray-300 bg-[#e8e8e8] dark:bg-gray-600 
                  shadow-inner focus:border-red-500 focus:ring-red-500 dark:border-gray-500 dark:text-white 
                  transition-colors duration-200 hover:bg-[#e0e0e0] dark:hover:bg-gray-550 p-2 sm:p-3 resize-none"
                  placeholder="Share your immigration journey..."
                  required
                  minLength={10}
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full flex justify-center items-center py-2 sm:py-3 px-4 border border-transparent rounded-md 
                shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none 
                focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed 
                transition-all duration-200"
              >
                {submitting ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5 mr-2" />
                    Submitting...
                  </>
                ) : (
                  'Submit Your Story'
                )}
              </button>
            </form>
          )}

          {testimonials.length > 0 && (
            <div className="relative">
              <div className="overflow-hidden">
                <div
                  className={`
                    transition-transform duration-500 ease-in-out
                    ${isTransitioning ? 'opacity-0' : 'opacity-100'}
                  `}
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                >
                  <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-red-100 dark:bg-red-800 flex items-center justify-center">
                          <span className="text-red-600 dark:text-red-200 font-semibold">
                            {testimonials[currentIndex].user_name[0].toUpperCase()}
                          </span>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {testimonials[currentIndex].user_name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {testimonials[currentIndex].immigration_status}
                          </p>
                        </div>
                      </div>
                      {user && testimonials[currentIndex].user_name === user.email?.split('@')[0] && (
                        <button
                          onClick={() => handleDelete(testimonials[currentIndex].id)}
                          disabled={deleting === testimonials[currentIndex].id}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200"
                        >
                          {deleting === testimonials[currentIndex].id ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                          ) : (
                            <Trash2 className="h-5 w-5" />
                          )}
                        </button>
                      )}
                    </div>
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < testimonials[currentIndex].rating
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300 dark:text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {testimonials[currentIndex].comment}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(testimonials[currentIndex].created_at).toLocaleDateString()}
                    </p>
                    
                    {!isPaused && (
                      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-200 dark:bg-gray-600">
                        <div className="carousel-progress" />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {testimonials.length > 1 && (
                <div className="flex justify-center mt-4 space-x-2">
                  <button
                    onClick={prevTestimonial}
                    className="p-2 text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                    disabled={isTransitioning}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <div className="flex items-center space-x-1">
                    {testimonials.map((_, index) => (
                      <span
                        key={index}
                        className={`
                          h-2 w-2 rounded-full transition-all duration-300
                          ${index === currentIndex
                            ? 'bg-red-500 w-4'
                            : 'bg-gray-300 dark:bg-gray-600'
                          }
                        `}
                      />
                    ))}
                  </div>
                  <button
                    onClick={nextTestimonial}
                    className="p-2 text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                    disabled={isTransitioning}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default TestimonialSection;