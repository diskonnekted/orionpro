'use client';
import { Cpu, Factory, Zap, BarChart3, Settings, Play, Box, Layers, Activity, ShieldCheck, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function OrionAutomationHome() {
  const metrics = [
    { label: 'Production Yield', value: '98.4%', change: '+2.1%', icon: Box, color: 'text-blue-500' },
    { label: 'Energy Usage', value: '1,240 kWh', change: '-5.4%', icon: Zap, color: 'text-amber-500' },
    { label: 'OEE Rating', value: '86.5%', change: '+0.8%', icon: Activity, color: 'text-emerald-500' },
    { label: 'System Uptime', value: '99.99%', change: 'Stable', icon: ShieldCheck, color: 'text-indigo-500' },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* Top Header */}
      <nav className="bg-slate-900 text-white px-8 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center">
            <Cpu className="w-6 h-6" />
          </div>
          <span className="font-bold text-xl tracking-tight uppercase">Orion Automation</span>
        </div>
        <div className="hidden lg:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-slate-400">
          <Link href="#" className="text-white">Dashboard</Link>
          <Link href="#" className="hover:text-white transition">Processes</Link>
          <Link href="#" className="hover:text-white transition">Analytics</Link>
          <Link href="#" className="hover:text-white transition">Config</Link>
        </div>
        <Link href="/login" className="bg-blue-600 text-white px-6 py-2 rounded font-bold text-xs uppercase tracking-widest hover:bg-blue-700 transition">
          Operator Login
        </Link>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative py-24 px-8 bg-slate-50 overflow-hidden">
          <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 text-[10px] font-black uppercase tracking-widest rounded mb-8">
                Industry 4.0 Ready
              </div>
              <h1 className="text-6xl font-black text-slate-900 mb-8 leading-[1.1] tracking-tight">
                Empowering <br />
                <span className="text-blue-600">Smart Factories.</span>
              </h1>
              <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-xl">
                Optimalkan lini produksi Anda dengan sistem otomasi cerdas. Integrasi sensor, robotika, dan analisis data real-time untuk efisiensi maksimum.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-slate-900 text-white px-8 py-4 rounded font-bold text-sm flex items-center gap-3 hover:bg-slate-800 transition shadow-xl shadow-slate-200">
                  Control Panel <ChevronRight className="w-4 h-4" />
                </button>
                <button className="bg-white border border-slate-200 text-slate-900 px-8 py-4 rounded font-bold text-sm hover:bg-slate-50 transition">
                  System Overview
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white p-2 rounded-2xl shadow-2xl border border-slate-100 overflow-hidden group">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=80" 
                  alt="Industrial Automation" 
                  className="w-full h-auto rounded-xl group-hover:scale-105 transition-transform duration-1000"
                />
              </div>
              {/* Floating Badge */}
              <div className="absolute -top-10 -right-10 bg-blue-600 text-white p-8 rounded-full shadow-2xl animate-bounce">
                <Zap className="w-8 h-8" />
              </div>
            </div>
          </div>
        </section>

        {/* Metrics Grid */}
        <section className="py-20 px-8">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {metrics.map((m, i) => (
                <div key={i} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className={`w-12 h-12 rounded-lg ${m.color} bg-current/10 flex items-center justify-center mb-6`}>
                    <m.icon className="w-6 h-6" />
                  </div>
                  <div className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">{m.label}</div>
                  <div className="flex items-end gap-3">
                    <div className="text-3xl font-black text-slate-900 tracking-tight">{m.value}</div>
                    <div className={`text-xs font-bold mb-1 ${m.change.startsWith('+') ? 'text-emerald-500' : m.change.startsWith('-') ? 'text-red-500' : 'text-slate-400'}`}>
                      {m.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-24 px-8 bg-slate-900 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/5 -skew-x-12 translate-x-1/4"></div>
          <div className="container mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="text-4xl font-black mb-8 tracking-tight">Streamlined <span className="text-blue-500">Workflow.</span></h2>
                <div className="space-y-8">
                  <div className="flex gap-6">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold shrink-0">1</div>
                    <div>
                      <h4 className="font-bold text-lg mb-2">Data Acquisition</h4>
                      <p className="text-slate-400 text-sm">Pengumpulan data dari ribuan sensor di lantai produksi secara real-time.</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold shrink-0">2</div>
                    <div>
                      <h4 className="font-bold text-lg mb-2">AI Processing</h4>
                      <p className="text-slate-400 text-sm">Algoritma cerdas memproses data untuk mendeteksi anomali dan optimasi.</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold shrink-0">3</div>
                    <div>
                      <h4 className="font-bold text-lg mb-2">Automated Action</h4>
                      <p className="text-slate-400 text-sm">Eksekusi perintah otomatis ke mesin untuk efisiensi tanpa intervensi manual.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square bg-slate-800 rounded-2xl p-8 flex flex-col justify-between hover:bg-blue-600 transition-colors group">
                  <Layers className="w-10 h-10 text-blue-500 group-hover:text-white" />
                  <span className="font-bold uppercase tracking-widest text-xs">Modular System</span>
                </div>
                <div className="aspect-square bg-slate-800 rounded-2xl p-8 flex flex-col justify-between hover:bg-blue-600 transition-colors group">
                  <Activity className="w-10 h-10 text-blue-500 group-hover:text-white" />
                  <span className="font-bold uppercase tracking-widest text-xs">Live Analytics</span>
                </div>
                <div className="aspect-square bg-slate-800 rounded-2xl p-8 flex flex-col justify-between hover:bg-blue-600 transition-colors group">
                  <Settings className="w-10 h-10 text-blue-500 group-hover:text-white" />
                  <span className="font-bold uppercase tracking-widest text-xs">Remote Config</span>
                </div>
                <div className="aspect-square bg-slate-800 rounded-2xl p-8 flex flex-col justify-between hover:bg-blue-600 transition-colors group">
                  <Play className="w-10 h-10 text-blue-500 group-hover:text-white" />
                  <span className="font-bold uppercase tracking-widest text-xs">Fast Deployment</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-slate-100 py-16 px-8">
        <div className="container mx-auto flex flex-col md:row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white">
              <Cpu className="w-5 h-5" />
            </div>
            <span className="font-bold text-lg tracking-tight uppercase">Orion Automation</span>
          </div>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">
            © 2024 Orion Pro CMS Ecosystem. Smart Industrial Solutions.
          </p>
          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            <Link href="#" className="hover:text-blue-600">Privacy</Link>
            <Link href="#" className="hover:text-blue-600">Terms</Link>
            <Link href="#" className="hover:text-blue-600">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
