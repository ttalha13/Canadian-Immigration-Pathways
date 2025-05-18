import { useParams, Link } from 'react-router-dom';
import { ExternalLink, ArrowLeft } from 'lucide-react';
import { provinces } from '../data/provinces';
import { useTheme } from '../context/ThemeContext';

export default function ProvincePage() {
  const { id } = useParams<{ id: string }>();
  const province = provinces.find((p) => p.id === id);
  const { theme } = useTheme();

  if (!province) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Province not found</h2>
          <Link to="/" className="mt-4 text-purple-500 dark:text-purple-400 hover:text-purple-600 dark:hover:text-purple-300">
            Return to homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          to="/"
          className="inline-flex items-center text-purple-500 dark:text-purple-400 hover:text-purple-600 dark:hover:text-purple-300 mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Return to provinces
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="h-64 relative">
            <img
              src={theme === 'dark' ? province.darkImage : province.image}
              alt={province.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <h1 className="text-4xl font-bold text-white">{province.name}</h1>
            </div>
          </div>

          <div className="p-8">
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">{province.description}</p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Available Immigration Pathways
            </h2>

            <div className="space-y-6">
              {province.pathways.map((pathway, index) => (
                <div
                  key={index}
                  className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {pathway.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{pathway.description}</p>
                  <a
                    href={pathway.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-purple-500 dark:text-purple-400 hover:text-purple-600 dark:hover:text-purple-300"
                  >
                    Visit official website
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}