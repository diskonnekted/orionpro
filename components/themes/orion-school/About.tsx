import Header from './Header';
import Hero from './Hero';
import Footer from './Footer';

export default function About() {
  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-800">
      <Header />
      
      {/* Page Header */}
      <div className="bg-blue-900 py-20 text-white relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Profil Sekolah</h1>
          <p className="text-blue-100 max-w-2xl mx-auto text-lg">Mengenal lebih dekat sejarah, visi, dan misi kami.</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 text-slate-50">
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" fill="currentColor">
              <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"></path>
           </svg>
        </div>
      </div>

      <main className="container mx-auto px-4 py-16 space-y-20">
        
        {/* Sejarah Section */}
        <section className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-lg border border-slate-100">
          <h2 className="text-3xl font-bold text-blue-900 mb-6 border-l-8 border-yellow-500 pl-4">Sejarah Singkat</h2>
          <div className="prose prose-lg prose-slate text-slate-600">
            <p className="lead text-xl text-slate-800 font-medium mb-6">
              Orion School didirikan pada tahun 1990 dengan semangat untuk memberikan pendidikan berkualitas bagi masyarakat sekitar.
            </p>
            <p className="mb-4">
              Berawal dari sebuah gedung sederhana dengan 3 ruang kelas, kini kami telah berkembang menjadi institusi pendidikan modern yang dilengkapi dengan berbagai fasilitas penunjang pembelajaran.
            </p>
            <p>
              Pada tahun 2005, sekolah kami mendapatkan akreditasi A dan mulai membuka program kelas internasional. Inovasi terus kami lakukan demi menjawab tantangan zaman, termasuk integrasi teknologi dalam setiap proses pembelajaran.
            </p>
          </div>
          
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-6 rounded-xl text-center border border-blue-100">
              <div className="text-3xl font-bold text-blue-600 mb-2">1990</div>
              <div className="text-sm text-slate-500">Tahun Berdiri</div>
            </div>
            <div className="bg-blue-50 p-6 rounded-xl text-center border border-blue-100">
              <div className="text-3xl font-bold text-blue-600 mb-2">A</div>
              <div className="text-sm text-slate-500">Akreditasi</div>
            </div>
            <div className="bg-blue-50 p-6 rounded-xl text-center border border-blue-100">
              <div className="text-3xl font-bold text-blue-600 mb-2">1000+</div>
              <div className="text-sm text-slate-500">Alumni</div>
            </div>
            <div className="bg-blue-50 p-6 rounded-xl text-center border border-blue-100">
              <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-sm text-slate-500">Guru & Staf</div>
            </div>
          </div>
        </section>

        {/* Visi Misi Section */}
        <section className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-blue-500 hover:shadow-xl transition duration-300">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
              <span className="bg-blue-100 text-blue-600 w-12 h-12 rounded-xl flex items-center justify-center mr-4 shadow-sm text-2xl">
                👁️
              </span>
              Visi
            </h2>
            <p className="text-slate-600 italic text-lg leading-relaxed bg-slate-50 p-6 rounded-xl border border-slate-100">
              "Menjadi sekolah unggulan yang melahirkan generasi cerdas, berkarakter mulia, dan berwawasan global pada tahun 2030."
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-yellow-500 hover:shadow-xl transition duration-300">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
              <span className="bg-yellow-100 text-yellow-600 w-12 h-12 rounded-xl flex items-center justify-center mr-4 shadow-sm text-2xl">
                🚀
              </span>
              Misi
            </h2>
            <ul className="space-y-4 text-slate-600">
              <li className="flex items-start bg-slate-50 p-3 rounded-lg border border-slate-100">
                <span className="text-yellow-500 mr-3 mt-0.5">✓</span>
                Menyelenggarakan pendidikan yang integratif dan holistik.
              </li>
              <li className="flex items-start bg-slate-50 p-3 rounded-lg border border-slate-100">
                <span className="text-yellow-500 mr-3 mt-0.5">✓</span>
                Mengembangkan potensi siswa secara optimal sesuai bakat.
              </li>
              <li className="flex items-start bg-slate-50 p-3 rounded-lg border border-slate-100">
                <span className="text-yellow-500 mr-3 mt-0.5">✓</span>
                Menanamkan nilai-nilai karakter, disiplin, dan budi pekerti luhur.
              </li>
            </ul>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
