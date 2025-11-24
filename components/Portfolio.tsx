'use client';
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { NAV_LINKS, SKILLS } from '@/lib/constants';
import LoadingScreen from '@/components/LoadingScreen';
import {
  ArrowUp, Sun, Moon,
  Menu, X, Wifi
} from 'lucide-react';
import Home from './Home';
import Skills from './Skills';
import Projects from './Projects';
// import Blogs from './Blogs';
import Contact from './Contact';

// --- Helper Components ---

// Ambient Background Component
const AmbientBackground = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Left Blob */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[80px] animate-blob opacity-50"></div>

      {/* Right Blob */}
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-[100px] animate-blob opacity-50" style={{ animationDelay: '2s' }}></div>

      {/* Center/Random Blob */}
      <div className="absolute top-[40%] left-[40%] w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[90px] animate-blob opacity-40" style={{ animationDelay: '4s' }}></div>
    </div>
  );
};

// --- Main App Component ---

export default function App() {
  const mainRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState('home');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Use layout effect to check storage before paint to prevent loading flash
  useLayoutEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      setTheme('dark');
    }

    // Check session storage to see if intro has already been shown in this session
    const introShown = sessionStorage.getItem('intro_shown');
    if (introShown) {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    if (theme === 'dark') {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);
 // Use layout effect to check storage before paint to prevent loading flash
  useLayoutEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      setTheme('dark');
    }

    // Check session storage to see if intro has already been shown in this session
    const introShown = sessionStorage.getItem('intro_shown');
    if (introShown) {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    if (theme === 'dark') {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);
    // Restore scroll position logic
  useEffect(() => {
    if (!isLoading && mainRef.current) {
      // 1. Check for URL hash first
      if (window.location.hash) {
        const id = window.location.hash.substring(1);
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'instant' });
          return;
        }
      }

      // 2. Check for saved section in session storage
      const savedSection = sessionStorage.getItem('portfolio_section');
      if (savedSection) {
        const element = document.getElementById(savedSection);
        if (element) {
          element.scrollIntoView({ behavior: 'instant' });
          return;
        }
      }

      // 3. Default to top if nothing else
      mainRef.current.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [isLoading]);


  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Scroll Spy & Toggle ScrollTop Button
  useEffect(() => {
    const container = mainRef.current;
    if (!container) return;

    const handleScroll = () => {
      // Toggle Scroll Top Button
      if (container.scrollTop > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }

      // Spy Logic
      const sections = container.querySelectorAll('section');
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top >= -200 && rect.top <= 400) {
          const id = section.getAttribute('id') || '';
          setActiveSection(id);
          if (id) {
            sessionStorage.setItem('portfolio_section', id);
          }
        }
      });

    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [isLoading]);

  const scrollToTop = () => {
    mainRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false); // Close mobile menu if open
  };

  return (
    <div className="h-full w-full bg-slate-50 dark:bg-[#1a1a2e] text-slate-900 dark:text-white selection:bg-pink-500 selection:text-white relative overflow-hidden transition-colors duration-300">
      {isLoading && <LoadingScreen onComplete={() => {
        setIsLoading(false);
        sessionStorage.setItem('intro_shown', 'true');
      }} />}

      {!isLoading && (
        <>
          <AmbientBackground />

      {/* Controls Container (Bottom Right) */ }
      <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4 items-end">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-yellow-400 border-2 border-slate-900 dark:border-white shadow-[4px_4px_0px_black] dark:shadow-[4px_4px_0px_rgba(255,255,255,0.5)] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_black] dark:hover:shadow-[6px_6px_0px_white] transition-all rounded-full"
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
        </button>

        {/* Scroll To Top Button */}
        <button
          onClick={scrollToTop}
          className={`p-3 bg-pink-500 text-white border-2 border-black dark:border-white shadow-[4px_4px_0px_black] dark:shadow-[4px_4px_0px_white] hover:shadow-[6px_6px_0px_black] dark:hover:shadow-[6px_6px_0px_white] transition-all fire-btn rounded-full ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
          aria-label="Scroll to top"
        >
          <ArrowUp size={24} strokeWidth={3} />
        </button>
      </div>

      {/* Desktop Navigation (Hidden on Mobile) */ }
      <div className="hidden md:flex fixed top-6 left-0 right-0 z-50 justify-center px-4 pointer-events-none animate-in fade-in slide-in-from-top-10 duration-1000 delay-500">
        <nav className="pointer-events-auto flex items-center gap-2 p-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:shadow-[0_0_20px_rgba(0,0,0,0.5)] ring-1 ring-slate-900/5 dark:ring-white/5 hover:ring-pink-500/30 transition-all duration-300 max-w-full overflow-x-auto no-scrollbar">

          {/* Logo / Brand */}
          <button
            onClick={() => scrollToSection('home')}
            className="pl-4 pr-2 py-1.5 font-display text-xl bg-gradient-to-r from-pink-600 to-cyan-600 dark:from-pink-500 dark:to-cyan-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity whitespace-nowrap"
          >
            YH
          </button>

          <div className="w-px h-6 bg-slate-200 dark:bg-white/10 mx-1"></div>

          {/* Links */}
          <div className="flex gap-1">
            {NAV_LINKS.map((link) => {
              const linkId = link.href.substring(1);
              const isActive = activeSection === linkId;
              return (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(linkId)}
                  className={`
                         relative px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 font-tech tracking-wider whitespace-nowrap
                         ${isActive ? 'text-slate-900' : 'text-slate-500 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white'}
                       `}
                >
                  {isActive && (
                    <span className="absolute inset-0 bg-cyan-300 dark:bg-cyan-400 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.5)] -z-10 animate-in fade-in zoom-in duration-300" />
                  )}
                  {link.name}
                </button>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Mobile Navigation Trigger */ }
      <div className="md:hidden fixed top-4 right-4 z-50 animate-in fade-in duration-1000 flex gap-3">
        {/* Theme Toggle Mobile */}
        <button
          onClick={toggleTheme}
          className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-3 rounded-full border-2 border-cyan-500 dark:border-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
        >
          {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
        </button>
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-3 rounded-full border-2 border-cyan-500 dark:border-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Full Screen Menu */ }
      {
        mobileMenuOpen && (
          <div className="fixed inset-0 z-[60] bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl flex flex-col items-center justify-center animate-in slide-in-from-right duration-300 text-slate-900 dark:text-white">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-4 right-4 p-3 hover:rotate-90 transition-transform"
            >
              <X size={32} />
            </button>

            <div className="absolute top-8 left-8 font-mono text-cyan-600 dark:text-cyan-500 text-xs animate-pulse">
              SYSTEM_PAUSED
            </div>

            <nav className="flex flex-col gap-6 text-center">
              {NAV_LINKS.map((link, index) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href.substring(1))}
                  className="font-display text-4xl hover:text-pink-600 dark:hover:text-pink-500 hover:scale-110 transition-all uppercase tracking-widest transform skew-x-[-10deg] hover:shadow-[4px_4px_0px_rgba(0,0,0,0.1)] dark:hover:shadow-[4px_4px_0px_black]"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {link.name}
                </button>
              ))}
            </nav>

            <div className="absolute bottom-10 text-center text-slate-500 dark:text-gray-500 font-mono text-sm">
                 // SELECT_DESTINATION
            </div>
          </div>
        )
      }

      {/* Main Slider Container */ }
      <main
        ref={mainRef}
        className="h-full w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar"
      >

        {/* Hero Section Slide */}
        <Home scrollToSection={scrollToSection} />

        {/* Status / Skills / Experience Section Slide */}
        <Skills />

        {/* Projects Section Slide */}
        <Projects />

        {/* Blog Section Slide */}
        {/* <Blogs/> */}

        {/* Contact / AI Chat Section Slide - FINAL REFINEMENT */}
        <Contact />

      </main>
        </>
      )
}
    </div >
    );
}