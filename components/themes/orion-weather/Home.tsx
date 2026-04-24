import Header from './Header';
import Hero from './Hero';
import WeatherMap from './WeatherMap';
import Footer from './Footer';
import { Cloud, Droplets, Wind, Thermometer, ShieldCheck, Zap } from 'lucide-react';

export default function Home() {
  return (
    <div className="bg-slate-950 min-h-screen font-sans text-slate-200 selection:bg-blue-500 selection:text-white scroll-smooth">
      <Header />
      
      <main>
        <Hero />
        
        {/* Weather Map Section */}
        <div id="weather-map">
          <WeatherMap />
        </div>

        {/* Features / Why Orion Weather */}
        <section className="py-24 bg-slate-950">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Kenapa Orion Weather?</h2>
              <p className="text-slate-400 max-w-2xl mx-auto text-lg">Platform informasi cuaca tercanggih dengan integrasi data langsung dari BMKG untuk keselamatan dan kenyamanan Anda.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 bg-slate-900/50 border border-slate-800 rounded-3xl hover:border-blue-500/50 transition-colors group">
                <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Akurasi Tinggi</h3>
                <p className="text-slate-400 leading-relaxed">Data diproses langsung dari API Digital Forecast BMKG dengan pembaruan berkala setiap jam.</p>
              </div>

              <div className="p-8 bg-slate-900/50 border border-slate-800 rounded-3xl hover:border-cyan-500/50 transition-colors group">
                <div className="w-14 h-14 bg-cyan-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-8 h-8 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Peringatan Dini</h3>
                <p className="text-slate-400 leading-relaxed">Sistem deteksi otomatis untuk cuaca ekstrem seperti hujan lebat dan badai petir di seluruh Indonesia.</p>
              </div>

              <div className="p-8 bg-slate-900/50 border border-slate-800 rounded-3xl hover:border-purple-500/50 transition-colors group">
                <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Cloud className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Visualisasi Modern</h3>
                <p className="text-slate-400 leading-relaxed">Peta interaktif berbasis Highcharts yang memudahkan Anda memantau kondisi cuaca secara spasial.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Secondary Info Section */}
        <section className="py-24 bg-blue-600 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
            </svg>
          </div>
          <div className="container mx-auto px-6 relative z-10 text-center text-white">
            <h2 className="text-3xl md:text-5xl font-bold mb-8">Siap Menghadapi Perubahan Cuaca?</h2>
            <p className="text-blue-100 mb-10 max-w-xl mx-auto text-lg opacity-90">Gunakan Orion Weather sebagai panduan harian Anda. Tersedia gratis untuk seluruh masyarakat Indonesia.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
                <Thermometer className="w-5 h-5" />
                <span>Monitoring Suhu</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
                <Droplets className="w-5 h-5" />
                <span>Data Kelembaban</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
                <Wind className="w-5 h-5" />
                <span>Kecepatan Angin</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
