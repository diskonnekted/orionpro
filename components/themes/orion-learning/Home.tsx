import Header from './Header';
import Hero from './Hero';
import Materials from './Materials';
import Steps from './Steps';
import Footer from './Footer';

export default function OrionLearningHome() {
  return (
    <div className="bg-white min-h-screen font-sans text-slate-800">
      <Header />
      <main>
        <Hero />
        <Materials />
        <Steps />
        <section className="py-24 bg-orange-600 text-white text-center">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl md:text-5xl font-bold mb-8">Siap Mencetak Karyamu Sendiri?</h2>
                <p className="text-xl text-orange-100 mb-10 max-w-2xl mx-auto">
                    Bergabunglah dengan kelas premium kami untuk teknik lanjutan seperti sablon separasi, cabut warna, dan discharge.
                </p>
                <button className="px-10 py-5 bg-white text-orange-600 rounded-full font-bold text-xl hover:bg-orange-50 transition shadow-2xl shadow-black/20 transform hover:-translate-y-1">
                    Daftar Kelas Premium
                </button>
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}