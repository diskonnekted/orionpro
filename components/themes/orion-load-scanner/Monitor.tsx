'use client';
import { Truck, Activity, Package, Thermometer, ShieldCheck } from 'lucide-react';

export default function Monitor() {
  const stats = [
    { label: 'Truck ID', value: 'B 9284 SFG', icon: Truck },
    { label: 'Payload Vol', value: '32.45 m³', icon: Package },
    { label: 'Confidence', value: '99.2%', icon: ShieldCheck },
    { label: 'System Temp', value: '42°C', icon: Thermometer },
  ];

  return (
    <div className="py-20 bg-slate-900 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">
              Real-time <span className="text-amber-500">Scanning Monitor</span>
            </h2>
            <p className="text-slate-400 font-mono text-sm mt-2">Active Node: ORION-SCAN-01 | Location: Cikarang Plant</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-500 text-[10px] font-mono font-bold uppercase">System Healthy</span>
            </div>
            <div className="text-slate-500 font-mono text-[10px] uppercase tracking-widest">Last Update: 14:22:01</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, i) => (
            <div key={i} className="bg-slate-950 border border-white/5 p-6 rounded-lg hover:border-amber-500/30 transition-colors group">
              <div className="flex items-center justify-between mb-4">
                <stat.icon className="w-5 h-5 text-slate-500 group-hover:text-amber-500 transition-colors" />
                <Activity className="w-4 h-4 text-amber-500/20" />
              </div>
              <div className="text-[10px] text-slate-500 font-mono uppercase tracking-widest mb-1">{stat.label}</div>
              <div className="text-2xl font-black text-white tracking-tighter">{stat.value}</div>
            </div>
          ))}
        </div>

        <div className="bg-slate-950 border border-white/5 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-white/5 flex justify-between items-center bg-slate-900/50">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Recent Scanning Activity</span>
            <button className="text-[10px] font-mono text-amber-500 uppercase hover:underline">View All Logs</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="text-slate-500 border-b border-white/5">
                  <th className="p-4 font-medium">TIMESTAMP</th>
                  <th className="p-4 font-medium">VEHICLE ID</th>
                  <th className="p-4 font-medium">MATERIAL</th>
                  <th className="p-4 font-medium">VOLUME</th>
                  <th className="p-4 font-medium">STATUS</th>
                </tr>
              </thead>
              <tbody className="text-slate-300">
                {[1, 2, 3, 4, 5].map((item) => (
                  <tr key={item} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-4">2024-03-23 14:2{item}:12</td>
                    <td className="p-4 font-bold text-white">B 882{item} XT</td>
                    <td className="p-4 text-slate-400">Coal/Anthracite</td>
                    <td className="p-4 font-bold text-amber-500">28.{item}2 m³</td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 bg-green-500/10 text-green-500 rounded border border-green-500/20 text-[9px] font-bold">SUCCESS</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
