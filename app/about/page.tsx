import { pool } from '@/lib/db';
import OrionPromoAbout from '@/components/themes/orion-promo/About';
import SmartVillageAbout from '@/components/themes/smartvillage/About';
import OrionSchoolAbout from '@/components/themes/orion-school/About';
import OrionPortfolioAbout from '@/components/themes/orion-portfolio/About';

async function getActiveTheme() {
  try {
    const [rows] = await pool.query('SELECT option_value FROM orion_options WHERE option_name = "active_theme"');
    return (rows as any[])[0]?.option_value || 'orion-promo';
  } catch (e) {
    return 'orion-promo';
  }
}

export default async function AboutPage() {
  const theme = await getActiveTheme();
  
  if (theme === 'smartvillage') {
    return <SmartVillageAbout />;
  }
  
  if (theme === 'orion-school') {
    return <OrionSchoolAbout />;
  }

  if (theme === 'orion-portfolio') {
    return <OrionPortfolioAbout />;
  }
  
  return <OrionPromoAbout />;
}
