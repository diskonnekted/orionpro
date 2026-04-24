'use client';

import Header from './Header';
import Footer from './Footer';

export default function Contact() {
  return (
    <div className="bg-white min-h-screen font-sans text-slate-800">
      <Header />
      
      <main>
        <div className="bg-slate-900 py-20 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-white mb-4">Contact Support</h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Need help with your Orion CMS installation? We are here to assist you.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16 max-w-2xl">
          <div className="bg-white p-8 rounded-lg shadow-md border border-slate-200">
            <h2 className="text-2xl font-bold mb-6 text-slate-800">Get in Touch</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                <input type="text" className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input type="email" className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                <textarea rows={4} className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"></textarea>
              </div>
              <button type="button" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">
                Submit Request
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
