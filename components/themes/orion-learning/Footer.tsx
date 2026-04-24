import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-50 pt-16 pb-8 border-t border-slate-200">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-2xl font-bold text-slate-900 mb-4 block">
              ScreenPrint<span className="text-orange-600">Master</span>
            </Link>
            <p className="text-slate-600 mb-6 max-w-sm">
              Platform belajar sablon manual #1 di Indonesia. Kami membantu pemula menjadi profesional dengan materi yang mudah dipahami.
            </p>
            <div className="flex space-x-4">
              {['facebook', 'twitter', 'instagram', 'youtube'].map((social) => (
                <a key={social} href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-400 hover:text-orange-600 hover:bg-orange-50 transition shadow-sm border border-slate-100">
                  <span className="sr-only">{social}</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-slate-900 mb-6">Materi Belajar</h4>
            <ul className="space-y-4">
              <li><Link href="#" className="text-slate-600 hover:text-orange-600 transition">Pengenalan Alat</Link></li>
              <li><Link href="#" className="text-slate-600 hover:text-orange-600 transition">Teknik Afdruk</Link></li>
              <li><Link href="#" className="text-slate-600 hover:text-orange-600 transition">Mixing Warna</Link></li>
              <li><Link href="#" className="text-slate-600 hover:text-orange-600 transition">Sablon Raster</Link></li>
              <li><Link href="#" className="text-slate-600 hover:text-orange-600 transition">Sablon Plastisol</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6">Bantuan</h4>
            <ul className="space-y-4">
              <li><Link href="#" className="text-slate-600 hover:text-orange-600 transition">FAQ</Link></li>
              <li><Link href="#" className="text-slate-600 hover:text-orange-600 transition">Forum Diskusi</Link></li>
              <li><Link href="#" className="text-slate-600 hover:text-orange-600 transition">Kontak Mentor</Link></li>
              <li><Link href="#" className="text-slate-600 hover:text-orange-600 transition">Syarat & Ketentuan</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-200 pt-8 text-center text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} ScreenPrintMaster by Orion Pro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}