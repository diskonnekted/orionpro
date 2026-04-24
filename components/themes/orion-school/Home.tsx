import Header from './Header';
import Hero from './Hero';
import Footer from './Footer';
import NewsCard from './NewsCard';
import { GraduationCap, School, Sprout } from 'lucide-react';

// Use same content components as default for now if needed, or build custom ones.
// For School theme, we'll build a custom simple home layout.

export default function Home() {
  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-800">
      <Header />
      <Hero />
      
      <main className="space-y-20 py-20">
        {/* Features Section */}
        <section className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">Mengapa Memilih Orion School?</h2>
            <div className="w-20 h-1 bg-yellow-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 hover:-translate-y-2 transition duration-300">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                <GraduationCap size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Kurikulum Unggulan</h3>
              <p className="text-slate-600 leading-relaxed">
                Menggabungkan kurikulum nasional dengan standar internasional untuk mempersiapkan siswa menghadapi tantangan global.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 hover:-translate-y-2 transition duration-300">
              <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                <School size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Fasilitas Modern</h3>
              <p className="text-slate-600 leading-relaxed">
                Dilengkapi laboratorium, perpustakaan digital, sarana olahraga, dan ruang kelas multimedia yang nyaman.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 hover:-translate-y-2 transition duration-300">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                <Sprout size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Pendidikan Karakter</h3>
              <p className="text-slate-600 leading-relaxed">
                Fokus pada pembentukan akhlak mulia, kepemimpinan, dan kedisiplinan melalui berbagai kegiatan ekstrakurikuler.
              </p>
            </div>
          </div>
        </section>

        {/* Latest News Preview */}
        <section className="bg-white py-20">
          <div className="container mx-auto px-4">
             <div className="flex justify-between items-end mb-12">
                <div>
                   <h2 className="text-3xl font-bold text-blue-900 mb-2">Berita Terbaru</h2>
                   <p className="text-slate-500">Kabar dan kegiatan terkini dari lingkungan sekolah.</p>
                </div>
                <a href="#" className="text-blue-600 font-bold hover:text-blue-800 transition">Lihat Semua →</a>
             </div>

             <div className="grid md:grid-cols-3 gap-8">
                {/* Requested Card */}
                <NewsCard 
                  date="9 Feb 2026"
                  category="Informasi"
                  title="Why do we use it?"
                  excerpt="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."
                  image="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80"
                  slug="why-do-we-use-it"
                />

                {/* News Item 1 */}
                <NewsCard 
                  date="12 Feb 2026"
                  category="Kegiatan Siswa"
                  title="Kunjungan Edukasi ke Museum Nasional"
                  excerpt="Siswa kelas 5 melakukan kunjungan belajar untuk mengenal sejarah kebudayaan Indonesia lebih dekat."
                  image="https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?auto=format&fit=crop&w=800&q=80"
                  slug="kunjungan-edukasi"
                />
                
                {/* News Item 2 */}
                <NewsCard 
                  date="10 Feb 2026"
                  category="Prestasi"
                  title="Tim Robotik Raih Medali Emas"
                  excerpt="Selamat kepada tim robotik Orion School yang berhasil menyabet juara 1 dalam kompetisi nasional."
                  image="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=800&q=80"
                  slug="tim-robotik-emas"
                />
             </div>
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-4">
           <div className="bg-blue-900 rounded-3xl p-12 text-center text-white relative overflow-hidden">
              <div className="relative z-10">
                 <h2 className="text-3xl md:text-4xl font-bold mb-6">Siap Bergabung Bersama Kami?</h2>
                 <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
                    Daftarkan putra-putri Anda sekarang dan jadilah bagian dari keluarga besar Orion School.
                 </p>
                 <a href="/contact" className="inline-block px-8 py-4 bg-yellow-500 text-blue-900 font-bold rounded-xl shadow-lg hover:bg-yellow-400 transition transform hover:-translate-y-1">
                    Daftar Online
                 </a>
              </div>
              
              {/* Decorative circles */}
              <div className="absolute top-0 left-0 w-64 h-64 bg-blue-800 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-50 translate-x-1/2 translate-y-1/2"></div>
           </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
