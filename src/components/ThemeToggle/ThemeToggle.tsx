// src/components/ThemeToggle/ThemeToggle.tsx
import React, { useState, useEffect } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import './ThemeToggle.css';

const ThemeToggle: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    // Default to dark if no preference or if 'dark' is saved
    return savedTheme === 'dark' ? true : false;

  });

  useEffect(() => {
    const currentTheme = isDarkMode ? 'dark' : 'light';
    // Remove existing theme classes before adding the new one
    document.body.classList.remove('dark-mode', 'light-mode');
    document.body.classList.add(currentTheme + '-mode');
    localStorage.setItem('theme', currentTheme);
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <button onClick={toggleTheme} className="theme-toggle-button" aria-label="Toggle theme">
      {isDarkMode ? <FaSun /> : <FaMoon />}
    </button>
  );
};

export default ThemeToggle;