'use client';
import { Activity, Thermometer, Zap, ShieldAlert, Settings, Info, Bell, RefreshCcw, Gauge, HardDrive, Cpu } from 'lucide-react';
import Link from 'next/link';

export default function OrionMachineMonitorHome() {
  const machines = [
    { name: 'CNC Milling A1', status: 'Running', temp: '42°C', load: '65%', health: 98, icon: Settings, color: 'text-emerald-500' },
    { name: 'Hydraulic Press B2', status: 'Idle', temp: '28°C', load: '0%', health: 100, icon: RefreshCcw, color: 'text-slate-400' },
    { name: 'Conveyor Belt C3', status: 'Running', temp: '38°C', load: '82%', health: 85, icon: Zap, color: 'text-amber-500' },
    { name: 'Laser Cutter D4', status: 'Maintenance', temp: '15°C', load: '0%', health: 72, icon: ShieldAlert, color: 'text-red-500' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-200 selection:bg-emerald-500 selection:text-white">
      {/* Sidebar/Nav Mockup */}
      <nav className="bg-slate-900 border-b border-white/5 px-8 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center text-slate-950 shadow-lg shadow-emerald-500/20">
            <Activity className="w-6 h-6" />
          </div>
          <span className="font-black text-xl tracking-tighter uppercase italic text-white">Machine Monitor</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex gap-6 text-[10px] font-black uppercase tracking-widest text-slate-500">
            <Link href="#" className="text-emerald-500">Real-time</Link>
            <Link href="#" className="hover:text-white transition">History</Link>
            <Link href="#" className="hover:text-white transition">Maintenance</Link>
          </div>
          <div className="w-px h-6 bg-white/10 mx-2"></div>
          <button className="relative p-2 text-slate-400 hover:text-white transition">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-slate-900"></span>
          </button>
          <Link href="/login" className="bg-emerald-500 text-slate-950 px-5 py-2 rounded font-black text-[10px] uppercase tracking-widest hover:bg-emerald-400 transition">
            Access System
          </Link>
        </div>
      </nav>

      <main className="p-8">
        <div className="container mx-auto">
          {/* Dashboard Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div>
              <div className="text-emerald-500 font-mono text-[10px] uppercase tracking-[0.4em] mb-2 font-bold">Diagnostics Dashboard</div>
              <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter">System <span className="text-slate-500">Overview.</span></h1>
            </div>
            <div className="flex gap-4 bg-slate-900 p-1 rounded-lg border border-white/5">
              <button className="px-4 py-2 bg-slate-800 text-white text-[10px] font-black uppercase tracking-widest rounded shadow-sm">All Assets</button>
              <button className="px-4 py-2 text-slate-500 hover:text-white text-[10px] font-black uppercase tracking-widest rounded transition">Active</button>
              <button className="px-4 py-2 text-slate-500 hover:text-white text-[10px] font-black uppercase tracking-widest rounded transition">Alerts</button>
            </div>
          </div>

          {/* Machine Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {machines.map((m, i) => (
              <div key={i} className="bg-slate-900 border border-white/5 rounded-2xl p-6 hover:border-emerald-500/30 transition-all duration-500 group">
                <div className="flex justify-between items-start mb-8">
                  <div className={`w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center ${m.color} group-hover:scale-110 transition-transform`}>
                    <m.icon className="w-6 h-6" />
                  </div>
                  <div className="text-right">
                    <div className={`text-[9px] font-black uppercase tracking-widest mb-1 ${m.status === 'Running' ? 'text-emerald-500' : m.status === 'Maintenance' ? 'text-red-500' : 'text-slate-500'}`}>
                      {m.status}
                    </div>
                    <div className="text-[10px] font-mono text-slate-600 uppercase">Live Feed</div>
                  </div>
                </div>
                
                <h3 className="text-lg font-black text-white uppercase italic tracking-tighter mb-6">{m.name}</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-slate-500">
                      <Thermometer className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Temperature</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-white">{m.temp}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-slate-500">
                      <Gauge className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Load Factor</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-white">{m.load}</span>
                  </div>
                  
                  <div className="pt-4 border-t border-white/5">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Health Status</span>
                      <span className={`text-[10px] font-mono font-bold ${m.health > 90 ? 'text-emerald-500' : m.health > 80 ? 'text-amber-500' : 'text-red-500'}`}>{m.health}%</span>
                    </div>
                    <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${m.health > 90 ? 'bg-emerald-500' : m.health > 80 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${m.health}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* System Performance Mockup */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-slate-900 border border-white/5 rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px] rounded-full"></div>
              <div className="relative z-10">
                <h4 className="text-sm font-black text-white uppercase tracking-widest mb-8">Performance Analytics (24h)</h4>
                <div className="h-48 flex items-end gap-2">
                  {[40, 60, 45, 80, 55, 90, 70, 85, 60, 75, 50, 65, 95, 80, 60].map((h, i) => (
                    <div key={i} className="flex-1 bg-slate-800 rounded-t-sm hover:bg-emerald-500 transition-colors group relative cursor-pointer" style={{ height: `${h}%` }}>
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-slate-900 px-1.5 py-0.5 rounded text-[8px] font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{h}%</div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-4 text-[9px] font-mono text-slate-600 uppercase tracking-[0.2em]">
                  <span>00:00</span>
                  <span>06:00</span>
                  <span>12:00</span>
                  <span>18:00</span>
                  <span>23:59</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 border border-white/5 rounded-2xl p-8">
              <h4 className="text-sm font-black text-white uppercase tracking-widest mb-8">System Health</h4>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-lg">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Processor Load</div>
                    <div className="text-sm font-mono text-white">12.4% <span className="text-[9px] text-emerald-500 font-bold tracking-tighter ml-2">NORMAL</span></div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-500/10 text-blue-500 rounded-lg">
                    <HardDrive className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Log Storage</div>
                    <div className="text-sm font-mono text-white">45.2 GB <span className="text-[9px] text-slate-500 font-bold tracking-tighter ml-2">82% FREE</span></div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-amber-500/10 text-amber-500 rounded-lg">
                    <RefreshCcw className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Sync Latency</div>
                    <div className="text-sm font-mono text-white">14ms <span className="text-[9px] text-emerald-500 font-bold tracking-tighter ml-2">OPTIMAL</span></div>
                  </div>
                </div>
              </div>
              <button className="w-full mt-10 py-3 bg-white/5 hover:bg-white/10 text-white text-[10px] font-black uppercase tracking-widest rounded transition border border-white/5">Run Diagnostics</button>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-12 py-12 px-8 border-t border-white/5 text-center">
        <div className="container mx-auto">
          <p className="text-[9px] font-mono text-slate-600 uppercase tracking-[0.4em]">
            © 2024 Orion Machine Diagnostics System. Part of Orion Pro CMS.
          </p>
        </div>
      </footer>
    </div>
  );
}
