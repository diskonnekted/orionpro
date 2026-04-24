'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = searchParams.get('page');

  // Helper to determine if a link is active
  const isActive = (path: string, pageParam?: string | null, hash?: string) => {
    if (path === '/admin/login') return false; // Special case for external/admin link
    
    // Check for query param matches (e.g. ?page=download)
    if (pageParam) {
      return pathname === path && currentPage === pageParam;
    }
    
    // Check for hash matches (simplified - usually requires scroll spy)
    if (hash) {
       // Ideally we'd check window.location.hash but for SSR consistency we might just rely on click setting state
       // For now, let's just return false for hash links unless we track it
       return false; 
    }

    // Default home check
    if (path === '/' && !currentPage && !hash) {
      return pathname === '/' && !currentPage;
    }

    return pathname === path;
  };

  const navLinks = [
    { href: '/', label: 'Beranda', page: null, hash: null },
    { href: '/?page=download', label: 'Download', page: 'download', hash: null },
    { href: '/?page=documentation', label: 'Dokumentasi', page: 'documentation', hash: null },
    { href: '#features', label: 'Fitur', page: null, hash: 'features' },
    { href: '#news', label: 'Berita', page: null, hash: 'news' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-brand-700 flex items-center gap-2">
                <img src="/assets/img/CMS-ORION-ONE.png" alt="Orion CMS Logo" className="h-14 w-auto" />
            </Link>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8 items-center">
                {navLinks.map((link) => (
                    <Link 
                        key={link.label}
                        href={link.href} 
                        className={`font-medium transition ${
                            isActive(link.href.split('?')[0], link.page, link.hash) 
                            ? 'text-brand-600' 
                            : 'text-slate-600 hover:text-brand-600'
                        }`}
                    >
                        {link.label}
                    </Link>
                ))}
                <Link href="/login" className="px-5 py-2 bg-brand-600 text-white rounded-full font-semibold hover:bg-brand-700 transition shadow-lg shadow-brand-500/30">
                    Login Admin
                </Link>
            </div>
            
            {/* Mobile Menu Button */}
            <button 
                className="md:hidden text-slate-600 focus:outline-none"
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

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
            <div className="md:hidden bg-white border-t border-slate-100 absolute w-full left-0 top-full shadow-lg">
                <div className="flex flex-col px-6 py-4 space-y-4">
                    {navLinks.map((link) => (
                        <Link 
                            key={link.label}
                            href={link.href} 
                            className={`font-medium transition block ${
                                isActive(link.href.split('?')[0], link.page, link.hash)
                                ? 'text-brand-600' 
                                : 'text-slate-600 hover:text-brand-600'
                            }`}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link 
                        href="/login" 
                        className="block w-full text-center px-5 py-3 bg-brand-600 text-white rounded-lg font-semibold hover:bg-brand-700 transition"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Login Admin
                    </Link>
                </div>
            </div>
        )}
    </nav>
  );
}
