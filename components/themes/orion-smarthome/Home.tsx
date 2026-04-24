'use client';
import { Home as HomeIcon, Lightbulb, Thermometer, ShieldCheck, Settings, Power, Zap, Lock } from 'lucide-react';
import Link from 'next/link';

export default function OrionSmarthomeHome() {
  const devices = [
    { name: 'Living Room Light', status: 'On', icon: Lightbulb, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
    { name: 'Air Conditioner', status: '24°C', icon: Thermometer, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { name: 'Main Gate', status: 'Locked', icon: Lock, color: 'text-green-500', bg: 'bg-green-500/10' },
    { name: 'Security System', status: 'Armed', icon: ShieldCheck, color: 'text-red-500', bg: 'bg-red-500/10' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Header Mockup */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
            <HomeIcon className="w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-800">Orion Smarthome</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
            <Link href="#" className="text-indigo-600">Dashboard</Link>
            <Link href="#" className="hover:text-indigo-600 transition">Rooms</Link>
            <Link href="#" className="hover:text-indigo-600 transition">Schedules</Link>
          </div>
          <Link href="/login" className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition">
            Login
          </Link>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-12">
        {/* Hero Mockup */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full text-indigo-600 text-xs font-bold mb-6">
              <Zap className="w-3 h-3" />
              Smart Living Experience
            </div>
            <h1 className="text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
              Control Your Home <br />
              <span className="text-indigo-600">With Confidence.</span>
            </h1>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-md">
              Manajemen perangkat pintar rumah tangga yang terintegrasi, aman, dan efisien dalam satu genggaman.
            </p>
            <div className="flex gap-4">
              <button className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200">
                Get Started
              </button>
              <button className="bg-white border border-slate-200 text-slate-700 px-8 py-3 rounded-xl font-bold hover:bg-slate-50 transition">
                Learn More
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="bg-white p-4 rounded-3xl shadow-2xl border border-slate-100">
               <img 
                src="https://images.unsplash.com/photo-1558002038-1091a1661116?auto=format&fit=crop&w=800&q=80" 
                alt="Smarthome" 
                className="rounded-2xl w-full h-auto object-cover"
               />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-50 flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">System Secure</div>
                <div className="text-xs text-slate-500">All devices connected</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Access Grid */}
        <h2 className="text-2xl font-bold text-slate-900 mb-8">Quick Control</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {devices.map((device, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition group cursor-pointer">
              <div className="flex justify-between items-start mb-6">
                <div className={`p-3 rounded-xl ${device.bg} ${device.color}`}>
                  <device.icon className="w-6 h-6" />
                </div>
                <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition">
                  <Power className="w-5 h-5" />
                </button>
              </div>
              <div className="text-sm font-bold text-slate-900 mb-1">{device.name}</div>
              <div className="text-xs text-slate-500">{device.status}</div>
            </div>
          ))}
        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="container mx-auto px-6 text-center text-slate-500 text-sm">
          © 2024 Orion Smarthome. Part of Orion Pro CMS ecosystem.
        </div>
      </footer>
    </div>
  );
}
