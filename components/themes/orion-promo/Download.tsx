import Link from 'next/link';
import { stat } from 'fs/promises';
import path from 'path';

export default async function Download() {
  const downloadDir = path.join(process.cwd(), 'public', 'download');
  const coreFile = 'orion-default.zip';
  const corePath = path.join(downloadDir, coreFile);
  
  let hasCore = false;
  let coreSize = '0 KB';
  let updateDate = '';

  try {
    const fileStat = await stat(corePath);
    hasCore = true;
    const sizeBytes = fileStat.size;
    coreSize = (sizeBytes > 1024 * 1024) 
        ? `${(sizeBytes / (1024 * 1024)).toFixed(2)} MB` 
        : `${(sizeBytes / 1024).toFixed(2)} KB`;
    
    updateDate = new Date(fileStat.mtime).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  } catch (error) {
    // File doesn't exist or error accessing it
  }

  return (
    <div className="bg-white min-h-screen pt-20">
      {/* Page Header */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-brand-50 to-white relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10"></div>
          <div className="container mx-auto px-6 text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
                  Download Area
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                  Koleksi lengkap tema dan plugin resmi Orion CMS untuk mempercepat pengembangan website Anda.
              </p>
          </div>
      </section>

      {/* Core Download Section */}
      {hasCore ? (
        <section className="py-12 bg-white border-b border-slate-100">
            <div className="container mx-auto px-6">
                <div className="bg-brand-600 rounded-3xl p-8 md:p-12 shadow-2xl shadow-brand-500/20 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
                    {/* Background Pattern */}
                    <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
                        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="currentColor"></path>
                        </svg>
                    </div>
                    
                    <div className="relative z-10 max-w-2xl text-center md:text-left">
                        <div className="inline-block px-3 py-1 bg-brand-500 rounded-full text-xs font-semibold mb-4 border border-brand-400">
                            Latest Stable Release
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Orion CMS v1.0</h2>
                        <p className="text-brand-100 text-lg mb-6 leading-relaxed">
                            Dapatkan versi terbaru Orion CMS dengan fitur lengkap, performa maksimal, dan keamanan terjamin. Paket instalasi mencakup inti sistem dan tema default.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-brand-200">
                            <div className="flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                Node.js 18+
                            </div>
                            <div className="hidden sm:block w-1 h-1 bg-brand-400 rounded-full"></div>
                            <div className="flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"></path></svg>
                                MySQL 8.0+
                            </div>
                            <div className="hidden sm:block w-1 h-1 bg-brand-400 rounded-full"></div>
                            <div className="flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                                Updated {updateDate}
                            </div>
                        </div>
                    </div>
                    
                    <div className="relative z-10 flex flex-col items-center gap-3 min-w-[200px]">
                        <a href={`/download/${coreFile}`} className="w-full px-8 py-4 bg-white text-brand-600 rounded-xl font-bold text-lg hover:bg-brand-50 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-center flex items-center justify-center">
                            Download Orion Pro
                            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                        </a>
                        <span className="text-brand-200 text-sm font-medium">{coreSize} • ZIP Archive</span>
                    </div>
                </div>
            </div>
        </section>
      ) : (
        <section className="py-12 bg-white border-b border-slate-100">
             <div className="container mx-auto px-6 text-center text-slate-500">
                <p>Download file not found ({coreFile}). Please ensure the file exists in public/download/.</p>
             </div>
        </section>
      )}

      {/* Themes & Plugins Grid */}
      <section className="py-16 bg-slate-50 min-h-[40vh]">
          <div className="container mx-auto px-6">
              <div className="text-center mb-12">
                  <h3 className="text-3xl font-bold text-slate-800 mb-4">Official Themes & Plugins</h3>
                  <p className="text-slate-500 max-w-xl mx-auto">Tingkatkan fungsionalitas website Anda dengan koleksi ekstensi resmi yang telah dioptimasi.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {/* Theme 1 */}
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition duration-300">
                      <div className="h-48 bg-slate-200 relative">
                          <img src="/assets/img/portfolio/smartvillage.png" alt="Smart Village" className="w-full h-full object-cover" />
                      </div>
                      <div className="p-6">
                          <div className="flex justify-between items-start mb-4">
                              <h4 className="font-bold text-xl text-slate-900">Smart Village</h4>
                              <span className="px-2 py-1 bg-green-100 text-green-600 text-[10px] font-bold uppercase rounded">Theme</span>
                          </div>
                          <p className="text-slate-500 text-sm mb-6">Tema khusus untuk monitoring desa cerdas dengan integrasi sensor real-time.</p>
                          <button className="w-full py-2 bg-slate-100 text-slate-600 rounded-lg font-bold text-sm hover:bg-slate-200 transition">Coming Soon</button>
                      </div>
                  </div>

                  {/* Plugin 1 */}
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition duration-300">
                      <div className="h-48 bg-slate-200 relative">
                          <img src="/plugins/orion-shop-manager.png" alt="Shop Manager" className="w-full h-full object-cover" />
                      </div>
                      <div className="p-6">
                          <div className="flex justify-between items-start mb-4">
                              <h4 className="font-bold text-xl text-slate-900">Shop Manager</h4>
                              <span className="px-2 py-1 bg-blue-100 text-blue-600 text-[10px] font-bold uppercase rounded">Plugin</span>
                          </div>
                          <p className="text-slate-500 text-sm mb-6">Kelola inventori dan pesanan toko online Anda langsung dari dasbor Orion.</p>
                          <button className="w-full py-2 bg-slate-100 text-slate-600 rounded-lg font-bold text-sm hover:bg-slate-200 transition">Coming Soon</button>
                      </div>
                  </div>

                  {/* Plugin 2 */}
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition duration-300">
                      <div className="h-48 bg-slate-200 relative">
                          <img src="/plugins/orion-pdf-reader.png" alt="PDF Reader" className="w-full h-full object-cover" />
                      </div>
                      <div className="p-6">
                          <div className="flex justify-between items-start mb-4">
                              <h4 className="font-bold text-xl text-slate-900">PDF Reader</h4>
                              <span className="px-2 py-1 bg-blue-100 text-blue-600 text-[10px] font-bold uppercase rounded">Plugin</span>
                          </div>
                          <p className="text-slate-500 text-sm mb-6">Integrasikan pembaca PDF interaktif untuk dokumen teknis di situs Anda.</p>
                          <button className="w-full py-2 bg-slate-100 text-slate-600 rounded-lg font-bold text-sm hover:bg-slate-200 transition">Coming Soon</button>
                      </div>
                  </div>
              </div>
          </div>
      </section>
    </div>
  );
}
