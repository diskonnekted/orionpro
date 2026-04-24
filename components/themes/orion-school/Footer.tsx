export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 border-t-4 border-yellow-500">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-blue-900 font-bold text-xl">
                OS
              </div>
              <h3 className="text-xl font-bold text-white">Orion School</h3>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Mewujudkan generasi cerdas, berkarakter mulia, dan berwawasan global.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Hubungi Kami</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="mr-2">📍</span>
                Jl. Pendidikan No. 123, Jakarta
              </li>
              <li className="flex items-center">
                <span className="mr-2">📞</span>
                (021) 1234-5678
              </li>
              <li className="flex items-center">
                <span className="mr-2">✉️</span>
                info@orionschool.sch.id
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Tautan Cepat</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/about" className="hover:text-white transition">Profil Sekolah</a></li>
              <li><a href="/contact" className="hover:text-white transition">Pendaftaran</a></li>
              <li><a href="#" className="hover:text-white transition">Prestasi</a></li>
              <li><a href="#" className="hover:text-white transition">Agenda</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
          &copy; {new Date().getFullYear()} Orion School. All rights reserved. Powered by Orion Pro.
        </div>
      </div>
    </footer>
  );
}
