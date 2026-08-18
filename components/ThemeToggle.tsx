'use client';

import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

/**
 * Small theme toggle for pages that don't render the main Portfolio shell
 * (e.g. the blog routes). Uses the same `theme` localStorage key and `dark`
 * class on <html> as the rest of the site, so state stays in sync everywhere.
 */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light' | null>(null);

  // Read the theme the layout's pre-paint script already applied.
  useEffect(() => {
    setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
  }, []);

  const toggle = () => {
    // Derive the next theme from the live DOM class (the source of truth),
    // not React state, so rapid clicks can't act on a stale value.
    const isDark = document.documentElement.classList.contains('dark');
    const next = isDark ? 'light' : 'dark';
    document.documentElement.classList.toggle('dark', next === 'dark');
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* ignore storage failures */
    }
    setTheme(next);
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="p-2 rounded-full border-2 border-slate-300 dark:border-white/20 text-slate-900 dark:text-yellow-400 hover:border-pink-500 dark:hover:border-pink-500 transition-colors"
    >
      {/* Placeholder before mount keeps layout stable and avoids hydration mismatch */}
      {theme === null ? (
        <span className="block w-[18px] h-[18px]" />
      ) : theme === 'dark' ? (
        <Sun size={18} />
      ) : (
        <Moon size={18} />
      )}
    </button>
  );
}
