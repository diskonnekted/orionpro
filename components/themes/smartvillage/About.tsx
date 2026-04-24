'use client';

import Header from './Header';
import Footer from './Footer';

export default function About() {
  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-800">
      <Header />
      
      <main>
        {/* Hero Section */}
        <div className="relative bg-emerald-900 py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
             <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
            </svg>
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">About Smart Village</h1>
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
              Empowering rural communities with modern IoT technology for sustainable agriculture and better living standards.
            </p>
          </div>
        </div>

        {/* Mission Section */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="w-full md:w-1/2">
                <div className="bg-emerald-100 rounded-2xl p-8 relative overflow-hidden h-64 md:h-96 flex items-center justify-center">
                   <span className="text-9xl">🌾</span>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Mission</h2>
                <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                  We believe that technology should not be limited to big cities. By integrating IoT sensors, data analytics, and automated systems into traditional farming, we help farmers increase their yield, reduce resource waste, and make data-driven decisions.
                </p>
                <ul className="space-y-4">
                  {[
                    'Real-time soil and weather monitoring',
                    'Automated irrigation systems',
                    'Data-driven crop planning',
                    'Community resource management'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center text-slate-700 font-medium">
                      <svg className="w-5 h-5 text-emerald-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="py-16 bg-slate-50 border-t border-slate-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-12">The Team Behind</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: 'Dr. Sarah Tani', role: 'Agricultural Scientist', icon: '👩‍🌾' },
                { name: 'Budi Santoso', role: 'IoT Engineer', icon: '👨‍💻' },
                { name: 'Siti Aminah', role: 'Community Manager', icon: '👩‍💼' },
              ].map((member, i) => (
                <div key={i} className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition">
                  <div className="w-24 h-24 bg-emerald-50 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl">
                    {member.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{member.name}</h3>
                  <p className="text-emerald-600 font-medium">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
