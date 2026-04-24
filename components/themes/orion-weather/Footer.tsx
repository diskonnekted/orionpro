import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900">
        <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="mb-6 md:mb-0 text-left">
                    <img src="/orion-light.png" alt="Orion Weather" className="h-12 mb-4 block" />
                    <h3 className="text-xl font-bold text-white mb-2">Orion Weather</h3>
                    <p className="text-slate-500 max-w-xs text-sm">Sistem Informasi Cuaca dan Peringatan Dini Terintegrasi. Menggunakan data real-time BMKG Indonesia.</p>
                </div>
                <div className="grid grid-cols-2 gap-8 sm:gap-12">
                    <div>
                        <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Navigasi</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/" className="hover:text-blue-400 transition">Beranda</Link></li>
                            <li><Link href="/?page=weather" className="hover:text-blue-400 transition">Peta Cuaca</Link></li>
                            <li><Link href="/?page=documentation" className="hover:text-blue-400 transition">Panduan</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Sumber Data</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="https://www.bmkg.go.id" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">BMKG Pusat</a></li>
                            <li><a href="https://data.bmkg.go.id" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">BMKG Open Data</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="border-t border-slate-900 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-600">
                <p>&copy; {new Date().getFullYear()} Orion Weather Theme. Powered by Orion Pro CMS.</p>
                <p>Created by <a href="https://www.clasnet.co.id" className="text-blue-900 hover:text-blue-400 transition" target="_blank" rel="noopener noreferrer">Clasnet</a></p>
            </div>
        </div>
    </footer>
  );
}
