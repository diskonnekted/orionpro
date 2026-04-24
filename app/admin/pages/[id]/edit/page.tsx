import PostForm from '@/components/admin/PostForm';
import { updatePage } from '../../actions';
import { pool } from '@/lib/db';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

async function getPage(id: string) {
  try {
    const [rows] = await pool.query(`
      SELECT p.*, pm.meta_value as featured_image_url 
      FROM orion_posts p
      LEFT JOIN orion_postmeta pm ON p.ID = pm.post_id AND pm.meta_key = '_thumbnail_url'
      WHERE p.ID = ? AND p.post_type = 'page'
    `, [id]);
    
    return (rows as any[])[0];
  } catch (error) {
    console.error('Failed to fetch page:', error);
    return null;
  }
}

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const page = await getPage(id);

  if (!page) {
    notFound();
  }

  const updatePageWithId = updatePage.bind(null, page.ID);

  return (
    <PostForm 
      categories={[]} 
      post={page} 
      action={updatePageWithId} 
      backLink="/admin/pages"
      pageTitle="Edit Page"
    />
  );
}
