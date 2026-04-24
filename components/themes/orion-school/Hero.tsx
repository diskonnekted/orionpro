export default function Hero() {
  return (
    <section className="relative bg-blue-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
        </svg>
      </div>
      
      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10 text-center">
        <span className="inline-block py-1 px-3 rounded-full bg-blue-800 text-blue-200 text-sm font-semibold mb-6 animate-fade-in-up">
          Penerimaan Peserta Didik Baru 2026/2027 Telah Dibuka
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight leading-tight">
          Mewujudkan Generasi <br/>
          <span className="text-yellow-400">Cerdas & Berkarakter</span>
        </h1>
        <p className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto mb-10 leading-relaxed">
          Orion School berkomitmen memberikan pendidikan terbaik dengan kurikulum terintegrasi dan fasilitas modern.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a href="/about" className="px-8 py-4 bg-white text-blue-900 font-bold rounded-xl shadow-lg hover:bg-blue-50 transition transform hover:-translate-y-1">
            Tentang Kami
          </a>
          <a href="/contact" className="px-8 py-4 bg-yellow-500 text-blue-900 font-bold rounded-xl shadow-lg hover:bg-yellow-400 transition transform hover:-translate-y-1">
            Daftar Sekarang
          </a>
        </div>
      </div>
      
      {/* Decorative Bottom Shape */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#f8fafc" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  );
}
