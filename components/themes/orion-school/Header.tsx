"use client";

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-blue-900 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-blue-900 font-bold text-xl shadow-inner group-hover:rotate-3 transition duration-300">
              OS
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Orion School</h1>
              <p className="text-xs text-blue-200 font-medium tracking-wide">PENDIDIKAN BERKUALITAS</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link href="/" className="px-4 py-2 rounded-lg hover:bg-blue-800 transition font-medium">Beranda</Link>
            <Link href="/about" className="px-4 py-2 rounded-lg hover:bg-blue-800 transition font-medium">Profil</Link>
            <Link href="/contact" className="px-4 py-2 rounded-lg hover:bg-blue-800 transition font-medium">Kontak</Link>
            <Link href="/login" className="ml-4 px-5 py-2 bg-yellow-500 hover:bg-yellow-400 text-blue-900 font-bold rounded-full transition shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
              Login
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-lg hover:bg-blue-800 transition"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-800 border-t border-blue-700">
          <div className="container mx-auto px-4 py-4 space-y-2">
            <Link href="/" className="block px-4 py-2 rounded-lg hover:bg-blue-700 transition">Beranda</Link>
            <Link href="/about" className="block px-4 py-2 rounded-lg hover:bg-blue-700 transition">Profil</Link>
            <Link href="/contact" className="block px-4 py-2 rounded-lg hover:bg-blue-700 transition">Kontak</Link>
            <Link href="/login" className="block px-4 py-2 bg-yellow-500 text-blue-900 font-bold rounded-lg text-center mt-4">Login</Link>
          </div>
        </div>
      )}
    </header>
  );
}
