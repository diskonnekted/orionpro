import Link from 'next/link';
import { Mail, Phone, MapPin, Linkedin, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white border-t border-amber-500/10 py-20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div>
            <Link href="/" className="text-2xl font-bold text-white flex items-center gap-2 mb-8">
              <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path></svg>
              </div>
              <span className="font-mono tracking-tighter uppercase italic">Load Scanner</span>
            </Link>
            <p className="text-slate-500 font-mono text-xs leading-relaxed mb-8">
              Industrial grade volume scanning system. Providing high-precision data for mining, logistics, and material handling industries.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="w-8 h-8 rounded bg-slate-900 border border-white/5 flex items-center justify-center hover:bg-amber-500 hover:text-slate-900 transition-colors"><Linkedin className="w-4 h-4" /></Link>
              <Link href="#" className="w-8 h-8 rounded bg-slate-900 border border-white/5 flex items-center justify-center hover:bg-amber-500 hover:text-slate-900 transition-colors"><Twitter className="w-4 h-4" /></Link>
              <Link href="#" className="w-8 h-8 rounded bg-slate-900 border border-white/5 flex items-center justify-center hover:bg-amber-500 hover:text-slate-900 transition-colors"><Instagram className="w-4 h-4" /></Link>
            </div>
          </div>

          <div>
            <h4 className="text-amber-500 font-mono text-[10px] uppercase tracking-widest font-bold mb-8 italic">Solutions</h4>
            <ul className="space-y-4 text-xs font-mono text-slate-400">
              <li><Link href="#" className="hover:text-amber-500 transition-colors">LiDAR Volume Analysis</Link></li>
              <li><Link href="#" className="hover:text-amber-500 transition-colors">License Plate Recognition</Link></li>
              <li><Link href="#" className="hover:text-amber-500 transition-colors">Cloud Fleet Management</Link></li>
              <li><Link href="#" className="hover:text-amber-500 transition-colors">Automated Reporting</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-amber-500 font-mono text-[10px] uppercase tracking-widest font-bold mb-8 italic">Company</h4>
            <ul className="space-y-4 text-xs font-mono text-slate-400">
              <li><Link href="#" className="hover:text-amber-500 transition-colors">About Orion</Link></li>
              <li><Link href="#" className="hover:text-amber-500 transition-colors">Documentation</Link></li>
              <li><Link href="#" className="hover:text-amber-500 transition-colors">Case Studies</Link></li>
              <li><Link href="#" className="hover:text-amber-500 transition-colors">API Support</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-amber-500 font-mono text-[10px] uppercase tracking-widest font-bold mb-8 italic">Contact</h4>
            <ul className="space-y-4 text-xs font-mono text-slate-400">
              <li className="flex items-start gap-3"><MapPin className="w-4 h-4 text-amber-500 shrink-0" /> <span>Jl. Kawasan Industri No. 45, Cikarang, Indonesia</span></li>
              <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-amber-500" /> <span>+62 21 8888 9999</span></li>
              <li className="flex items-center gap-3"><Mail className="w-4 h-4 text-amber-500" /> <span>support@orion-pro.id</span></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">
            © 2024 ORION PRO CMS. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8 text-[10px] font-mono text-slate-600 uppercase tracking-widest">
            <Link href="#" className="hover:text-amber-500">Privacy Policy</Link>
            <Link href="#" className="hover:text-amber-500">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
