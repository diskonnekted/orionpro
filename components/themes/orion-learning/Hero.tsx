import Link from 'next/link';
import { PlayCircle, ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section id="start" className="pt-32 pb-20 bg-orange-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
         <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
         </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <div className="inline-block px-4 py-1.5 bg-orange-100 text-orange-700 rounded-full text-sm font-bold mb-6 tracking-wide uppercase">
              Free Beginner Course
            </div>
            <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
              Master the Art of <span className="text-orange-600">Screen Printing</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Panduan lengkap belajar sablon manual dari nol. Mulai dari persiapan alat, afdruk screen, hingga teknik penyablonan yang presisi.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/register" className="px-8 py-4 bg-orange-600 text-white rounded-xl font-bold text-lg hover:bg-orange-700 transition flex items-center justify-center shadow-xl shadow-orange-500/20">
                Mulai Belajar
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link href="/learn" className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-xl font-bold text-lg hover:bg-slate-50 transition flex items-center justify-center">
                <PlayCircle className="w-5 h-5 mr-2 text-orange-600" />
                Lihat Video Demo
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-4 text-sm text-slate-500 font-medium">
              <div className="flex -space-x-2">
                 <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white"></div>
                 <div className="w-8 h-8 rounded-full bg-slate-300 border-2 border-white"></div>
                 <div className="w-8 h-8 rounded-full bg-slate-400 border-2 border-white"></div>
              </div>
              <p>Bergabung dengan 1,200+ pembelajar lainnya</p>
            </div>
          </div>
          
          <div className="lg:w-1/2 relative">
             <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white rotate-2 hover:rotate-0 transition duration-500 group cursor-pointer">
                <img src="/assets/img/learning/intro.jpg" alt="Screen Printing Intro" className="w-full h-full object-cover aspect-video group-hover:scale-105 transition duration-700" />
                <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center group-hover:bg-slate-900/30 transition">
                    <div className="text-center p-8">
                         <div className="w-20 h-20 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white shadow-lg animate-pulse group-hover:scale-110 transition">
                            <PlayCircle className="w-10 h-10" fill="currentColor" />
                         </div>
                         <p className="text-white font-bold text-xl drop-shadow-md">Watch Intro Video</p>
                         <p className="text-slate-200 text-sm mt-2 drop-shadow-md">Duration: 2:45</p>
                    </div>
                </div>
             </div>
             
             {/* Decorative Elements */}
             <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
             <div className="absolute -top-6 -right-6 w-24 h-24 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          </div>
        </div>
      </div>
    </section>
  );
}