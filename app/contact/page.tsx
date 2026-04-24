import { pool } from '@/lib/db';
import OrionPromoContact from '@/components/themes/orion-promo/Contact';
import SmartVillageContact from '@/components/themes/smartvillage/Contact';
import OrionSchoolContact from '@/components/themes/orion-school/Contact';
import OrionPortfolioContact from '@/components/themes/orion-portfolio/Contact';

async function getActiveTheme() {
  try {
    const [rows] = await pool.query('SELECT option_value FROM orion_options WHERE option_name = "active_theme"');
    return (rows as any[])[0]?.option_value || 'orion-promo';
  } catch (e) {
    return 'orion-promo';
  }
}

export default async function ContactPage() {
  const theme = await getActiveTheme();
  
  if (theme === 'smartvillage') {
    return <SmartVillageContact />;
  }
  
  if (theme === 'orion-school') {
    return <OrionSchoolContact />;
  }

  if (theme === 'orion-portfolio') {
    return <OrionPortfolioContact />;
  }
  
  return <OrionPromoContact />;
}
