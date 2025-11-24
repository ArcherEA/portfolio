import React from 'react';
import { NAV_LINKS } from '@/lib/constants';
import { Sun, Moon, Menu } from 'lucide-react';

interface HeaderNavProps {
    activeSection: string;
    scrollToSection: (id: string) => void;
    theme: 'dark' | 'light';
    toggleTheme: () => void;
    setMobileMenuOpen: (open: boolean) => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
    activeSection,
    scrollToSection,
    theme,
    toggleTheme,
    setMobileMenuOpen,
}) => {
    return (
        <div className="hidden md:flex fixed top-6 left-0 right-0 z-50 justify-center px-4 pointer-events-none animate-in fade-in slide-in-from-top-10 duration-1000 delay-500">
            <nav className="pointer-events-auto flex items-center gap-2 p-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:shadow-[0_0_20px_rgba(0,0,0,0.5)] ring-1 ring-slate-900/5 dark:ring-white/5 hover:ring-pink-500/30 transition-all duration-300 max-w-full overflow-x-auto no-scrollbar">
                {/* Logo / Brand */}
                <button
                    onClick={() => scrollToSection('home')}
                    className="pl-4 pr-2 py-1.5 font-display text-xl bg-gradient-to-r from-pink-600 to-cyan-600 dark:from-pink-500 dark:to-cyan-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity whitespace-nowrap"
                >
                    YH
                </button>
                <div className="w-px h-6 bg-slate-200 dark:bg-white/10 mx-1" />
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
                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    className="p-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-yellow-400 border-2 border-slate-900 dark:border-white shadow-[4px_4px_0px_black] dark:shadow-[4px_4px_0px_rgba(255,255,255,0.5)] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_black] dark:hover:shadow-[6px_6px_0px_white] transition-all rounded-full"
                    aria-label="Toggle Theme"
                >
                    {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
                </button>
                {/* Mobile Menu Trigger */}
                <button
                    onClick={() => setMobileMenuOpen(true)}
                    className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-3 rounded-full border-2 border-cyan-500 dark:border-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                >
                    <Menu size={24} />
                </button>
            </nav>
        </div>
    );
};
