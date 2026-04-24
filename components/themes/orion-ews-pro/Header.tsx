
import Link from 'next/link';
import { Activity, ShieldAlert, Settings, Menu, Signal, Monitor, Info, CloudLightning } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center shadow-lg shadow-red-600/20">
            <ShieldAlert className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-wider">ORION <span className="text-red-500">EWS</span> PRO</h1>
            <p className="text-xs text-slate-400 uppercase tracking-widest">Disaster Early Warning System</p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center space-x-2">
          <Link href="/overview" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-800 transition text-sm font-medium text-slate-300 hover:text-white">
            <Info className="w-4 h-4" /> OVERVIEW
          </Link>
          <Link href="/monitor" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-800 transition text-sm font-medium text-slate-300 hover:text-white">
            <Monitor className="w-4 h-4" /> MONITOR
          </Link>
          <Link href="/weather" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-800 transition text-sm font-medium text-slate-300 hover:text-white">
            <CloudLightning className="w-4 h-4" /> CUACA
          </Link>
          <Link href="/alerts" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-800 transition text-sm font-medium text-slate-300 hover:text-white">
            <Signal className="w-4 h-4" /> ALERTS
          </Link>
          <div className="w-px h-6 bg-slate-800 mx-2"></div>
          <Link href="/admin" className="flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-md hover:bg-slate-700 transition border border-slate-700">
            <Settings className="w-4 h-4" />
            <span className="text-sm font-medium">ADMIN</span>
          </Link>
        </nav>

        <button className="md:hidden text-white">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
}
