'use server';

import { pool } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function updateSiteColorScheme(formData: FormData) {
  const session = await getSession();
  if (!session?.userId) {
    throw new Error('Unauthorized');
  }

  // Check if user has capability to manage options (assuming admin)
  // For now, we assume logged in users in admin area are admins.

  const scheme = formData.get('scheme') as string;

  try {
    // Check if option exists
    const [rows] = await pool.query('SELECT option_id FROM orion_options WHERE option_name = "site_color_scheme"');
    if ((rows as any[]).length > 0) {
      await pool.query('UPDATE orion_options SET option_value = ? WHERE option_name = "site_color_scheme"', [scheme]);
    } else {
      await pool.query('INSERT INTO orion_options (option_name, option_value, autoload) VALUES ("site_color_scheme", ?, "yes")', [scheme]);
    }
    
    revalidatePath('/');
    revalidatePath('/admin');
  } catch (error) {
    console.error('Failed to update site color scheme:', error);
    throw new Error('Failed to update site color scheme');
  }
}

export async function updateAdminColorScheme(formData: FormData) {
  const session = await getSession();
  if (!session?.userId) {
    throw new Error('Unauthorized');
  }

  const scheme = formData.get('scheme') as string;

  try {
    // Check if meta exists
    const [rows] = await pool.query('SELECT umeta_id FROM orion_usermeta WHERE user_id = ? AND meta_key = "admin_color_scheme"', [session.userId]);
    if ((rows as any[]).length > 0) {
      await pool.query('UPDATE orion_usermeta SET meta_value = ? WHERE user_id = ? AND meta_key = "admin_color_scheme"', [scheme, session.userId]);
    } else {
      await pool.query('INSERT INTO orion_usermeta (user_id, meta_key, meta_value) VALUES (?, "admin_color_scheme", ?)', [session.userId, scheme]);
    }

    revalidatePath('/admin');
  } catch (error) {
    console.error('Failed to update admin color scheme:', error);
    throw new Error('Failed to update admin color scheme');
  }
}

export async function activateTheme(formData: FormData) {
  const session = await getSession();
  if (!session?.userId) {
    throw new Error('Unauthorized');
  }

  const themeId = formData.get('themeId') as string;

  try {
    const [rows] = await pool.query('SELECT option_id FROM orion_options WHERE option_name = "active_theme"');
    if ((rows as any[]).length > 0) {
      await pool.query('UPDATE orion_options SET option_value = ? WHERE option_name = "active_theme"', [themeId]);
    } else {
      await pool.query('INSERT INTO orion_options (option_name, option_value, autoload) VALUES ("active_theme", ?, "yes")', [themeId]);
    }
    
    revalidatePath('/');
    revalidatePath('/admin/appearance/themes');
  } catch (error) {
    console.error('Failed to activate theme:', error);
    throw new Error('Failed to activate theme');
  }
}
