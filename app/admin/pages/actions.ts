'use server';

import { pool } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

const UPLOAD_DIR = 'C:\\xampp\\htdocs\\orioncms\\orion-content\\uploads';
// Assuming Orion CMS is running on localhost:8000
const BASE_URL = 'http://localhost:8000/orion-content/uploads';

async function handleFileUpload(file: File): Promise<string | null> {
  if (!file || file.size === 0) return null;

  const buffer = Buffer.from(await file.arrayBuffer());
  const timestamp = Date.now();
  // Sanitize filename
  const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  const fileName = `${timestamp}_feat_${safeName}`;
  const filePath = join(UPLOAD_DIR, fileName);

  try {
    await mkdir(UPLOAD_DIR, { recursive: true });
    await writeFile(filePath, buffer);
    return `${BASE_URL}/${fileName}`;
  } catch (error) {
    console.error('Error saving file:', error);
    return null;
  }
}

export async function createPage(formData: FormData) {
  const session = await getSession();
  if (!session?.userId) {
    throw new Error('Unauthorized');
  }

  const title = formData.get('post_title') as string;
  const content = formData.get('post_content') as string;
  const status = formData.get('post_status') as string || 'draft';
  const featuredImage = formData.get('featured_image');
  
  // Generate slug from title if not provided (simple version)
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

  try {
    const [result] = await pool.query(
      `INSERT INTO orion_posts (
        post_author, 
        post_date, 
        post_content, 
        post_title, 
        post_status, 
        post_type, 
        post_modified,
        post_name
      ) VALUES (?, NOW(), ?, ?, ?, 'page', NOW(), ?)`,
      [session.userId, content, title, status, slug]
    );

    const insertId = (result as any).insertId;

    // Handle Featured Image
    if (featuredImage instanceof File && featuredImage.size > 0) {
        const imageUrl = await handleFileUpload(featuredImage);
        if (imageUrl) {
            await pool.query(
                `INSERT INTO orion_postmeta (post_id, meta_key, meta_value) VALUES (?, '_thumbnail_url', ?)`,
                [insertId, imageUrl]
            );
        }
    }

    revalidatePath('/admin/pages');
  } catch (error) {
    console.error('Failed to create page:', error);
    throw new Error('Failed to create page');
  }

  redirect('/admin/pages');
}

export async function updatePage(id: number, formData: FormData) {
  const session = await getSession();
  if (!session?.userId) {
    throw new Error('Unauthorized');
  }

  const title = formData.get('post_title') as string;
  const content = formData.get('post_content') as string;
  const status = formData.get('post_status') as string;
  const featuredImage = formData.get('featured_image');
  const existingFeaturedImage = formData.get('existing_featured_image') as string;

  try {
    await pool.query(
      `UPDATE orion_posts SET 
        post_title = ?, 
        post_content = ?, 
        post_status = ?, 
        post_modified = NOW() 
       WHERE ID = ? AND post_type = 'page'`,
      [title, content, status, id]
    );

    // Handle Featured Image
    if (featuredImage instanceof File && featuredImage.size > 0) {
        // New image uploaded
        const imageUrl = await handleFileUpload(featuredImage);
        if (imageUrl) {
            // Check if meta exists
            const [rows] = await pool.query(
                `SELECT meta_id FROM orion_postmeta WHERE post_id = ? AND meta_key = '_thumbnail_url'`,
                [id]
            );
            
            if ((rows as any[]).length > 0) {
                await pool.query(
                    `UPDATE orion_postmeta SET meta_value = ? WHERE post_id = ? AND meta_key = '_thumbnail_url'`,
                    [imageUrl, id]
                );
            } else {
                await pool.query(
                    `INSERT INTO orion_postmeta (post_id, meta_key, meta_value) VALUES (?, '_thumbnail_url', ?)`,
                    [id, imageUrl]
                );
            }
        }
    } else if (!existingFeaturedImage) {
        // Image removed
        await pool.query(
            `DELETE FROM orion_postmeta WHERE post_id = ? AND meta_key = '_thumbnail_url'`,
            [id]
        );
    }
    // If existingFeaturedImage is present and no new file, do nothing (preserve)

    revalidatePath('/admin/pages');
    revalidatePath(`/admin/pages/${id}/edit`);
  } catch (error) {
    console.error('Failed to update page:', error);
    throw new Error('Failed to update page');
  }

  redirect('/admin/pages');
}

export async function deletePage(id: number) {
    const session = await getSession();
    if (!session?.userId) {
      throw new Error('Unauthorized');
    }
  
    try {
      await pool.query(
        `UPDATE orion_posts SET post_status = 'trash' WHERE ID = ? AND post_type = 'page'`,
        [id]
      );
      revalidatePath('/admin/pages');
    } catch (error) {
      console.error('Failed to delete page:', error);
      throw new Error('Failed to delete page');
    }
}
