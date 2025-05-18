import { useState, useEffect } from 'react';
import { provinces } from '../data/provinces';
import ProvinceCard from '../components/ProvinceCard';
import { useTheme } from '../context/ThemeContext';
import { Calculator } from 'lucide-react';
import TestimonialSection from '../components/TestimonialSection';
import TrustSignals from '../components/TrustSignals';

export default function HomePage() {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [flagLoaded, setFlagLoaded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);

      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(window.scrollY / scrollHeight, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 15000);

    return () => clearTimeout(timer);
  }, []);

  const personalNote = (
    <div
      className={`transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full h-0'
      }`}
    >
      <a
        href="https://www.instagram.com/ttalha_13/"
        target="_blank"
        rel="noopener noreferrer"
        className="block max-w-4xl mx-auto mb-6 sm:mb-8 p-4 sm:p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={`transition-all duration-300 ${isHovered ? 'scale-105' : 'scale-100'}`}>
          <p className="text-sm sm:text-base md:text-lg font-serif italic text-gray-800 dark:text-gray-200 leading-relaxed">
            <span className="text-lg sm:text-xl md:text-2xl font-semibold text-purple-600 dark:text-purple-400">"</span>
            This space is crafted with empathy and understanding by a fellow dreamer who journeyed from India to Canada. 
            Having navigated the intricate path from international student to Permanent Resident, 
            I've transformed my challenges into solutions, creating this platform to illuminate the way for others on similar journeys.
            <span className="text-lg sm:text-xl md:text-2xl font-semibold text-purple-600 dark:text-purple-400">"</span>
          </p>
          <p className="mt-3 text-xs sm:text-sm text-purple-600 dark:text-purple-400 font-medium text-right">
            {isHovered ? 'Connect with me on Instagram →' : '- @ttalha_13'}
          </p>
        </div>
      </a>
    </div>
  );

  return (
    <div 
      className={`
        min-h-screen transition-all duration-500 ease-in-out relative
        ${theme === 'dark'
          ? scrolled 
            ? 'bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900' 
            : 'bg-gray-900'
          : scrolled
            ? 'bg-gradient-to-b from-[#fbfbfd] via-[#f5f5f7] to-[#fbfbfd]'
            : 'bg-[#fbfbfd]'
        }
      `}
      style={{
        '--scroll-progress': scrollProgress,
      } as React.CSSProperties}
    >
      {/* Decorative elements */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          opacity: Math.min(scrollProgress * 0.3, 0.15),
        }}
      >
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-blue-500/20 to-green-500/20 rounded-full transform translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 transition-all duration-500 ease-in-out">
        {personalNote}
        
        {/* CRS Score Calculator Section */}
        <div className="mb-6 sm:mb-12">
          <a
            href="https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/check-score.html"
            target="_blank"
            rel="noopener noreferrer"
            className={`
              block bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 
              rounded-lg shadow-lg transform transition-all duration-300 
              hover:scale-105 overflow-hidden
              ${scrolled ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
            `}
          >
            <div className="p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between">
              <div className="flex-1 text-center sm:text-left mb-4 sm:mb-0">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 flex items-center justify-center sm:justify-start">
                  <Calculator className="h-6 w-6 sm:h-8 sm:w-8 mr-2 sm:mr-3" />
                  Calculate Your CRS Score
                </h2>
                <p className="text-sm sm:text-base text-white/90 max-w-2xl">
                  Find out your Comprehensive Ranking System (CRS) score for Express Entry. 
                  This score determines your position in the Express Entry pool and your chances of receiving an Invitation to Apply (ITA).
                </p>
                <div className="mt-3 sm:mt-4 inline-flex items-center text-white font-semibold hover:underline">
                  Calculate Now
                  <span className="ml-2">→</span>
                </div>
              </div>
              <div className="hidden lg:block relative">
                <div className={`w-24 h-24 transition-opacity duration-300 ${flagLoaded ? 'opacity-100' : 'opacity-0'}`}>
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Flag_of_Canada_%28Pantone%29.svg"
                    alt="Canadian Flag"
                    className="h-full w-full object-contain animate-flag-wave opacity-90"
                    onLoad={() => setFlagLoaded(true)}
                    loading="eager"
                    fetchPriority="high"
                    style={{
                      minWidth: '96px',
                      minHeight: '96px'
                    }}
                  />
                </div>
              </div>
            </div>
          </a>
        </div>

        <div className="text-center mb-6 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            <span className={`${theme === 'light' ? 'text-red-600' : 'text-gray-100'}`}>C</span>
            <span className="text-gray-900 dark:text-gray-100">anadian </span>
            <span className={`${theme === 'light' ? 'text-red-600' : 'text-gray-100'}`}>I</span>
            <span className="text-gray-900 dark:text-gray-100">mmigration </span>
            <span className={`${theme === 'light' ? 'text-red-600' : 'text-gray-100'}`}>P</span>
            <span className="text-gray-900 dark:text-gray-100">athways</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-2 sm:px-4">
            Explore Permanent Residency options across Canada's provinces. Find official immigration programs and start your journey to becoming a permanent resident.
          </p>
        </div>
        
        {/* Trust Signals Section */}
        <TrustSignals />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {provinces.map((province, index) => (
            <div
              key={province.id}
              className={`
                transform transition-all duration-500 ease-out
                ${scrolled ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}
              `}
              style={{
                transitionDelay: `${index * 100}ms`,
              }}
            >
              <ProvinceCard province={province} />
            </div>
          ))}
        </div>

        {/* Testimonial Section */}
        <TestimonialSection />
      </div>
    </div>
  );
}