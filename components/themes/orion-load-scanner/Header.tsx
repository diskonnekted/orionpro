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
    { href: '/?page=scanner', label: 'Monitor Scanner', page: 'scanner' },
    { href: '/?page=reports', label: 'Laporan', page: 'reports' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-slate-900/90 backdrop-blur-md border-b border-amber-500/20">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-white flex items-center gap-2">
                <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path></svg>
                </div>
                <span className="hidden sm:inline font-mono tracking-tighter uppercase italic">Load Scanner</span>
            </Link>
            
            <div className="hidden md:flex space-x-8 items-center font-mono">
                {navLinks.map((link) => (
                    <Link 
                        key={link.label}
                        href={link.href} 
                        className={`text-sm transition ${
                            isActive('/', link.page) 
                            ? 'text-amber-500' 
                            : 'text-slate-400 hover:text-amber-500'
                        }`}
                    >
                        {link.label}
                    </Link>
                ))}
                <Link href="/login" className="px-5 py-2 bg-amber-500 text-slate-900 rounded font-bold hover:bg-amber-400 transition">
                    System Login
                </Link>
            </div>
            
            <button className="md:hidden text-slate-300" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {isMobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />}
                </svg>
            </button>
        </div>
    </nav>
  );
}
