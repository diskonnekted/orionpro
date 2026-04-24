'use client';

import Header from './Header';
import Footer from './Footer';

export default function About() {
  return (
    <div className="bg-white min-h-screen font-sans text-slate-800">
      <Header />
      
      <main>
        {/* Hero Section */}
        <div className="bg-slate-900 py-20 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-white mb-4">About Orion CMS</h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              The modern, flexible, and powerful content management system built for developers and creators.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="py-20 container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg mx-auto">
            <p>
              Orion CMS was born from a simple idea: content management shouldn't be complicated. 
              Whether you are building a personal blog, a corporate website, or a complex web application, 
              Orion provides the tools you need without the bloat you don't.
            </p>
            <h3>Core Philosophy</h3>
            <ul>
              <li><strong>Performance First:</strong> Built on Next.js for blazing fast speeds.</li>
              <li><strong>Developer Experience:</strong> TypeScript support, clean API, and modular architecture.</li>
              <li><strong>Simplicity:</strong> An intuitive admin interface that clients love.</li>
            </ul>
            <p>
              Our team is dedicated to open source and building the best possible web experience.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
