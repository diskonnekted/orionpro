'use server';

import { pool } from '@/lib/db';

export async function cleanupThemes() {
  try {
    const themesToRemove = ['smartvillage', 'school', 'portfolio'];
    const placeholders = themesToRemove.map(() => '?').join(',');
    
    await pool.query(
      `DELETE FROM orion_plugins WHERE slug IN (${placeholders})`,
      themesToRemove
    );
    
    console.log('Successfully removed themes from plugin list');
    return { success: true };
  } catch (error) {
    console.error('Failed to cleanup themes:', error);
    return { success: false, error };
  }
}
