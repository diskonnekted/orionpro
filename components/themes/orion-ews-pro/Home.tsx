
import Header from './Header';
import Hero from './Hero';
import Monitor from './Monitor';
import DisasterInfo from './DisasterInfo';
import WarningSignals from './WarningSignals';
import Footer from './Footer';

export default function Home() {
  return (
    <div className="bg-slate-950 min-h-screen font-sans text-slate-200 selection:bg-red-500 selection:text-white scroll-smooth">
      <Header />
      
      <main>
        <Hero />
        
        {/* Real-time Status Section */}
        <Monitor />

        {/* Educational Content */}
        <DisasterInfo />
        
        {/* Warning System Explanation */}
        <WarningSignals />
      </main>

      <Footer />
    </div>
  );
}
