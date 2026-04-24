'use client';

import { useState } from 'react';
import Link from 'next/link';
import { User, Mail, Lock, ArrowRight, BookOpen } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

export default function Register() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulation of registration logic
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <Header />
      
      <main className="flex-grow flex items-center justify-center py-20 px-6">
        <div className="max-w-4xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
          
          {/* Left Side - Image/Info */}
          <div className="md:w-1/2 bg-slate-900 text-white p-12 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/assets/img/learning/printing.jpg')] bg-cover bg-center opacity-20"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 to-orange-900/80"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-8 text-orange-500">
                <BookOpen className="w-8 h-8" />
                <span className="font-bold text-xl tracking-tight">Orion Learning</span>
              </div>
              
              <h2 className="text-3xl font-bold mb-4 leading-tight">
                Mulai Perjalanan Sablonmu Hari Ini
              </h2>
              <p className="text-slate-300 leading-relaxed">
                Bergabunglah dengan ribuan siswa lainnya. Dapatkan akses ke materi eksklusif, video tutorial HD, dan komunitas praktisi sablon.
              </p>
            </div>

            <div className="relative z-10 mt-12">
              <div className="flex -space-x-4 mb-4">
                 {[1,2,3,4].map((i) => (
                   <div key={i} className={`w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-${i+2}00 flex items-center justify-center text-xs font-bold text-slate-800`}>
                      U{i}
                   </div>
                 ))}
              </div>
              <p className="text-sm text-slate-400 font-medium">Bergabung dengan 1,200+ Member</p>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="md:w-1/2 p-12 relative">
            {!isSubmitted ? (
              <>
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-slate-800">Buat Akun Baru</h3>
                  <p className="text-slate-500 mt-2">Daftar gratis untuk akses materi dasar.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Nama Lengkap</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input 
                        type="text" 
                        required
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input 
                        type="email" 
                        required
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input 
                        type="password" 
                        required
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <input type="checkbox" required className="rounded text-orange-500 focus:ring-orange-500" />
                    <span>Saya menyetujui Syarat & Ketentuan</span>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg shadow-lg shadow-orange-500/30 transition transform hover:-translate-y-0.5"
                  >
                    Daftar Sekarang
                  </button>
                </form>

                <div className="mt-8 text-center text-sm text-slate-500">
                  Sudah punya akun? <Link href="/login" className="text-orange-600 font-bold hover:underline">Masuk disini</Link>
                </div>
              </>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-300">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-600">
                  <User className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Pendaftaran Berhasil!</h3>
                <p className="text-slate-500 mb-8 max-w-xs mx-auto">
                  Akun Anda telah dibuat. Silakan lanjut ke halaman materi untuk mulai belajar.
                </p>
                <Link href="/learn" className="px-8 py-3 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition flex items-center">
                  Mulai Belajar <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}