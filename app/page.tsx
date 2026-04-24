import { pool } from '@/lib/db';
import OrionPromoHome from '@/components/themes/orion-promo/Home';
import SmartVillageHome from '@/components/themes/smartvillage/Home';
import OrionSchoolHome from '@/components/themes/orion-school/Home';
import OrionPortfolioHome from '@/components/themes/orion-portfolio/Home';
import OrionEWSProHome from '@/components/themes/orion-ews-pro/Home';
import OrionLoadScannerHome from '@/components/themes/orion-load-scanner/Home';
import OrionSmarthomeHome from '@/components/themes/orion-smarthome/Home';
import OrionSmartparkHome from '@/components/themes/orion-smartpark/Home';
import OrionWeatherHome from '@/components/themes/orion-weather/Home';
import OrionLivecamHome from '@/components/themes/orion-livecam/Home';
import OrionAutomationHome from '@/components/themes/orion-automation/Home';
import OrionMachineMonitorHome from '@/components/themes/orion-machine-monitor/Home';
export const dynamic = 'force-dynamic';

interface HomeProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function getActiveTheme() {
  console.log('DEBUG: getActiveTheme start');
  try {
    if (!pool || typeof pool.query !== 'function') {
      console.error('DEBUG: Pool or pool.query is invalid');
      return 'orion-promo';
    }
    
    // Add a race to prevent hanging if DB is unreachable
    const resultPromise = pool.query('SELECT option_value FROM orion_options WHERE option_name = "active_theme"');
    const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('DB Query Timeout')), 3000));
    
    const result = await Promise.race([resultPromise, timeoutPromise]) as [any, any];
    
    if (result && Array.isArray(result) && result[0]) {
      const rows = result[0];
      const theme = (rows as any[])[0]?.option_value || 'orion-promo';
      console.log('DEBUG: Resolved Active Theme:', theme);
      return theme;
    }
    
    return 'orion-promo';
  } catch (e: any) {
    console.error('DEBUG: Error in getActiveTheme:', e?.message || 'Unknown error');
    // If table doesn't exist or connection failed, return default
    return 'orion-promo';
  }
}

export default async function Home({ searchParams }: HomeProps) {
  // Await searchParams first (standard for Next.js 15+)
  const params = await searchParams;
  const theme = await getActiveTheme();
  
  if (theme === 'smartvillage') {
    return <SmartVillageHome searchParams={searchParams} />;
  }
  
  if (theme === 'orion-school') {
    return <OrionSchoolHome />;
  }

  if (theme === 'orion-portfolio') {
    return <OrionPortfolioHome />;
  }

  if (theme === 'orion-ews-pro') {
    return <OrionEWSProHome searchParams={searchParams} />;
  }
  
  if (theme === 'orion-weather') {
    return <OrionWeatherHome />;
  }

  if (theme === 'orion-load-scanner') return <OrionLoadScannerHome searchParams={searchParams} />;
  if (theme === 'orion-smarthome') return <OrionSmarthomeHome />;
  if (theme === 'orion-smartpark') return <OrionSmartparkHome />;
  if (theme === 'orion-livecam') return <OrionLivecamHome />;
  if (theme === 'orion-automation') return <OrionAutomationHome />;
  if (theme === 'orion-machine-monitor') return <OrionMachineMonitorHome />;
  if (theme === 'orion-learning') return <OrionLearningHome />;
  
  return <OrionPromoHome searchParams={searchParams} />;
}
