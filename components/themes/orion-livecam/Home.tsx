'use client';
import { Camera, Video, Shield, Settings, Grid, Play, Info, Phone, Monitor } from 'lucide-react';
import Link from 'next/link';

export default function OrionLivecamHome() {
  const cameras = [
    { id: 'CAM-01', name: 'Main Entrance', status: 'Online', type: 'PTZ 4K', src: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=400&q=80' },
    { id: 'CAM-02', name: 'Warehouse B', status: 'Online', type: 'Bullet HD', src: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80' },
    { id: 'CAM-03', name: 'Parking Lot A', status: 'Online', type: 'Dome 4K', src: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=400&q=80' },
    { id: 'CAM-04', name: 'Server Room', status: 'Warning', type: 'Fixed IR', src: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=400&q=80' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 selection:bg-red-600 selection:text-white">
      {/* Navigation */}
      <nav className="bg-slate-900/80 backdrop-blur-md border-b border-white/5 px-8 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-red-600/20">
            <Video className="w-6 h-6" />
          </div>
          <span className="font-black text-2xl tracking-tighter uppercase italic">Livecam</span>
        </div>
        <div className="hidden lg:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-slate-400">
          <Link href="#" className="text-white">Monitoring</Link>
          <Link href="#" className="hover:text-white transition">Playback</Link>
          <Link href="#" className="hover:text-white transition">Alerts</Link>
          <Link href="#" className="hover:text-white transition">Devices</Link>
        </div>
        <Link href="/login" className="bg-white text-slate-900 px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition shadow-xl">
          Secure Login
        </Link>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative py-20 px-8 border-b border-white/5 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-red-900/10 via-slate-950 to-slate-950">
          <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-600/10 border border-red-600/20 rounded text-red-500 text-[10px] font-black uppercase tracking-[0.3em] mb-8">
                <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
                System Live
              </div>
              <h1 className="text-6xl md:text-7xl font-black text-white mb-8 leading-[0.95] tracking-tighter uppercase italic">
                Advanced <br />
                <span className="text-red-600">Surveillance.</span>
              </h1>
              <p className="text-lg text-slate-400 mb-10 leading-relaxed max-w-lg font-medium">
                Solusi pemantauan video real-time terintegrasi. Akses rekaman kapan saja, di mana saja dengan enkripsi tingkat tinggi dan deteksi cerdas.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-red-600 text-white px-10 py-4 rounded-lg font-black uppercase tracking-widest text-xs flex items-center gap-3 hover:bg-red-700 transition shadow-lg shadow-red-600/20">
                  <Play className="w-4 h-4 fill-current" /> Live View
                </button>
                <button className="bg-slate-900 border border-white/10 text-white px-10 py-4 rounded-lg font-black uppercase tracking-widest text-xs hover:bg-slate-800 transition">
                  Device Status
                </button>
              </div>
            </div>
            <div className="relative group">
              <div className="aspect-video bg-slate-900 rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative">
                <img 
                  src="https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1200&q=80" 
                  alt="Live Surveillance" 
                  className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute top-6 left-6 flex flex-col gap-2">
                  <div className="px-3 py-1 bg-red-600 text-white text-[9px] font-bold rounded uppercase tracking-widest">LIVE</div>
                  <div className="px-3 py-1 bg-black/50 backdrop-blur-md text-white text-[9px] font-mono rounded border border-white/10 tracking-widest">CH 01: MAIN ENTRANCE</div>
                </div>
                <div className="absolute bottom-6 right-6 flex items-center gap-3">
                  <div className="w-3 h-3 bg-red-600 rounded-full animate-ping"></div>
                  <div className="text-[10px] font-mono text-white opacity-80 uppercase">REC 1080P 60FPS</div>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-slate-900 border border-white/10 p-6 rounded-2xl shadow-2xl flex items-center gap-4 group-hover:-translate-y-2 transition-transform duration-500">
                <div className="w-12 h-12 bg-red-600/20 rounded-xl flex items-center justify-center text-red-600">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm font-black text-white uppercase italic tracking-tighter leading-none mb-1">Encrypted Feed</div>
                  <div className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">AES-256 SECURED</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Camera Grid Section */}
        <section className="py-24 px-8 bg-slate-950">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div>
                <h2 className="text-4xl font-black text-white tracking-tighter mb-4 uppercase italic">Camera Network</h2>
                <p className="text-slate-500 max-w-md font-medium">Monitoring status dan aktivitas seluruh kamera di jaringan Anda.</p>
              </div>
              <div className="flex gap-4">
                <button className="p-3 bg-slate-900 border border-white/5 rounded-lg text-slate-400 hover:text-white transition"><Grid className="w-5 h-5" /></button>
                <button className="p-3 bg-slate-900 border border-white/5 rounded-lg text-slate-400 hover:text-white transition"><Monitor className="w-5 h-5" /></button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {cameras.map((cam) => (
                <div key={cam.id} className="bg-slate-900 border border-white/5 rounded-xl overflow-hidden group hover:border-red-600/30 transition-all duration-500">
                  <div className="aspect-video relative overflow-hidden bg-slate-800">
                    <img src={cam.src} alt={cam.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" />
                    <div className={`absolute top-3 right-3 px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-widest ${cam.status === 'Online' ? 'bg-green-500 text-white' : 'bg-amber-500 text-black'}`}>
                      {cam.status}
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="text-xs font-mono text-slate-500 mb-1 tracking-widest uppercase">{cam.id}</div>
                    <div className="text-sm font-black text-white uppercase italic tracking-tighter mb-4">{cam.name}</div>
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                      <span>{cam.type}</span>
                      <button className="text-red-600 hover:text-red-500 transition underline underline-offset-4">Connect</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-950 border-t border-white/5 py-20 px-8 text-center">
        <div className="container mx-auto">
          <div className="flex justify-center items-center gap-3 mb-10">
            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white">
              <Video className="w-5 h-5" />
            </div>
            <span className="font-black text-xl tracking-tighter uppercase italic">Livecam</span>
          </div>
          <p className="text-slate-500 text-xs font-mono uppercase tracking-[0.3em] mb-12">
            © 2024 Orion Pro CMS Ecosystem. All rights reserved.
          </p>
          <div className="flex justify-center gap-12 text-[10px] font-black uppercase tracking-widest text-slate-600">
            <Link href="#" className="hover:text-red-600 transition">Privacy</Link>
            <Link href="#" className="hover:text-red-600 transition">Terms</Link>
            <Link href="#" className="hover:text-red-600 transition">Support</Link>
            <Link href="#" className="hover:text-red-600 transition">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
