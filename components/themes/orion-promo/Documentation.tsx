import Link from 'next/link';

export default function Documentation() {
  return (
    <div className="bg-slate-50 min-h-screen pt-24">
        {/* Hero Header */}
        <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-brand-900 text-white py-20 lg:py-28 overflow-hidden rounded-b-[3rem] shadow-2xl">
            {/* Background Patterns */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-32 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>
            </div>
            
            <div className="container mx-auto px-6 relative z-10 text-center">
                <div className="inline-flex items-center gap-2 py-1 px-4 rounded-full bg-white/10 border border-white/20 text-brand-300 text-sm font-semibold mb-8 backdrop-blur-md shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse"></span>
                    Dokumentasi Resmi v1.0
                </div>
                
                <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
                        Kuasai Orion CMS
                    </span>
                </h1>
                
                <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10 font-light">
                    Panduan komprehensif untuk membangun website modern dengan performa tinggi menggunakan Orion CMS.
                </p>
                
                {/* Search Box (Visual) */}
                <div className="max-w-2xl mx-auto relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-500 to-purple-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
                    <div className="relative flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-4 shadow-xl transition-transform transform group-hover:scale-[1.01]">
                        <svg className="w-6 h-6 text-slate-300 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        <input type="text" placeholder="Cari artikel, tutorial, atau referensi API..." className="bg-transparent border-none text-white placeholder-slate-400 focus:ring-0 w-full outline-none text-lg" />
                        <span className="hidden md:block text-xs text-slate-400 border border-white/10 px-2 py-1 rounded bg-black/20">Ctrl + K</span>
                    </div>
                </div>
            </div>
        </div>

        {/* Main Content Grid */}
        <div className="container mx-auto px-6 py-16 relative z-20">
            <div className="flex flex-col lg:flex-row gap-12">
                {/* Sidebar Navigation */}
                <div className="w-full lg:w-72 flex-shrink-0">
                    <div className="sticky top-32 bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                        <div className="p-5 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                            <h3 className="font-bold text-slate-800 uppercase text-xs tracking-wider">Daftar Isi</h3>
                            <span className="text-xs text-slate-400">6 Topik</span>
                        </div>
                        <nav className="p-3">
                            <ul className="space-y-1">
                                <li>
                                    <a href="#pengenalan" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:text-brand-600 hover:bg-brand-50 rounded-xl transition-all group">
                                        <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-xs group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                        </span>
                                        <span className="font-medium text-sm">Pengenalan</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#fitur-utama" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:text-brand-600 hover:bg-brand-50 rounded-xl transition-all group">
                                        <span className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center text-xs group-hover:bg-purple-600 group-hover:text-white transition-colors">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 3.214L13 21l-2.286-6.857L5 12l5.714-3.214L13 3z"></path></svg>
                                        </span>
                                        <span className="font-medium text-sm">Fitur Utama</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#instalasi" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:text-brand-600 hover:bg-brand-50 rounded-xl transition-all group">
                                        <span className="w-8 h-8 rounded-lg bg-green-100 text-green-600 flex items-center justify-center text-xs group-hover:bg-green-600 group-hover:text-white transition-colors">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                                        </span>
                                        <span className="font-medium text-sm">Instalasi</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#manajemen-iot" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:text-brand-600 hover:bg-brand-50 rounded-xl transition-all group">
                                        <span className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center text-xs group-hover:bg-orange-600 group-hover:text-white transition-colors">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path></svg>
                                        </span>
                                        <span className="font-medium text-sm">Manajemen IoT</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 space-y-12">
                    <section id="pengenalan" className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/30">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </div>
                            <h2 className="text-3xl font-bold text-slate-900">Apa itu Orion CMS?</h2>
                        </div>
                        <div className="prose prose-slate max-w-none">
                            <p className="text-lg leading-relaxed text-slate-600 mb-6">
                                Orion Pro CMS adalah platform manajemen konten tingkat lanjut yang dirancang khusus untuk pengembang IoT dan otomasi. Dibangun di atas Next.js 15, platform ini menawarkan kecepatan luar biasa dan skalabilitas tinggi.
                            </p>
                            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl my-8">
                                <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    Tujuan Kami
                                </h4>
                                <p className="text-blue-800 m-0">
                                    Memberikan kendali penuh kepada praktisi IoT dalam mengelola data sensor, visualisasi real-time, dan kontrol perangkat dalam satu dasbor terpusat.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section id="instalasi" className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-green-600 text-white flex items-center justify-center shadow-lg shadow-green-500/30">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                            </div>
                            <h2 className="text-3xl font-bold text-slate-900">Langkah Instalasi</h2>
                        </div>
                        <div className="prose prose-slate max-w-none text-slate-600">
                            <ol className="space-y-4">
                                <li>
                                    <strong>Persiapan Environment:</strong> Pastikan Anda telah menginstal Node.js v18+ dan MySQL v8.0+.
                                </li>
                                <li>
                                    <strong>Ekstrak Paket:</strong> Unduh paket Orion Pro dari area download dan ekstrak ke direktori server Anda.
                                </li>
                                <li>
                                    <strong>Konfigurasi Database:</strong> Buat database baru di MySQL dan sesuaikan file <code>.env</code> dengan kredensial Anda.
                                </li>
                                <li>
                                    <strong>Menjalankan Aplikasi:</strong> Jalankan perintah <code>npm install</code> diikuti dengan <code>npm run dev</code> untuk memulai server pengembangan.
                                </li>
                            </ol>
                        </div>
                    </section>

                    <section id="manajemen-iot" className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-orange-600 text-white flex items-center justify-center shadow-lg shadow-orange-500/30">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path></svg>
                            </div>
                            <h2 className="text-3xl font-bold text-slate-900">Manajemen IoT</h2>
                        </div>
                        <div className="prose prose-slate max-w-none text-slate-600">
                            <p className="mb-4">
                                Orion Pro menyertakan modul IoT bawaan yang mendukung berbagai protokol komunikasi.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose">
                                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                                    <h4 className="font-bold text-slate-800 mb-2">Device Token</h4>
                                    <p className="text-sm">Setiap perangkat menggunakan token unik untuk otentikasi API yang aman.</p>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                                    <h4 className="font-bold text-slate-800 mb-2">Telemetry Data</h4>
                                    <p className="text-sm">Penyimpanan data sensor terstruktur dalam format JSON untuk fleksibilitas maksimal.</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </div>
  );
}
