import { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';

export default function LocationInfo() {
  const [location, setLocation] = useState<{
    city?: string;
    country?: string;
    timezone?: string;
    loading: boolean;
    error?: string;
  }>({
    loading: true
  });

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`
          );
          const data = await response.json();
          
          // Get the user's actual timezone
          const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
          // Format the timezone for display (e.g., "Eastern Time" instead of "America/Toronto")
          const timezoneParts = userTimezone.split('/');
          const displayTimezone = timezoneParts[timezoneParts.length - 1].replace(/_/g, ' ');
          
          setLocation({
            city: data.city,
            country: data.countryName,
            timezone: displayTimezone,
            loading: false
          });
        } catch (error) {
          setLocation({
            loading: false,
            error: 'Unable to determine location'
          });
        }
      }, () => {
        // Get timezone even if location is denied
        const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const timezoneParts = userTimezone.split('/');
        const displayTimezone = timezoneParts[timezoneParts.length - 1].replace(/_/g, ' ');
        
        setLocation({
          loading: false,
          timezone: displayTimezone,
          error: 'Location access not granted'
        });
      });
    } else {
      setLocation({
        loading: false,
        error: 'Location services not available'
      });
    }
  }, []);

  if (location.loading) {
    return (
      <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
        <MapPin className="h-6 w-6 animate-pulse" />
        <span>Detecting location...</span>
      </div>
    );
  }

  if (location.error) {
    return (
      <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
        <MapPin className="h-6 w-6" />
        <span>
          {location.timezone 
            ? `Your timezone: ${location.timezone}`
            : 'Location services unavailable'}
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
      <MapPin className="h-6 w-6" />
      <span>
        {location.city}, {location.country} ({location.timezone})
      </span>
    </div>
  );
}