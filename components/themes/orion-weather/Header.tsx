'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = searchParams.get('page');

  const isActive = (path: string, pageParam?: string | null) => {
    if (pageParam) {
      return pathname === path && currentPage === pageParam;
    }
    return pathname === path && !currentPage;
  };

  const navLinks = [
    { href: '/', label: 'Beranda', page: null },
    { href: '/?page=weather', label: 'Peta Cuaca', page: 'weather' },
    { href: '/?page=documentation', label: 'Panduan', page: 'documentation' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-white flex items-center gap-2">
                <img src="/orion-light.png" alt="Orion Weather" className="h-10 w-auto" />
                <span className="hidden sm:inline">Orion Weather</span>
            </Link>
            
            <div className="hidden md:flex space-x-8 items-center">
                {navLinks.map((link) => (
                    <Link 
                        key={link.label}
                        href={link.href} 
                        className={`font-medium transition ${
                            isActive('/', link.page) 
                            ? 'text-blue-400' 
                            : 'text-slate-300 hover:text-blue-400'
                        }`}
                    >
                        {link.label}
                    </Link>
                ))}
                <Link href="/login" className="px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-500/20">
                    Admin
                </Link>
            </div>
            
            <button 
                className="md:hidden text-slate-300 focus:outline-none"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {isMobileMenuOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    )}
                </svg>
            </button>
        </div>

        {isMobileMenuOpen && (
            <div className="md:hidden bg-slate-900 border-t border-slate-800 absolute w-full left-0 top-full shadow-lg">
                <div className="flex flex-col px-6 py-4 space-y-4">
                    {navLinks.map((link) => (
                        <Link 
                            key={link.label}
                            href={link.href} 
                            className={`font-medium transition block ${
                                isActive('/', link.page)
                                ? 'text-blue-400' 
                                : 'text-slate-300 hover:text-blue-400'
                            }`}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link href="/login" className="text-center py-2 bg-blue-600 text-white rounded-lg font-semibold">
                        Login Admin
                    </Link>
                </div>
            </div>
        )}
    </nav>
  );
}
