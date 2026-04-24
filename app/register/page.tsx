import { pool } from '@/lib/db';
import OrionLearningRegister from '@/components/themes/orion-learning/Register';
import Link from 'next/link';

async function getActiveTheme() {
  try {
    const [rows] = await pool.query('SELECT option_value FROM orion_options WHERE option_name = "active_theme"');
    return (rows as any[])[0]?.option_value || 'orion-promo';
  } catch (e) {
    return 'orion-promo';
  }
}

export default async function RegisterPage() {
  const theme = await getActiveTheme();
  
  if (theme === 'orion-learning') {
    return <OrionLearningRegister />;
  }

  // Fallback for other themes (or redirect)
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Registration Unavailable</h1>
        <p className="text-gray-600 mb-6">Registration is not enabled for the current theme.</p>
        <Link href="/" className="text-blue-600 hover:underline font-medium">
          &larr; Back to Home
        </Link>
      </div>
    </div>
  );
}