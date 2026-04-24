'use client';

import { useState } from 'react';
import { 
  Send, 
  ChevronRight, 
  Rocket, 
  Code2, 
  Layout, 
  Smartphone, 
  Globe, 
  Database,
  CheckCircle2,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

export default function CustomDevelopmentPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: 'web',
    budget: 'medium',
    description: '',
    features: [] as string[]
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // In a real app, you would send this to your API
  };

  const projectTypes = [
    { id: 'web', label: 'Web Application', icon: Globe },
    { id: 'mobile', label: 'Mobile App (iOS/Android)', icon: Smartphone },
    { id: 'iot', label: 'IoT Dashboard & Integration', icon: Database },
    { id: 'custom', label: 'Custom Enterprise Software', icon: Layout },
  ];

  const commonFeatures = [
    'Real-time Monitoring',
    'User Management',
    'Payment Gateway',
    'Data Analytics',
    'Push Notifications',
    'API Integration',
    'PWA Support',
    'Multi-language'
  ];

  const toggleFeature = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
        <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl p-12 text-center border border-slate-100 animate-in zoom-in duration-500">
          <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter mb-4">Permintaan Terkirim!</h1>
          <p className="text-slate-600 mb-10 leading-relaxed font-medium">Terima kasih telah mempercayakan proyek Anda kepada Orion. Tim kami akan meninjau detail pesanan Anda dan menghubungi Anda dalam waktu 24 jam.</p>
          <Link href="/" className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white font-black uppercase italic tracking-widest text-xs rounded-xl hover:bg-blue-600 transition shadow-xl shadow-slate-200">
            <ArrowLeft className="w-4 h-4" /> Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-600 selection:text-white pb-20">
      {/* Header Bar */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <img src="/assets/img/CMS-ORION-ONE.png" alt="Orion Logo" className="h-10 w-auto" />
          </Link>
          <Link href="/" className="text-xs font-black uppercase italic tracking-widest text-slate-500 hover:text-blue-600 transition flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </nav>

      <main className="container mx-auto px-6 pt-16">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.3em] mb-6 rounded-sm shadow-lg shadow-blue-600/20">
              <Rocket className="w-3 h-3" />
              Custom Solutions
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter leading-none uppercase italic mb-6">
              Wujudkan Ide <br />
              <span className="text-blue-600">Digital Anda.</span>
            </h1>
            <p className="text-xl text-slate-500 font-medium max-w-2xl leading-relaxed">
              Isi formulir di bawah ini untuk memulai konsultasi proyek kustom Anda. Kami membantu membangun solusi yang tepat untuk bisnis Anda.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-12">
            {/* Step 1: Personal Info */}
            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-[50px] rounded-full"></div>
              <h3 className="text-xl font-black uppercase italic tracking-tighter text-slate-900 mb-8 flex items-center gap-3">
                <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center not-italic">01</span>
                Informasi Kontak
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Nama Lengkap</label>
                  <input 
                    required
                    type="text" 
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition font-bold"
                    placeholder="Masukkan nama Anda"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Alamat Email</label>
                  <input 
                    required
                    type="email" 
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition font-bold"
                    placeholder="email@perusahaan.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Nama Perusahaan / Organisasi</label>
                  <input 
                    type="text" 
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition font-bold"
                    placeholder="Contoh: PT Orion Digital Solusi"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Project Type */}
            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl p-10 relative overflow-hidden">
              <h3 className="text-xl font-black uppercase italic tracking-tighter text-slate-900 mb-8 flex items-center gap-3">
                <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center not-italic">02</span>
                Tipe Proyek
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {projectTypes.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setFormData({...formData, projectType: type.id})}
                    className={`flex items-center gap-4 p-6 rounded-2xl border-2 transition-all text-left group ${
                      formData.projectType === type.id 
                        ? 'border-blue-600 bg-blue-50 shadow-lg shadow-blue-100' 
                        : 'border-slate-50 bg-slate-50 hover:border-blue-200'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition ${
                      formData.projectType === type.id ? 'bg-blue-600 text-white' : 'bg-white text-slate-400 group-hover:text-blue-500'
                    }`}>
                      <type.icon className="w-6 h-6" />
                    </div>
                    <span className={`font-bold uppercase tracking-tight ${
                      formData.projectType === type.id ? 'text-blue-900' : 'text-slate-600'
                    }`}>{type.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Features & Description */}
            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl p-10 relative overflow-hidden">
              <h3 className="text-xl font-black uppercase italic tracking-tighter text-slate-900 mb-8 flex items-center gap-3">
                <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center not-italic">03</span>
                Kebutuhan & Fitur
              </h3>
              
              <div className="mb-10">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-4 block">Pilih Fitur yang Dibutuhkan</label>
                <div className="flex flex-wrap gap-3">
                  {commonFeatures.map((feature) => (
                    <button
                      key={feature}
                      type="button"
                      onClick={() => toggleFeature(feature)}
                      className={`px-6 py-3 rounded-full text-xs font-bold transition-all border ${
                        formData.features.includes(feature)
                          ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-100'
                          : 'bg-white border-slate-200 text-slate-500 hover:border-blue-300'
                      }`}
                    >
                      {feature}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Deskripsi Proyek</label>
                <textarea 
                  required
                  rows={5}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition font-medium"
                  placeholder="Ceritakan sedikit tentang visi proyek Anda, target pengguna, dan masalah yang ingin diselesaikan..."
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                ></textarea>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex flex-col items-center gap-6">
              <button 
                type="submit"
                className="group relative px-12 py-6 bg-slate-900 text-white font-black uppercase italic tracking-widest text-sm rounded-[2rem] overflow-hidden transition-all hover:bg-blue-600 shadow-2xl shadow-slate-200 hover:-translate-y-1 active:translate-y-0"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Kirim Permintaan <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tim kami akan memproses data Anda secara rahasia.</p>
            </div>
          </form>
        </div>
      </main>

      <footer className="mt-32 pt-16 border-t border-slate-100 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300">
          © 2024 Orion Pro Ecosystem. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
