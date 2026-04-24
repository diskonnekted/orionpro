'use server';

import { pool } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')     // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-');  // Replace multiple - with single -
}

export async function createCategory(formData: FormData) {
  const session = await getSession();
  if (!session?.userId) {
    throw new Error('Unauthorized');
  }

  const name = formData.get('name') as string;
  const description = formData.get('description') as string || '';
  const parent = parseInt(formData.get('parent') as string) || 0;
  let slug = formData.get('slug') as string;

  if (!name) {
    throw new Error('Name is required');
  }

  if (!slug) {
    slug = slugify(name);
  } else {
    slug = slugify(slug);
  }

  try {
    // 1. Insert into orion_terms
    // First check if term exists by slug
    const [existingTerms] = await pool.query('SELECT term_id FROM orion_terms WHERE slug = ?', [slug]);
    let termId: number;

    if ((existingTerms as any[]).length > 0) {
        termId = (existingTerms as any[])[0].term_id;
    } else {
        const [termResult] = await pool.query(
            'INSERT INTO orion_terms (name, slug, term_group) VALUES (?, ?, 0)',
            [name, slug]
        );
        termId = (termResult as any).insertId;
    }

    // 2. Insert into orion_term_taxonomy
    // Check if this term is already a category
    const [existingTax] = await pool.query(
        'SELECT term_taxonomy_id FROM orion_term_taxonomy WHERE term_id = ? AND taxonomy = "category"',
        [termId]
    );

    if ((existingTax as any[]).length === 0) {
        await pool.query(
            'INSERT INTO orion_term_taxonomy (term_id, taxonomy, description, parent, count) VALUES (?, "category", ?, ?, 0)',
            [termId, description, parent]
        );
    }

    revalidatePath('/admin/categories');
    revalidatePath('/admin/posts/new'); // Update categories in new post page
  } catch (error) {
    console.error('Failed to create category:', error);
    // throw new Error('Failed to create category');
    // Return error state instead of throwing if possible, but for server action we might just throw
  }
}

export async function deleteCategory(termTaxonomyId: number) {
    const session = await getSession();
    if (!session?.userId) {
      throw new Error('Unauthorized');
    }

    try {
        // We delete from term_taxonomy. WP logic usually keeps the term if used in other taxonomies, but usually we just delete the tax entry.
        // If it's the last tax entry for the term, we might delete the term too.
        // For simplicity: just delete from term_taxonomy.
        
        await pool.query('DELETE FROM orion_term_taxonomy WHERE term_taxonomy_id = ?', [termTaxonomyId]);
        
        // Also cleanup relationships
        await pool.query('DELETE FROM orion_term_relationships WHERE term_taxonomy_id = ?', [termTaxonomyId]);

        revalidatePath('/admin/categories');
        revalidatePath('/admin/posts/new');
    } catch (error) {
        console.error('Failed to delete category:', error);
        throw new Error('Failed to delete category');
    }
}
