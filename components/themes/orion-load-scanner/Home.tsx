import Header from './Header';
import Hero from './Hero';
import Monitor from './Monitor';
import Footer from './Footer';

interface HomeProps {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function OrionLoadScannerHome({ searchParams }: HomeProps) {
  const params = searchParams ? await searchParams : {};
  const page = typeof params.page === 'string' ? params.page : null;

  return (
    <div className="bg-slate-950 min-h-screen font-sans text-slate-100 selection:bg-amber-500 selection:text-slate-900">
      <Header />
      <main>
        {page === 'scanner' ? (
          <Monitor />
        ) : page === 'reports' ? (
          <div className="pt-32 pb-20 container mx-auto px-6">
            <h1 className="text-4xl font-black uppercase italic tracking-tighter mb-8">Industrial <span className="text-amber-500">Reports</span></h1>
            <div className="bg-slate-900 border border-white/5 p-12 rounded-xl text-center">
              <p className="text-slate-400 font-mono">Report generation module is being initialized...</p>
            </div>
          </div>
        ) : (
          <>
            <Hero />
            <Monitor />
            {/* Additional sections for the load scanner home page could go here */}
            <section className="py-24 bg-slate-950 border-t border-white/5 relative overflow-hidden">
               <div className="container mx-auto px-6 relative z-10">
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                   <div className="space-y-4">
                     <div className="text-amber-500 font-mono text-[10px] uppercase tracking-[0.3em] font-bold">Technology</div>
                     <h3 className="text-2xl font-black uppercase italic tracking-tighter">Precision LiDAR</h3>
                     <p className="text-slate-500 text-sm font-mono leading-relaxed">Menggunakan sensor LiDAR kelas industri untuk pemetaan 3D muatan dengan akurasi hingga 99%.</p>
                   </div>
                   <div className="space-y-4">
                     <div className="text-amber-500 font-mono text-[10px] uppercase tracking-[0.3em] font-bold">Processing</div>
                     <h3 className="text-2xl font-black uppercase italic tracking-tighter">Edge Computing</h3>
                     <p className="text-slate-500 text-sm font-mono leading-relaxed">Pemrosesan data secara real-time di lokasi (on-site) untuk hasil instan tanpa ketergantungan internet.</p>
                   </div>
                   <div className="space-y-4">
                     <div className="text-amber-500 font-mono text-[10px] uppercase tracking-[0.3em] font-bold">Integration</div>
                     <h3 className="text-2xl font-black uppercase italic tracking-tighter">API Ready</h3>
                     <p className="text-slate-500 text-sm font-mono leading-relaxed">Mudah diintegrasikan dengan sistem ERP atau manajemen logistik yang sudah ada melalui REST API.</p>
                   </div>
                 </div>
               </div>
            </section>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
