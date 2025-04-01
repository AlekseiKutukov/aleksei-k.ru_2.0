'use client';

import { useState, useEffect } from 'react';
import style from './ThemeSwitcher.module.css';

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const savedTheme =
      (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <button
      className={`${style.button_switch} ${
        theme === 'light' ? style.darkText : style.lightText
      }`}
      onClick={toggleTheme}
    >
      {theme === 'light' ? 'Тёмная' : 'Светлая'} тема
    </button>
  );
}
