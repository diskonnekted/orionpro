import Header from './Header';
import Footer from './Footer';

export default function Contact() {
  return (
    <div className="bg-white min-h-screen font-sans text-slate-800">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-12">
              <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Get In Touch</h1>
              <p className="text-xl text-slate-500">I'm currently available for freelance work.</p>
           </div>
           
           <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 md:p-12">
              <form className="space-y-6">
                 <div className="grid md:grid-cols-2 gap-6">
                    <div>
                       <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                       <input type="text" className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-slate-50" placeholder="John Doe" />
                    </div>
                    <div>
                       <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                       <input type="email" className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-slate-50" placeholder="john@example.com" />
                    </div>
                 </div>
                 
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
                    <input type="text" className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-slate-50" placeholder="Project Inquiry" />
                 </div>
                 
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                    <textarea rows={5} className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-slate-50" placeholder="Tell me about your project..."></textarea>
                 </div>
                 
                 <div className="pt-4">
                    <button type="button" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
                       Send Message
                    </button>
                 </div>
              </form>
           </div>
           
           <div className="mt-12 text-center">
              <p className="text-slate-500 mb-4">Or connect with me on social media:</p>
              <div className="flex justify-center space-x-6">
                 <a href="#" className="text-slate-400 hover:text-blue-600 transition">Twitter</a>
                 <a href="#" className="text-slate-400 hover:text-blue-600 transition">GitHub</a>
                 <a href="#" className="text-slate-400 hover:text-blue-600 transition">LinkedIn</a>
                 <a href="#" className="text-slate-400 hover:text-blue-600 transition">Instagram</a>
              </div>
           </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
