import Header from './Header';
import Hero from './Hero';
import Footer from './Footer';

export default function Home() {
  return (
    <div className="bg-white min-h-screen font-sans text-slate-800">
      <Header />
      <Hero />
      
      {/* Services Section */}
      <section id="about" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">What I Do</h2>
                <p className="mt-4 max-w-2xl text-xl text-slate-500 mx-auto">Combining technical expertise with design sensibility.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Service 1 */}
                <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition text-center group">
                    <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Web Development</h3>
                    <p className="text-slate-500">Building fast, responsive, and scalable websites using modern technologies like React, PHP, and Tailwind CSS.</p>
                </div>

                {/* Service 2 */}
                <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition text-center group">
                    <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path></svg>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">UI/UX Design</h3>
                    <p className="text-slate-500">Creating intuitive and aesthetically pleasing user interfaces that provide great user experiences.</p>
                </div>

                {/* Service 3 */}
                <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition text-center group">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Optimization</h3>
                    <p className="text-slate-500">Optimizing performance and SEO to ensure your website reaches its audience effectively.</p>
                </div>
            </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section id="projects" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-12">
                <div>
                    <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Featured Projects</h2>
                    <p className="mt-4 max-w-2xl text-xl text-slate-500">A selection of my recent work.</p>
                </div>
                <a href="#" className="hidden md:inline-flex items-center text-blue-600 font-medium hover:text-blue-700">
                    View All Projects
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Project Card 1 */}
                <div className="group relative bg-white border border-slate-100 rounded-xl shadow-sm hover:shadow-xl transition duration-300 overflow-hidden">
                    <div className="aspect-video bg-slate-200 overflow-hidden relative">
                       <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 transition duration-300 z-10"></div>
                       <img 
                         src="/assets/img/portfolio/shop.png" 
                         alt="Orion Shop" 
                         className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                       />
                    </div>
                    <div className="p-6">
                       <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">E-Commerce</span>
                          <span className="text-slate-400 text-sm">2023</span>
                       </div>
                       <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition">Orion Shop</h3>
                       <p className="text-slate-500 mb-4 line-clamp-2">A full-featured e-commerce platform built with Next.js and Stripe integration.</p>
                       <a href="#" className="inline-flex items-center text-sm font-bold text-slate-900 hover:text-blue-600 transition">
                          View Case Study <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                       </a>
                    </div>
                </div>

                {/* Project Card 2 */}
                <div className="group relative bg-white border border-slate-100 rounded-xl shadow-sm hover:shadow-xl transition duration-300 overflow-hidden">
                    <div className="aspect-video bg-slate-200 overflow-hidden relative">
                       <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 transition duration-300 z-10"></div>
                       <img 
                         src="/assets/img/portfolio/smartvillage.png" 
                         alt="Smart Village" 
                         className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                       />
                    </div>
                    <div className="p-6">
                       <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-bold text-green-600 uppercase tracking-wider">IoT Solution</span>
                          <span className="text-slate-400 text-sm">2024</span>
                       </div>
                       <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition">Smart Village</h3>
                       <p className="text-slate-500 mb-4 line-clamp-2">Comprehensive IoT monitoring system for rural development and agriculture.</p>
                       <a href="#" className="inline-flex items-center text-sm font-bold text-slate-900 hover:text-blue-600 transition">
                          View Case Study <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                       </a>
                    </div>
                </div>


                {/* Project Card 3 */}
                <div className="group relative bg-white border border-slate-100 rounded-xl shadow-sm hover:shadow-xl transition duration-300 overflow-hidden">
                    <div className="aspect-video bg-slate-200 overflow-hidden relative">
                       <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 transition duration-300"></div>
                       {/* Placeholder Image */}
                       <div className="w-full h-full flex items-center justify-center text-slate-400">
                          <span className="font-bold text-3xl">3</span>
                       </div>
                    </div>
                    <div className="p-6">
                       <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-bold text-green-600 uppercase tracking-wider">Web App</span>
                          <span className="text-slate-400 text-sm">2022</span>
                       </div>
                       <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-green-600 transition">Smart Village Dashboard</h3>
                       <p className="text-slate-500 mb-4 line-clamp-2">IoT dashboard for monitoring agricultural sensors in real-time.</p>
                       <a href="#" className="inline-flex items-center text-sm font-bold text-slate-900 hover:text-green-600 transition">
                          View Case Study <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                       </a>
                    </div>
                </div>
            </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
