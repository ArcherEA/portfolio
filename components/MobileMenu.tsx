import React from 'react';
import { X, Menu } from 'lucide-react';
import { NAV_LINKS } from '@/lib/constants';

interface MobileMenuProps {
    mobileMenuOpen: boolean;
    setMobileMenuOpen: (open: boolean) => void;
    scrollToSection: (id: string) => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ mobileMenuOpen, setMobileMenuOpen, scrollToSection }) => {
    if (!mobileMenuOpen) return null;
    return (
        <div className="fixed inset-0 z-[60] bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl flex flex-col items-center justify-center animate-in slide-in-from-right duration-300 text-slate-900 dark:text-white">
            <button onClick={() => setMobileMenuOpen(false)} className="absolute top-4 right-4 p-3 hover:rotate-90 transition-transform">
                <X size={32} />
            </button>
            <div className="absolute top-8 left-8 font-mono text-cyan-600 dark:text-cyan-500 text-xs animate-pulse">SYSTEM_PAUSED</div>
            <nav className="flex flex-col gap-6 text-center">
                {NAV_LINKS.map((link, index) => (
                    <button
                        key={link.name}
                        onClick={() => {
                            scrollToSection(link.href.substring(1));
                            setMobileMenuOpen(false);
                        }}
                        className="font-display text-4xl hover:text-pink-600 dark:hover:text-pink-500 hover:scale-110 transition-all uppercase tracking-widest transform skew-x-[-10deg] hover:shadow-[4px_4px_0px_rgba(0,0,0,0.1)] dark:hover:shadow-[4px_4px_0px_black]"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        {link.name}
                    </button>
                ))}
            </nav>
            <div className="absolute bottom-10 text-center text-slate-500 dark:text-gray-500 font-mono text-sm">// SELECT_DESTINATION</div>
        </div>
    );
};
