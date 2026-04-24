
import { pool } from '@/lib/db';
import OrionEWSOverview from '@/components/themes/orion-ews-pro/OverviewPage';

export const dynamic = 'force-dynamic';

async function getActiveTheme() {
  try {
    const [rows] = await pool.query('SELECT option_value FROM orion_options WHERE option_name = "active_theme"');
    return (rows as any[])[0]?.option_value || 'orion-promo';
  } catch (e) {
    return 'orion-promo';
  }
}

export default async function Page() {
  const theme = await getActiveTheme();

  if (theme !== 'orion-ews-pro') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
           <h1 className="text-2xl font-bold text-slate-800 mb-2">Access Denied</h1>
           <p className="text-slate-600">This page is only available for the EWS theme.</p>
           <a href="/" className="mt-4 inline-block text-blue-600 hover:underline">Return Home</a>
        </div>
      </div>
    );
  }

  return <OrionEWSOverview />;
}
