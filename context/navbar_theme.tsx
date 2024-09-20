"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Theme.ts
interface Theme {
  type: 'light' | 'dark';
}

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const initialThemeContextValue: ThemeContextType = {
  theme: { type: 'light' },
  toggleTheme: () => {},
};

const ThemeContext = createContext<ThemeContextType>(initialThemeContextValue);

export const NavThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>({ type: 'light' });

  const toggleTheme = () => {
    setTheme(prevTheme => ({
      ...prevTheme,
      type: prevTheme.type === 'light' ? 'dark' : 'light',
    }));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
