"use client";
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, BookOpen, Layers, PenTool, Video } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed w-full bg-white/90 backdrop-blur-md z-50 border-b border-slate-100">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-orange-600">
            <Layers className="w-8 h-8" />
            <span>ScreenPrint<span className="text-slate-900">Master</span></span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#start" className="text-slate-600 hover:text-orange-600 font-medium transition">Start Here</Link>
            <Link href="#materials" className="text-slate-600 hover:text-orange-600 font-medium transition">Tools & Materials</Link>
            <Link href="#steps" className="text-slate-600 hover:text-orange-600 font-medium transition">Step-by-Step</Link>
            <Link href="#pro-tips" className="text-slate-600 hover:text-orange-600 font-medium transition">Pro Tips</Link>
            <Link href="/register" className="px-5 py-2.5 bg-orange-600 text-white rounded-full font-bold hover:bg-orange-700 transition shadow-lg shadow-orange-500/20">
              Join Course
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-slate-600" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4 border-t border-slate-100 pt-4">
            <Link href="#start" className="block text-slate-600 font-medium">Start Here</Link>
            <Link href="#materials" className="block text-slate-600 font-medium">Tools & Materials</Link>
            <Link href="#steps" className="block text-slate-600 font-medium">Step-by-Step</Link>
            <Link href="#pro-tips" className="block text-slate-600 font-medium">Pro Tips</Link>
            <Link href="/register" className="block w-full text-center px-5 py-3 bg-orange-600 text-white rounded-xl font-bold">
              Join Course
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}