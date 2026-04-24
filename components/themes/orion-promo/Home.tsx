import Header from './Header';
import Hero from './Hero';
import Stats from './Stats';
import Features from './Features';
import ThemeShowcase from './ThemeShowcase';
import News from './News';
import CTA from './CTA';
import Footer from './Footer';
import Download from './Download';
import Documentation from './Documentation';

interface HomeProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function OrionPromoHome({ searchParams }: HomeProps) {
  const params = await searchParams;
  const page = typeof params.page === 'string' ? params.page : null;

  return (
    <div className="bg-white min-h-screen font-sans text-slate-800">
      <Header />
      <main>
        {page === 'download' ? (
          <Download />
        ) : page === 'documentation' ? (
          <Documentation />
        ) : (
          <>
            <Hero />
            <Stats />
            <Features />
            <ThemeShowcase />
            <News />
            <CTA />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
