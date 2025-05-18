import { createContext, useContext, useState, useEffect } from 'react';

interface ThemeContextType {
  theme: 'light' | 'dark';
  isAutoMode: boolean;
  toggleTheme: () => void;
  toggleAutoMode: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  isAutoMode: false,
  toggleTheme: () => {},
  toggleAutoMode: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const checkTime = () => {
    const hours = new Date().getHours();
    return hours >= 18 || hours < 6;
  };

  // Initialize theme based on time
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme as 'light' | 'dark';
    }
    // If no saved theme, set based on time
    return checkTime() ? 'dark' : 'light';
  });

  const [isAutoMode, setIsAutoMode] = useState(() => {
    const savedAutoMode = localStorage.getItem('isAutoMode');
    return savedAutoMode === 'true';
  });

  useEffect(() => {
    if (isAutoMode) {
      const isDarkTime = checkTime();
      setTheme(isDarkTime ? 'dark' : 'light');

      const interval = setInterval(() => {
        const isDarkTime = checkTime();
        setTheme(isDarkTime ? 'dark' : 'light');
      }, 60000);

      return () => clearInterval(interval);
    }
  }, [isAutoMode]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    localStorage.setItem('isAutoMode', String(isAutoMode));

    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme, isAutoMode]);

  const toggleTheme = () => {
    if (!isAutoMode) {
      setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    }
  };

  const toggleAutoMode = () => {
    setIsAutoMode(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ theme, isAutoMode, toggleTheme, toggleAutoMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);