'use server';

import { pool } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { getSession } from '@/lib/auth';
import { uploadFile } from '@/lib/upload';

async function updateOption(name: string, value: string) {
  // Check if option exists
  const [rows] = await pool.query('SELECT option_id FROM orion_options WHERE option_name = ?', [name]);
  
  if ((rows as any[]).length > 0) {
    await pool.query('UPDATE orion_options SET option_value = ? WHERE option_name = ?', [value, name]);
  } else {
    await pool.query('INSERT INTO orion_options (option_name, option_value, autoload) VALUES (?, ?, "yes")', [name, value]);
  }
}

export async function saveSettings(formData: FormData) {
  const session = await getSession();
  if (!session?.userId) {
    throw new Error('Unauthorized');
  }

  const blogname = formData.get('blogname') as string;
  const blogdescription = formData.get('blogdescription') as string;
  const site_lang = formData.get('site_lang') as string;
  const timezone_string = formData.get('timezone_string') as string;
  const site_meta_description = formData.get('site_meta_description') as string;
  const site_meta_keywords = formData.get('site_meta_keywords') as string;
  const site_logo_file = formData.get('site_logo') as File;

  // Save text options
  await updateOption('blogname', blogname);
  await updateOption('blogdescription', blogdescription);
  await updateOption('site_lang', site_lang);
  await updateOption('timezone_string', timezone_string);
  await updateOption('site_meta_description', site_meta_description);
  await updateOption('site_meta_keywords', site_meta_keywords);

  // Handle Logo Upload
  if (site_logo_file && site_logo_file.size > 0 && site_logo_file.name !== 'undefined') {
    try {
      const attachmentId = await uploadFile(site_logo_file, session.userId);
      
      // Get the URL from the attachment
      const [rows] = await pool.query('SELECT guid FROM orion_posts WHERE ID = ?', [attachmentId]);
      if ((rows as any[]).length > 0) {
        const logoUrl = (rows as any[])[0].guid;
        await updateOption('site_logo', logoUrl);
      }
    } catch (error) {
      console.error('Logo upload failed:', error);
      // Determine if we should throw or just log. For now, log.
    }
  }

  revalidatePath('/admin/settings');
  revalidatePath('/', 'layout'); // Update frontend if site title/logo changes
}
