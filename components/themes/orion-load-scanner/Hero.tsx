'use client';
import { BarChart3, Scan, Truck, Settings } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="bg-slate-950 text-white relative overflow-hidden min-h-[700px] flex items-center pt-20 border-b border-amber-500/10">
      <div className="absolute inset-0 z-0">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-slate-950 to-slate-950 z-10"></div>
         <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-20">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-mono mb-8 uppercase tracking-[0.2em]">
              Industrial Load Scanning System v4.0
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-none tracking-tighter uppercase italic">
              Automated<br />
              <span className="text-amber-500">Volume Scanning.</span>
            </h1>
            
            <p className="text-lg text-slate-400 mb-10 leading-relaxed max-w-xl font-mono">
              Solusi pemindaian volume muatan truk berbasis LiDAR & Computer Vision. Akurasi tinggi, integrasi cloud, dan pelaporan otomatis dalam hitungan detik.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/?page=scanner" className="px-8 py-4 bg-amber-500 text-slate-900 font-black uppercase italic tracking-tighter hover:bg-amber-400 transition flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20">
                <Scan className="w-5 h-5" />
                Mulai Pemindaian
              </Link>
              <Link href="/?page=reports" className="px-8 py-4 bg-slate-900 text-white font-bold uppercase italic tracking-tighter border border-slate-800 hover:bg-slate-800 transition flex items-center justify-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Lihat Laporan
              </Link>
            </div>
          </div>

          <div className="flex-1 w-full relative">
            <div className="relative z-10 bg-slate-900 border border-amber-500/30 p-2 rounded-xl shadow-2xl overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-t from-amber-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <img src="/truk1.jpg" alt="Truck Scanning" className="w-full h-auto rounded-lg grayscale group-hover:grayscale-0 transition-all duration-700" />
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <div className="px-3 py-1 bg-amber-500 text-slate-900 font-mono text-[10px] font-bold rounded">LIVE FEED</div>
                <div className="px-3 py-1 bg-slate-950/80 backdrop-blur text-white font-mono text-[10px] rounded border border-white/10 italic tracking-widest uppercase animate-pulse">Scanning...</div>
              </div>
            </div>
            
            {/* Stats Overlay */}
            <div className="absolute -bottom-6 -left-6 z-20 bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-2xl flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center">
                <Truck className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <div className="text-2xl font-black text-white leading-none">1,284</div>
                <div className="text-[10px] text-slate-500 font-mono uppercase tracking-wider mt-1">Trucks Scanned Today</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
