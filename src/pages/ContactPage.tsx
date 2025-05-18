import { useState } from 'react';
import { provinces } from '../data/provinces';
import toast, { Toaster } from 'react-hot-toast';
import { Send, User, Mail, Phone, MessageSquare, MapPin, Loader2, Instagram, Linkedin } from 'lucide-react';

export default function ContactPage() {
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    province: '',
    phoneNumber: '',
    message: '',
  });

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.province || !formData.phoneNumber || !formData.message) {
      toast.error('All fields are required');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return false;
    }

    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (!phoneRegex.test(formData.phoneNumber)) {
      toast.error('Please enter a valid phone number');
      return false;
    }

    if (formData.message.length < 10) {
      toast.error('Please provide a more detailed message (minimum 10 characters)');
      return false;
    }

    return true;
  };

  const redirectToInstagram = async () => {
    const message = `New Contact Form Submission:\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phoneNumber}\nProvince: ${formData.province}\n\nMessage:\n${formData.message}`;
    
    // Instagram direct message URL
    const username = 'ttalha_13';
    const directMessageUrl = `https://ig.me/m/${username}`;

    // Try to open Instagram direct message
    try {
      // First try to open in Instagram app
      const appUrl = `instagram://user?username=${username}`;
      window.location.href = appUrl;

      // After a short delay, check if app opened
      setTimeout(() => {
        // If app didn't open, try web version
        window.location.href = directMessageUrl;
      }, 2500);

      // Show success toast
      toast.success('Opening Instagram...', {
        duration: 3000,
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        province: '',
        phoneNumber: '',
        message: '',
      });
    } catch (error) {
      console.error('Error opening Instagram:', error);
      // Fallback to web version
      window.location.href = directMessageUrl;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setSubmitting(true);

    try {
      await redirectToInstagram();
    } catch (error) {
      console.error('Error:', error);
      toast.error('Please message @ttalha_13 directly on Instagram');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden perspective-container">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full filter blur-3xl animate-float-orb" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-red-500/10 rounded-full filter blur-3xl animate-float-orb" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl animate-float-orb" style={{ animationDelay: '4s' }} />
      </div>
      
      <Toaster position="top-center" />
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-white mb-2">Contact Us</h2>
          <p className="text-gray-400">
            Have questions? We're here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Contact Information */}
          <div className="backdrop-blur-lg bg-white/5 rounded-lg shadow-2xl p-6 sm:p-8 depth-layer">
            <h3 className="text-xl font-semibold text-white mb-6">Get in Touch</h3>
            
            <div className="space-y-6">
              {/* Social Media Section */}
              <div className="flex items-start space-x-4">
                <MessageSquare className="w-6 h-6 text-red-400 mt-1" />
                <div>
                  <p className="text-white font-medium mb-3">Social Media</p>
                  <div className="flex space-x-4">
                    <a
                      href="https://www.instagram.com/ttalha_13/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-gray-300 hover:text-red-400 transition-colors"
                    >
                      <Instagram className="w-5 h-5" />
                      <span>Instagram</span>
                    </a>
                    <a
                      href="https://www.linkedin.com/in/talha-806869188/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                      <span>LinkedIn</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Remote Work Message */}
              <div className="border-t border-gray-700 pt-6 mt-6">
                <div className="bg-gradient-to-r from-purple-500/10 to-red-500/10 rounded-lg p-4 backdrop-blur-sm">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      <div className="animate-pulse">
                        <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-2 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                        100% Remote Assistance
                      </h4>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        No office hours or physical location needed! We provide comprehensive immigration support entirely online, making it convenient for you to get help from anywhere in the world. 🌎✨
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="backdrop-blur-lg bg-white/5 rounded-lg shadow-2xl depth-layer">
            <div className="p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="group">
                  <label className="block text-sm font-medium text-gray-300 mb-2 group-hover:text-white transition-colors">
                    <User className="inline-block w-4 h-4 mr-2 mb-1 icon-bounce" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-white placeholder-gray-500 transition-all duration-300 transform hover:translate-y-[-2px] focus:translate-y-[-2px] input-focus"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={submitting}
                  />
                </div>

                <div className="group">
                  <label className="block text-sm font-medium text-gray-300 mb-2 group-hover:text-white transition-colors">
                    <Mail className="inline-block w-4 h-4 mr-2 mb-1 icon-bounce" />
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-white placeholder-gray-500 transition-all duration-300 transform hover:translate-y-[-2px] focus:translate-y-[-2px] input-focus"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={submitting}
                  />
                </div>

                <div className="group">
                  <label className="block text-sm font-medium text-gray-300 mb-2 group-hover:text-white transition-colors">
                    <MapPin className="inline-block w-4 h-4 mr-2 mb-1 icon-bounce" />
                    Province of Interest
                  </label>
                  <select
                    required
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-white placeholder-gray-500 transition-all duration-300 transform hover:translate-y-[-2px] focus:translate-y-[-2px] input-focus"
                    value={formData.province}
                    onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                    disabled={submitting}
                  >
                    <option value="" className="bg-gray-800">Select a province</option>
                    {provinces.map((province) => (
                      <option key={province.id} value={province.id} className="bg-gray-800">
                        {province.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="group">
                  <label className="block text-sm font-medium text-gray-300 mb-2 group-hover:text-white transition-colors">
                    <Phone className="inline-block w-4 h-4 mr-2 mb-1 icon-bounce" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-white placeholder-gray-500 transition-all duration-300 transform hover:translate-y-[-2px] focus:translate-y-[-2px] input-focus"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    placeholder="+1 (123) 456-7890"
                    disabled={submitting}
                  />
                </div>

                <div className="group">
                  <label className="block text-sm font-medium text-gray-300 mb-2 group-hover:text-white transition-colors">
                    <MessageSquare className="inline-block w-4 h-4 mr-2 mb-1 icon-bounce" />
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-white placeholder-gray-500 transition-all duration-300 transform hover:translate-y-[-2px] focus:translate-y-[-2px] input-focus resize-none"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    disabled={submitting}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className={`
                    w-full flex items-center justify-center px-6 py-3 border border-transparent 
                    rounded-lg text-white bg-gradient-to-r from-red-500 to-red-600 
                    hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 
                    focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 
                    disabled:cursor-not-allowed transform hover:scale-105 hover:rotate-1 
                    transition-all duration-300 button-pulse
                    ${submitting ? 'opacity-75 cursor-not-allowed' : ''}
                  `}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Opening Instagram...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}