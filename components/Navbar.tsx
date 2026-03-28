'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useStudyStore } from '@/store/useStudyStore';

export function Navbar() {
  const darkMode = useStudyStore((state) => state.darkMode);
  const setDarkMode = useStudyStore((state) => state.setDarkMode);
  const resetProgress = useStudyStore((state) => state.resetProgress);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <header className="sticky top-0 z-20 border-b border-white/20 bg-slate-100/60 backdrop-blur dark:border-slate-700 dark:bg-slate-950/60">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-bold tracking-tight text-brand-600 dark:text-violet-300">
          StudySprint
        </Link>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="glass rounded-lg px-3 py-2 text-sm font-medium"
          >
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
          <button onClick={resetProgress} className="glass rounded-lg px-3 py-2 text-sm font-medium">
            Reset
          </button>
        </div>
      </nav>
    </header>
  );
}
