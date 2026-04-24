
'use client';
import { ShieldAlert, Info, Bell, Activity } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="bg-slate-900 text-white relative overflow-hidden min-h-[600px] flex items-center">
      {/* Background Effect */}
      <div className="absolute inset-0 z-0">
         <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900/50 z-10"></div>
         {/* Placeholder for disaster thematic background */}
         <img src="https://images.unsplash.com/photo-1454789476662-53eb23ba5907?auto=format&fit=crop&w=1920&q=80" alt="Disaster Warning" className="w-full h-full object-cover opacity-30" />
      </div>

      <div className="container mx-auto px-6 relative z-20 pt-16 pb-16">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/20 border border-red-500/30 text-red-400 text-xs font-bold mb-6 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-red-500"></span>
            SISTEM PERINGATAN DINI AKTIF 24/7
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Kenali Bahaya,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
              Kurangi Risiko Bencana.
            </span>
          </h1>
          
          <p className="text-lg text-slate-300 mb-8 leading-relaxed max-w-2xl">
            Orion EWS Pro menyediakan informasi real-time dan edukasi mitigasi bencana untuk Banjir, Tanah Longsor, dan Gempa Bumi. Keselamatan Anda adalah prioritas kami.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/monitor" className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold transition flex items-center justify-center gap-2 shadow-lg shadow-red-600/30">
              <Activity className="w-5 h-5" />
              Pantau Status Terkini
            </Link>
            <Link href="/overview" className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-bold transition flex items-center justify-center gap-2 border border-slate-700">
              <Info className="w-5 h-5" />
              Pelajari Tanda Bahaya
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
