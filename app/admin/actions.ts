'use server'

import { pool } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { deleteSession, getSession } from '@/lib/auth';

export async function createQuickDraft(formData: FormData) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;

  if (!title || !content) {
    return;
  }

  try {
    // Get current user ID
    const session = await getSession();
    const userId = session?.userId || 1;

    // Insert post
    await pool.query(
      'INSERT INTO orion_posts (post_author, post_date, post_date_gmt, post_content, post_title, post_status, comment_status, ping_status, post_name, post_modified, post_modified_gmt, post_parent, guid, menu_order, post_type, post_mime_type, comment_count) VALUES (?, NOW(), NOW(), ?, ?, "draft", "open", "open", ?, NOW(), NOW(), 0, "", 0, "post", "", 0)',
      [userId, content, title, title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')]
    );

    revalidatePath('/admin');
  } catch (error) {
    console.error('Failed to create draft:', error);
  }
}

export async function logout() {
  await deleteSession();
  redirect('/login');
}
