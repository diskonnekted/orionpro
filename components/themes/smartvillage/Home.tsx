import Header from './Header';
import Hero from './Hero';
import Footer from './Footer';
import MonitorDashboard from './MonitorDashboard';
// Reuse content pages from orion-promo for now as they are "default" content
import Download from '@/components/themes/orion-promo/Download';
import Documentation from '@/components/themes/orion-promo/Documentation';
import { getDashboardData } from '@/lib/iot/actions';

interface HomeProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function SmartVillageHome({ searchParams }: HomeProps) {
  const params = await searchParams;
  const page = typeof params.page === 'string' ? params.page : null;

  // Fetch data for Hero stats
  const { activeDevices } = await getDashboardData();

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-800">
      <Header />
      <main>
        {page === 'download' ? (
          <Download />
        ) : page === 'documentation' ? (
          <Documentation />
        ) : page === 'monitor' ? (
          <MonitorDashboard />
        ) : (
          <>
            <Hero activeSensors={activeDevices} />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
