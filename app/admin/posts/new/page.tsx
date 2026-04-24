import { pool } from '@/lib/db';
import PostForm from '@/components/admin/PostForm';

async function getCategories() {
  try {
    const [rows] = await pool.query(`
      SELECT t.term_id, t.name, tt.term_taxonomy_id 
      FROM orion_terms t 
      INNER JOIN orion_term_taxonomy tt ON t.term_id = tt.term_id 
      WHERE tt.taxonomy = 'category'
    `);
    return rows as any[];
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return [];
  }
}

export default async function NewPostPage() {
  const categories = await getCategories();
  
  return <PostForm categories={categories} />;
}
