import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="mb-6 md:mb-0 text-left">
                    <img src="/orion-light.png" alt="Orion Pro" className="h-16 mb-4 block" />
                    <h3 className="text-2xl font-bold text-white mb-2">Orion Pro</h3>
                    <p className="text-slate-400 max-w-xs">Where Professional IoT Meets Powerful Technology. Platform manajemen konten khusus untuk praktisi otomasi dan IoT.</p>
                </div>
                <div className="flex space-x-6">
                    <Link href="/about" className="hover:text-brand-400 transition">Tentang Kami</Link>
                    <Link href="/contact" className="hover:text-brand-400 transition">Hubungi Kami</Link>
                </div>
            </div>
            <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-slate-500">
                &copy; {new Date().getFullYear()} Orion CMS. All rights reserved. ❤️ From <a href="https://www.clasnet.co.id" className="text-brand-400 hover:text-brand-300 transition" target="_blank" rel="noopener noreferrer">Clasnet</a> to You.
            </div>
        </div>
    </footer>
  );
}
