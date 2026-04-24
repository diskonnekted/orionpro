'use server';

import { pool } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { uploadFile } from '@/lib/upload';

export async function createPost(formData: FormData) {
  const session = await getSession();
  if (!session?.userId) {
    throw new Error('Unauthorized');
  }

  const title = formData.get('post_title') as string;
  const content = formData.get('post_content') as string;
  const status = formData.get('post_status') as string || 'draft';
  const postFormat = formData.get('post_format') as string || 'standard'; // Not using it in DB directly yet unless tax?
  // WP stores format as taxonomy 'post_format'. For now, I'll ignore or store as meta if needed. 
  // User didn't ask for format specifically, but I added the UI.

  const categoryIds = formData.getAll('post_category[]');
  const featuredImage = formData.get('featured_image') as File;
  const galleryImages = formData.getAll('gallery_images') as File[];

  try {
    const [result] = await pool.query(
      `INSERT INTO orion_posts (
        post_author, 
        post_date, 
        post_content, 
        post_title, 
        post_status, 
        post_type, 
        post_modified
      ) VALUES (?, NOW(), ?, ?, ?, 'post', NOW())`,
      [session.userId, content, title, status]
    );

    const postId = (result as any).insertId;

    // 1. Save Categories
    if (categoryIds.length > 0) {
      const values = categoryIds.map(id => [postId, parseInt(id as string), 0]);
      await pool.query(
        `INSERT INTO orion_term_relationships (object_id, term_taxonomy_id, term_order) VALUES ?`,
        [values]
      );
    }

    // 2. Save Featured Image
    if (featuredImage && featuredImage.size > 0) {
      const attachmentId = await uploadFile(featuredImage, session.userId);
      await pool.query(
        `INSERT INTO orion_postmeta (post_id, meta_key, meta_value) VALUES (?, '_thumbnail_id', ?)`,
        [postId, attachmentId]
      );
    }

    // 3. Save Gallery Images
    const validGalleryImages = galleryImages.filter(f => f.size > 0);
    if (validGalleryImages.length > 0) {
      const attachmentIds = await Promise.all(
        validGalleryImages.map(file => uploadFile(file, session.userId))
      );
      
      const galleryString = attachmentIds.join(',');
      await pool.query(
        `INSERT INTO orion_postmeta (post_id, meta_key, meta_value) VALUES (?, '_gallery_ids', ?)`,
        [postId, galleryString]
      );
    }

    revalidatePath('/admin/posts');
  } catch (error) {
    console.error('Failed to create post:', error);
    throw new Error('Failed to create post');
  }

  redirect('/admin/posts');
}

export async function updatePost(id: number, formData: FormData) {
  const session = await getSession();
  if (!session?.userId) {
    throw new Error('Unauthorized');
  }

  console.log('updatePost called for ID:', id);

  const title = formData.get('post_title') as string;
  const content = formData.get('post_content') as string;
  const status = formData.get('post_status') as string;
  const categoryIds = formData.getAll('post_category[]');
  const featuredImage = formData.get('featured_image') as File;

  const galleryImages = formData.getAll('gallery_images') as File[];

  try {
    await pool.query(
      `UPDATE orion_posts SET 
        post_title = ?, 
        post_content = ?, 
        post_status = ?, 
        post_modified = NOW() 
       WHERE ID = ?`,
      [title, content, status, id]
    );

    // 1. Update Categories
    // First delete existing category relationships for this post
    // We need to be careful not to delete tags if we had them.
    // Ideally we join with term_taxonomy to filter by taxonomy='category'.
    // Delete relationships where term_taxonomy_id is in (SELECT term_taxonomy_id FROM orion_term_taxonomy WHERE taxonomy = 'category')
    await pool.query(
      `DELETE tr FROM orion_term_relationships tr 
       INNER JOIN orion_term_taxonomy tt ON tr.term_taxonomy_id = tt.term_taxonomy_id 
       WHERE tr.object_id = ? AND tt.taxonomy = 'category'`,
      [id]
    );

    if (categoryIds.length > 0) {
      const values = categoryIds.map(catId => [id, parseInt(catId as string), 0]);
      await pool.query(
        `INSERT INTO orion_term_relationships (object_id, term_taxonomy_id, term_order) VALUES ?`,
        [values]
      );
    }

    // 2. Update Featured Image
    if (featuredImage && featuredImage.size > 0) {
      const attachmentId = await uploadFile(featuredImage, session.userId);
      // Check if _thumbnail_id exists
      const [existingMeta] = await pool.query(
        `SELECT meta_id FROM orion_postmeta WHERE post_id = ? AND meta_key = '_thumbnail_id'`,
        [id]
      );
      
      if ((existingMeta as any[]).length > 0) {
         await pool.query(
            `UPDATE orion_postmeta SET meta_value = ? WHERE post_id = ? AND meta_key = '_thumbnail_id'`,
            [attachmentId, id]
         );
      } else {
         await pool.query(
            `INSERT INTO orion_postmeta (post_id, meta_key, meta_value) VALUES (?, '_thumbnail_id', ?)`,
            [id, attachmentId]
         );
      }
    }

    // 3. Update Gallery Images (Append new ones)
    const validGalleryImages = galleryImages.filter(f => f.size > 0);
    if (validGalleryImages.length > 0) {
      const attachmentIds = await Promise.all(
        validGalleryImages.map(file => uploadFile(file, session.userId))
      );
      
      // Get existing gallery
      const [galleryMeta] = await pool.query(
        `SELECT meta_value FROM orion_postmeta WHERE post_id = ? AND meta_key = '_gallery_ids'`,
        [id]
      );
      
      let newGalleryString = attachmentIds.join(',');
      if ((galleryMeta as any[]).length > 0) {
        const existingIds = (galleryMeta as any[])[0].meta_value;
        if (existingIds) {
            newGalleryString = existingIds + ',' + newGalleryString;
        }
        await pool.query(
            `UPDATE orion_postmeta SET meta_value = ? WHERE post_id = ? AND meta_key = '_gallery_ids'`,
            [newGalleryString, id]
        );
      } else {
        await pool.query(
            `INSERT INTO orion_postmeta (post_id, meta_key, meta_value) VALUES (?, '_gallery_ids', ?)`,
            [id, newGalleryString]
        );
      }
    }

    revalidatePath('/admin/posts');
    revalidatePath(`/admin/posts/${id}/edit`);
  } catch (error) {
    console.error('Failed to update post:', error);
    throw new Error('Failed to update post');
  }

  redirect('/admin/posts');
}
