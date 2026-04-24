'use client';
import { CloudRain, Wind, Map, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="bg-slate-900 text-white relative overflow-hidden min-h-[600px] flex items-center pt-20">
      {/* Background Effect */}
      <div className="absolute inset-0 z-0">
         <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-slate-900/90 to-slate-900 z-10"></div>
         <img src="https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&w=1920&q=80" alt="Weather background" className="w-full h-full object-cover opacity-40" />
      </div>

      <div className="container mx-auto px-6 relative z-20">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-400 text-sm font-bold mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              REAL-TIME BMKG DATA
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Prakiraan Cuaca<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                Presisi & Terpercaya.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Dapatkan informasi cuaca terkini di seluruh wilayah Indonesia langsung dari sumber resmi BMKG. Pantau potensi hujan, angin kencang, dan suhu udara dengan visualisasi peta interaktif.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/?page=weather" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition flex items-center justify-center gap-2 shadow-xl shadow-blue-600/20 group">
                <Map className="w-5 h-5" />
                Buka Peta Interaktif
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/?page=documentation" className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold transition flex items-center justify-center gap-2 border border-slate-700">
                Baca Panduan
              </Link>
            </div>
          </div>

          <div className="flex-1 w-full max-w-md lg:max-w-none">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl transform hover:-translate-y-2 transition-transform duration-300">
                <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-4">
                  <CloudRain className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="font-bold text-white text-lg mb-1">Curah Hujan</h3>
                <p className="text-slate-400 text-sm">Monitoring intensitas hujan real-time.</p>
              </div>
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl mt-8 transform hover:-translate-y-2 transition-transform duration-300">
                <div className="w-12 h-12 bg-cyan-500/20 rounded-2xl flex items-center justify-center mb-4">
                  <Wind className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="font-bold text-white text-lg mb-1">Kecepatan Angin</h3>
                <p className="text-slate-400 text-sm">Data arah dan kecepatan angin terkini.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
