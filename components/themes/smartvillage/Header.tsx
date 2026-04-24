'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-emerald-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">🌱</span>
              <span className="font-bold text-xl text-emerald-900 tracking-tight">Smart<span className="text-emerald-600">Village</span></span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-emerald-900 hover:text-emerald-600 font-medium transition-colors">Home</Link>
            <Link href="/monitor" className="text-emerald-900 hover:text-emerald-600 font-medium transition-colors">Monitor</Link>
            <Link href="/about" className="text-emerald-900 hover:text-emerald-600 font-medium transition-colors">About</Link>
            <Link href="/contact" className="text-emerald-900 hover:text-emerald-600 font-medium transition-colors">Contact</Link>
          </nav>

          {/* Login Button */}
          <div className="hidden md:flex items-center">
            <Link 
              href="/login" 
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition font-medium shadow-sm shadow-emerald-200"
            >
              Login Admin
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-emerald-900 hover:text-emerald-600 focus:outline-none p-2"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-emerald-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-emerald-900 hover:bg-emerald-50 hover:text-emerald-600">Home</Link>
            <Link href="/monitor" className="block px-3 py-2 rounded-md text-base font-medium text-emerald-900 hover:bg-emerald-50 hover:text-emerald-600">Monitor</Link>
            <Link href="/about" className="block px-3 py-2 rounded-md text-base font-medium text-emerald-900 hover:bg-emerald-50 hover:text-emerald-600">About</Link>
            <Link href="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-emerald-900 hover:bg-emerald-50 hover:text-emerald-600">Contact</Link>
            <Link href="/login" className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-emerald-600 hover:bg-emerald-50">Login Admin</Link>
          </div>
        </div>
      )}
    </header>
  );
}
