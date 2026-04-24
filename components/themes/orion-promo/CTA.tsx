import Link from 'next/link';

export default function CTA() {
  return (
    <section className="py-24 bg-indigo-900 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
            <img src="/assets/img/promo.png" alt="Background" className="w-full h-full object-cover opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/80 via-indigo-800/70 to-purple-900/80"></div>
        </div>

        {/* Abstract Shapes */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl z-0"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-purple-500 opacity-20 rounded-full blur-3xl z-0"></div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Transform Your IoT Projects?</h2>
            <p className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto leading-relaxed">
                Hubungi kami untuk demo gratis dan konsultasi teknis. Tim ahli kami siap membantu Anda membangun sistem IoT yang powerful dan efisien dengan Orion Pro.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/contact" className="px-10 py-5 bg-white text-indigo-600 rounded-full font-bold text-xl hover:bg-indigo-50 transition shadow-2xl shadow-black/20 transform hover:-translate-y-1">
                    Hubungi Kami
                </Link>
                <Link href="/about" className="px-10 py-5 bg-transparent border-2 border-white text-white rounded-full font-bold text-xl hover:bg-white/10 transition">
                    Tentang Kami
                </Link>
            </div>
            <p className="mt-8 text-sm text-indigo-200 opacity-80">
                Orion Pro • Professional IoT Solution • Enterprise Grade
            </p>
        </div>
    </section>
  );
}
