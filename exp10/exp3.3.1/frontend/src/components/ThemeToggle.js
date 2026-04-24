import React from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = ({ theme, toggleTheme }) => {
  return (
    <button className="theme-toggle" onClick={toggleTheme} title="Toggle theme">
      {theme === 'dark' ? <Sun size={22} /> : <Moon size={22} />}
    </button>
  );
};

export default ThemeToggle;

