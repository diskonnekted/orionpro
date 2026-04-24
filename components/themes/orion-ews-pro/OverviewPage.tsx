
'use client';

import { Shield, Users, Target, Zap, Globe } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

export default function OverviewPage() {
  return (
    <div className="bg-slate-950 min-h-screen font-sans text-slate-200">
      <Header />
      
      {/* Overview Hero */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/10"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">About Orion EWS Pro</h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Sistem Peringatan Dini Bencana Terintegrasi yang menggabungkan teknologi IoT mutakhir dengan edukasi masyarakat untuk menciptakan lingkungan yang tangguh bencana.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-500">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Misi Keselamatan</h3>
              <p className="text-slate-400">
                Memberikan peringatan sedini mungkin untuk meminimalkan risiko korban jiwa dan kerugian materi akibat bencana alam.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-orange-500">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Teknologi Cepat</h3>
              <p className="text-slate-400">
                Memanfaatkan sensor IoT real-time dengan latensi rendah untuk pemantauan kondisi lingkungan yang akurat 24/7.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-green-500">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Edukasi Publik</h3>
              <p className="text-slate-400">
                Meningkatkan kesadaran dan kesiapsiagaan masyarakat melalui informasi yang mudah dipahami dan aksesibel.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* System Architecture */}
      <section className="py-20 border-t border-slate-800">
         <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center gap-12">
               <div className="md:w-1/2">
                  <h2 className="text-3xl font-bold text-white mb-6">Arsitektur Sistem</h2>
                  <div className="space-y-6">
                     <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700 font-bold text-slate-400">1</div>
                        <div>
                           <h4 className="text-lg font-bold text-white">Sensor Node</h4>
                           <p className="text-slate-400 text-sm">Perangkat keras di lapangan (Ultrasonic, Gyro, Vibration) yang mengumpulkan data mentah.</p>
                        </div>
                     </div>
                     <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700 font-bold text-slate-400">2</div>
                        <div>
                           <h4 className="text-lg font-bold text-white">IoT Gateway</h4>
                           <p className="text-slate-400 text-sm">Mengirimkan data dari sensor ke server pusat melalui jaringan internet/seluler.</p>
                        </div>
                     </div>
                     <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700 font-bold text-slate-400">3</div>
                        <div>
                           <h4 className="text-lg font-bold text-white">Orion Pro Server</h4>
                           <p className="text-slate-400 text-sm">Pusat pengolahan data, analisis risiko, dan manajemen notifikasi peringatan.</p>
                        </div>
                     </div>
                     <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700 font-bold text-slate-400">4</div>
                        <div>
                           <h4 className="text-lg font-bold text-white">Public Interface</h4>
                           <p className="text-slate-400 text-sm">Dashboard web dan mobile yang menyajikan informasi visual kepada pengguna.</p>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="md:w-1/2 bg-slate-900 p-8 rounded-2xl border border-slate-800 flex items-center justify-center min-h-[300px]">
                  {/* Simple Diagram Visualization */}
                  <div className="relative w-full max-w-sm">
                     <div className="flex justify-between mb-12">
                        <div className="p-4 bg-slate-800 rounded-lg border border-slate-700 text-xs font-mono text-center w-24">SENSOR</div>
                        <div className="p-4 bg-slate-800 rounded-lg border border-slate-700 text-xs font-mono text-center w-24">GATEWAY</div>
                     </div>
                     <div className="absolute top-8 left-1/2 -translate-x-1/2 w-full h-px border-t-2 border-dashed border-slate-700 -z-10"></div>
                     
                     <div className="flex justify-center mb-12 relative">
                        <div className="p-6 bg-blue-900/20 rounded-full border-2 border-blue-500 text-blue-400 font-bold z-10 bg-slate-950">
                           SERVER
                        </div>
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-px border-l-2 border-dashed border-slate-700 -z-10 h-24 -mt-12"></div>
                     </div>

                     <div className="flex justify-center">
                        <div className="p-4 bg-green-900/20 rounded-lg border border-green-500 text-green-400 text-xs font-bold w-full text-center">
                           WEB DASHBOARD (CLIENT)
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      <Footer />
    </div>
  );
}
