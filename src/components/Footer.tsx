import { Copyright, Instagram, Linkedin, Youtube } from 'lucide-react';
import LocationInfo from './LocationInfo';

function XLogo() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="currentColor"/>
    </svg>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[rgb(188,188,188)] dark:bg-gray-800 py-6 sm:py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col space-y-6 sm:space-y-8">
          {/* Top section - Copyright and Location */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                <Copyright className="h-5 w-5" />
                <p className="footer-text text-sm sm:text-base">
                  <span>{currentYear}</span> MyCIP.com  All rights reserved.
                </p>
              </div>
              <div className="footer-text">
                <LocationInfo />
              </div>
            </div>

            {/* Social Media Links */}
            <div className="flex flex-col items-start sm:items-end space-y-2">
              <p className="footer-text text-sm sm:text-base text-gray-600 dark:text-gray-300">
                Created and Maintained By Talha
              </p>
              <div className="flex items-center space-x-3">
                <a
                  href="https://www.instagram.com/ttalha_13/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transform transition-all duration-300 hover:scale-110 hover:shadow-lg p-1.5 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                  aria-label="Follow on Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/talha-806869188/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transform transition-all duration-300 hover:scale-110 hover:shadow-lg p-1.5 rounded-full bg-blue-500 hover:bg-blue-600 text-white"
                  aria-label="Connect on LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="https://x.com/abu4323"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transform transition-all duration-300 hover:scale-110 hover:shadow-lg p-1.5 rounded-full bg-black hover:bg-gray-900 text-white"
                  aria-label="Follow on X (formerly Twitter)"
                >
                  <XLogo />
                </a>
                <a
                  href="https://www.youtube.com/@ttalha.13"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transform transition-all duration-300 hover:scale-110 hover:shadow-lg p-1.5 rounded-full bg-red-500 hover:bg-red-600 text-white"
                  aria-label="Subscribe on YouTube"
                >
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom section - Legal text */}
          <div className="border-t border-gray-300 dark:border-gray-700 pt-4 sm:pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-500 dark:text-gray-400">
              <div className="footer-text-secondary text-xs sm:text-sm">
                This website and its content are owned by MyCIP.com and are protected by Canadian copyright laws. 
                Certain uses may be permitted under fair dealing provisions for research, private study, education, 
                parody, or satire. All other uses require prior written permission.
              </div>
              <div className="footer-text-secondary text-xs sm:text-sm">
                All trademarks and logos displayed are property of their respective owners. 
                The information provided is for general guidance only and does not constitute legal or immigration advice.
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}