import { Shield, Award, Users, Clock } from 'lucide-react';

export default function TrustSignals() {
  const trustSignals = [
    {
      icon: Shield,
      title: 'Verified Information',
      description: 'All immigration pathways and requirements are verified from official government sources'
    },
    {
      icon: Award,
      title: 'Expert Guidance',
      description: 'Created by experienced immigration professionals with proven success stories'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Real experiences and testimonials from successful immigrants'
    },
    {
      icon: Clock,
      title: 'Regular Updates',
      description: 'Stay informed with the latest immigration policy changes and updates'
    }
  ];

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Why Trust MyCIP?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Your reliable partner in the Canadian immigration journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trustSignals.map((signal, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg 
                transform transition-all duration-300 hover:scale-105"
            >
              <div className="flex flex-col items-center text-center">
                <div className="p-3 bg-red-100 dark:bg-red-900 rounded-full mb-4">
                  <signal.icon className="h-6 w-6 text-red-600 dark:text-red-300" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {signal.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {signal.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}