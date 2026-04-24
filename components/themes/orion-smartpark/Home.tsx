'use client';
import { Car, Clock, MapPin, Shield, Info, CreditCard, ArrowRight, Settings, Phone } from 'lucide-react';
import Link from 'next/link';

export default function OrionSmartparkHome() {
  const stats = [
    { label: 'Available Slots', value: '142', sub: 'of 250 total', icon: Car, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Avg. Duration', value: '2.5h', sub: 'Today', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Total Revenue', value: 'Rp 4.2M', sub: 'Today', icon: CreditCard, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Active Alerts', value: '0', sub: 'System normal', icon: Shield, color: 'text-blue-600', bg: 'bg-blue-50' },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-100 px-8 py-5 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white">
            <Car className="w-6 h-6" />
          </div>
          <span className="font-black text-2xl tracking-tight text-slate-900 uppercase">Smartpark</span>
        </div>
        <div className="hidden lg:flex items-center gap-10 text-sm font-bold uppercase tracking-wider text-slate-500">
          <Link href="#" className="text-slate-900 border-b-2 border-slate-900 pb-1">Monitoring</Link>
          <Link href="#" className="hover:text-slate-900 transition pb-1">Reports</Link>
          <Link href="#" className="hover:text-slate-900 transition pb-1">Analytics</Link>
          <Link href="#" className="hover:text-slate-900 transition pb-1">Settings</Link>
        </div>
        <Link href="/login" className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition shadow-lg shadow-slate-200">
          Admin Login
        </Link>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative py-24 px-8 overflow-hidden border-b border-slate-50">
          <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block px-4 py-1.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] mb-8">
                Next-Gen Parking Solution
              </div>
              <h1 className="text-6xl font-black text-slate-900 mb-8 leading-[1.1] tracking-tighter">
                Intelligent <br />
                <span className="text-slate-400">Space Management.</span>
              </h1>
              <p className="text-xl text-slate-500 mb-10 leading-relaxed max-w-xl">
                Optimalkan kapasitas parkir Anda dengan sensor pintar dan analitik real-time. Tingkatkan efisiensi operasional dan kepuasan pelanggan.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-slate-900 text-white px-10 py-4 rounded-full font-black uppercase tracking-widest text-xs flex items-center gap-3 hover:bg-slate-800 transition">
                  Live Monitor <ArrowRight className="w-4 h-4" />
                </button>
                <button className="bg-white border-2 border-slate-900 text-slate-900 px-10 py-4 rounded-full font-black uppercase tracking-widest text-xs hover:bg-slate-50 transition">
                  Documentation
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-[40px] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700">
                <img 
                  src="https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=800&q=80" 
                  alt="Parking Lot" 
                  className="w-full h-[500px] object-cover"
                />
              </div>
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
            </div>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="py-20 px-8 bg-slate-50/50">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <div key={i} className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 group">
                  <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <stat.icon className="w-7 h-7" />
                  </div>
                  <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">{stat.label}</div>
                  <div className="text-4xl font-black text-slate-900 mb-1 tracking-tighter">{stat.value}</div>
                  <div className="text-xs text-slate-500 font-medium">{stat.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Preview */}
        <section className="py-24 px-8">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div>
                <h2 className="text-4xl font-black text-slate-900 tracking-tighter mb-4 uppercase">Core Capabilities</h2>
                <p className="text-slate-500 max-w-md">Solusi lengkap untuk pengelolaan gedung parkir, area komersial, dan ruang publik.</p>
              </div>
              <Link href="#" className="text-slate-900 font-black uppercase tracking-widest text-xs border-b-2 border-slate-900 pb-1">
                View All Features
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="space-y-6">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center font-black">01</div>
                <h3 className="text-xl font-black uppercase tracking-tight">Real-time Occupancy</h3>
                <p className="text-slate-500 text-sm leading-relaxed">Pantau ketersediaan slot parkir setiap detik dengan akurasi tinggi menggunakan sensor ultrasonik atau kamera AI.</p>
              </div>
              <div className="space-y-6">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center font-black">02</div>
                <h3 className="text-xl font-black uppercase tracking-tight">Automated Billing</h3>
                <p className="text-slate-500 text-sm leading-relaxed">Integrasi sistem pembayaran cashless (E-Money, QRIS) untuk mempercepat proses masuk dan keluar kendaraan.</p>
              </div>
              <div className="space-y-6">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center font-black">03</div>
                <h3 className="text-xl font-black uppercase tracking-tight">ANPR Integration</h3>
                <p className="text-slate-500 text-sm leading-relaxed">Automatic Number Plate Recognition untuk keamanan ekstra dan identifikasi kendaraan secara otomatis tanpa tiket fisik.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-900 text-white py-20 px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
            <div className="col-span-1 lg:col-span-2">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-900">
                  <Car className="w-6 h-6" />
                </div>
                <span className="font-black text-2xl tracking-tight uppercase">Smartpark</span>
              </div>
              <p className="text-slate-400 max-w-sm leading-relaxed mb-8">
                Orion Smartpark adalah bagian dari ekosistem Orion Pro CMS, dirancang khusus untuk efisiensi pengelolaan parkir modern.
              </p>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 transition cursor-pointer"><Settings className="w-5 h-5" /></div>
                <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 transition cursor-pointer"><Phone className="w-5 h-5" /></div>
                <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 transition cursor-pointer"><Info className="w-5 h-5" /></div>
              </div>
            </div>
            <div>
              <h4 className="font-black uppercase tracking-widest text-xs mb-8">Quick Links</h4>
              <ul className="space-y-4 text-sm text-slate-400">
                <li><Link href="#" className="hover:text-white transition">Dashboard</Link></li>
                <li><Link href="#" className="hover:text-white transition">Analytics</Link></li>
                <li><Link href="#" className="hover:text-white transition">Device Status</Link></li>
                <li><Link href="#" className="hover:text-white transition">User Logs</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black uppercase tracking-widest text-xs mb-8">Legal</h4>
              <ul className="space-y-4 text-sm text-slate-400">
                <li><Link href="#" className="hover:text-white transition">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-white transition">Terms of Use</Link></li>
                <li><Link href="#" className="hover:text-white transition">License Info</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-10 border-t border-white/5 text-center text-slate-500 text-[10px] font-bold uppercase tracking-[0.3em]">
            © 2024 Orion Pro CMS Ecosystem. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
