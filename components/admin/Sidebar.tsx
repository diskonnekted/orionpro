'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Plugin } from '@/lib/plugins/manager';

type SidebarProps = {
  colors?: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textMuted: string;
    border: string;
    sidebarText?: string;
    sidebarMuted?: string;
  };
  plugins?: Plugin[];
};

export default function Sidebar({ colors, plugins = [] }: SidebarProps) {
  const pathname = usePathname();
  const [isPostsOpen, setIsPostsOpen] = useState(pathname?.startsWith('/admin/posts') || false);
  const [isAppearanceOpen, setIsAppearanceOpen] = useState(pathname?.startsWith('/admin/appearance') || false);

  const isActive = (path: string) => {
    if (path === '/admin' && pathname === '/admin') return true;
    if (path !== '/admin' && pathname?.startsWith(path)) return true;
    return false;
  };

  const containerStyle = colors ? {
    backgroundColor: colors.secondary, 
    borderColor: colors.border,
    color: colors.sidebarText || '#ffffff'
  } : {};

  const linkStyle = (active: boolean) => {
    if (!colors) return {};
    if (active) {
      return {
        color: colors.sidebarText || '#ffffff',
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderColor: colors.primary
      };
    }
    return {
      color: colors.sidebarMuted || 'rgba(255,255,255,0.7)',
      borderColor: 'transparent'
    };
  };

  // Base classes that we will override with styles if colors exist
  const baseSidebarClass = "w-64 flex-shrink-0 hidden md:flex flex-col border-r shadow-xl z-20 h-full transition-colors duration-300";
  const defaultColorsClass = "bg-slate-900 text-white border-slate-800";

  return (
    <aside 
      className={`${baseSidebarClass} ${!colors ? defaultColorsClass : ''}`}
      style={containerStyle}
    >
      <div 
        className="h-20 flex items-center px-6 border-b transition-colors duration-300"
        style={colors ? { backgroundColor: 'rgba(0,0,0,0.1)', borderColor: colors.sidebarMuted ? `${colors.sidebarMuted}33` : 'rgba(255,255,255,0.1)' } : { borderBottomColor: '#1e293b', backgroundColor: '#0f172a' }}
      >
        <Link href="/admin" className="flex items-center gap-3">
          <img src="/orion-logo.png" alt="Orion CMS" className="h-12 w-auto object-contain max-w-[150px] brightness-0 invert" style={colors?.sidebarText === '#2b1a36' ? { filter: 'none' } : {}} />
          <span className="font-bold text-lg tracking-tight">Pro</span>
        </Link>
      </div>

      <nav className="flex-1 py-6 space-y-1 overflow-y-auto scrollbar-hide">
        <Link 
          href="/admin" 
          className={`flex items-center px-4 py-3 transition-colors border-l-4 ${!colors ? (isActive('/admin') && pathname === '/admin' ? 'text-slate-50 bg-slate-800/50 border-blue-500' : 'text-slate-400 hover:text-slate-50 hover:bg-slate-800/50 border-transparent hover:border-blue-500') : ''}`}
          style={linkStyle(isActive('/admin') && pathname === '/admin')}
        >
          <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
          <span className="font-medium">Dashboard</span>
        </Link>

        {/* Posts Dropdown */}
        <div>
          <button 
            onClick={() => setIsPostsOpen(!isPostsOpen)}
            className={`w-full flex items-center px-4 py-3 transition-colors border-l-4 ${!colors ? (isActive('/admin/posts') ? 'text-slate-50 bg-slate-800/50 border-blue-500' : 'text-slate-400 hover:text-slate-50 hover:bg-slate-800/50 border-transparent hover:border-blue-500') : ''}`}
            style={linkStyle(isActive('/admin/posts'))}
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path></svg>
            <span className="font-medium flex-1 text-left">Posts</span>
            <svg className={`w-4 h-4 transition-transform ${isPostsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </button>
          
          {isPostsOpen && (
            <div className={`${!colors ? 'bg-slate-900/50' : ''}`} style={colors ? { backgroundColor: 'rgba(0,0,0,0.2)' } : {}}>
              <Link 
                href="/admin/posts" 
                className={`flex items-center pl-12 pr-4 py-2 text-sm transition-colors border-l-4 ${!colors ? (pathname === '/admin/posts' ? 'text-slate-50 border-transparent' : 'text-slate-400 hover:text-slate-50 border-transparent') : ''}`}
                style={pathname === '/admin/posts' ? { color: colors?.sidebarText || 'white' } : { color: colors?.sidebarMuted || 'rgba(255,255,255,0.7)' }}
              >
                All Posts
              </Link>
              <Link 
                href="/admin/posts/new" 
                className={`flex items-center pl-12 pr-4 py-2 text-sm transition-colors border-l-4 ${!colors ? (pathname === '/admin/posts/new' ? 'text-slate-50 border-transparent' : 'text-slate-400 hover:text-slate-50 border-transparent') : ''}`}
                style={pathname === '/admin/posts/new' ? { color: colors?.sidebarText || 'white' } : { color: colors?.sidebarMuted || 'rgba(255,255,255,0.7)' }}
              >
                Add New
              </Link>
              <Link 
                href="/admin/categories" 
                className={`flex items-center pl-12 pr-4 py-2 text-sm transition-colors border-l-4 ${!colors ? (pathname === '/admin/categories' ? 'text-slate-50 border-transparent' : 'text-slate-400 hover:text-slate-50 border-transparent') : ''}`}
                style={pathname === '/admin/categories' ? { color: colors?.sidebarText || 'white' } : { color: colors?.sidebarMuted || 'rgba(255,255,255,0.7)' }}
              >
                Categories
              </Link>
            </div>
          )}
        </div>

        {/* IoT Devices - Only show if Smart Farm plugin is active */}
        {plugins.some(p => p.slug === 'smartfarm' && p.status === 'active') && (
        <Link 
          href="/admin/iot" 
          className={`flex items-center px-4 py-3 transition-colors border-l-4 ${!colors ? (isActive('/admin/iot') ? 'text-slate-50 bg-slate-800/50 border-blue-500' : 'text-slate-400 hover:text-slate-50 hover:bg-slate-800/50 border-transparent hover:border-blue-500') : ''}`}
          style={linkStyle(isActive('/admin/iot'))}
        >
          <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path></svg>
          <span className="font-medium">IoT Devices</span>
        </Link>
        )}

        <Link 
          href="/admin/media" 
          className={`flex items-center px-4 py-3 transition-colors border-l-4 ${!colors ? (isActive('/admin/media') ? 'text-slate-50 bg-slate-800/50 border-blue-500' : 'text-slate-400 hover:text-slate-50 hover:bg-slate-800/50 border-transparent hover:border-blue-500') : ''}`}
          style={linkStyle(isActive('/admin/media'))}
        >
          <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          <span className="font-medium">Media</span>
        </Link>

        <Link 
          href="/admin/pages" 
          className={`flex items-center px-4 py-3 transition-colors border-l-4 ${!colors ? (isActive('/admin/pages') ? 'text-slate-50 bg-slate-800/50 border-blue-500' : 'text-slate-400 hover:text-slate-50 hover:bg-slate-800/50 border-transparent hover:border-blue-500') : ''}`}
          style={linkStyle(isActive('/admin/pages'))}
        >
          <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
          <span className="font-medium">Pages</span>
        </Link>

        {/* Appearance Dropdown */}
        <div>
          <button 
            onClick={() => setIsAppearanceOpen(!isAppearanceOpen)}
            className={`w-full flex items-center px-4 py-3 transition-colors border-l-4 ${!colors ? (isActive('/admin/appearance') ? 'text-slate-50 bg-slate-800/50 border-blue-500' : 'text-slate-400 hover:text-slate-50 hover:bg-slate-800/50 border-transparent hover:border-blue-500') : ''}`}
            style={linkStyle(isActive('/admin/appearance'))}
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path></svg>
            <span className="font-medium flex-1 text-left">Appearance</span>
            <svg className={`w-4 h-4 transition-transform ${isAppearanceOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </button>
          
          {isAppearanceOpen && (
            <div className={`${!colors ? 'bg-slate-900/50' : ''}`} style={colors ? { backgroundColor: 'rgba(0,0,0,0.2)' } : {}}>
              <Link 
                href="/admin/appearance/themes" 
                className={`flex items-center pl-12 pr-4 py-2 text-sm transition-colors border-l-4 ${!colors ? (isActive('/admin/appearance/themes') ? 'text-slate-50 border-transparent' : 'text-slate-400 hover:text-slate-50 border-transparent') : ''}`}
                style={isActive('/admin/appearance/themes') ? { color: colors?.sidebarText || 'white' } : { color: colors?.sidebarMuted || 'rgba(255,255,255,0.7)' }}
              >
                Themes
              </Link>
              <Link 
                href="/admin/appearance/menus" 
                className={`flex items-center pl-12 pr-4 py-2 text-sm transition-colors border-l-4 ${!colors ? (isActive('/admin/appearance/menus') ? 'text-slate-50 border-transparent' : 'text-slate-400 hover:text-slate-50 border-transparent') : ''}`}
                style={isActive('/admin/appearance/menus') ? { color: colors?.sidebarText || 'white' } : { color: colors?.sidebarMuted || 'rgba(255,255,255,0.7)' }}
              >
                Menus
              </Link>
            </div>
          )}
        </div>

        {[
            { path: '/admin/plugins', icon: 'M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z', label: 'Plugins' },
            { path: '/admin/users', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z', label: 'Users' },
            { path: '/admin/settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z', label: 'Settings' },
            { path: '/admin/manual', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253', label: 'Manual' },
        ].map((item) => (
            <Link 
                key={item.path}
                href={item.path} 
                className={`flex items-center px-4 py-3 transition-colors border-l-4 ${!colors ? (isActive(item.path) ? 'text-slate-50 bg-slate-800/50 border-blue-500' : 'text-slate-400 hover:text-slate-50 hover:bg-slate-800/50 border-transparent hover:border-blue-500') : ''}`}
                style={linkStyle(isActive(item.path))}
            >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon}></path></svg>
                <span className="font-medium">{item.label}</span>
            </Link>
        ))}

      </nav>
    </aside>
  );
}
