import { pool } from '@/lib/db';
import PostForm from '@/components/admin/PostForm';
import { updatePost } from '../../actions';
import { notFound } from 'next/navigation';

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

async function getPostData(id: string) {
  try {
    const [rows] = await pool.query('SELECT * FROM orion_posts WHERE ID = ?', [id]);
    const posts = rows as any[];
    if (posts.length === 0) return null;
    const post = posts[0];

    // Get Categories
    const [terms] = await pool.query(`
        SELECT tt.term_taxonomy_id 
        FROM orion_term_relationships tr
        INNER JOIN orion_term_taxonomy tt ON tr.term_taxonomy_id = tt.term_taxonomy_id
        WHERE tr.object_id = ? AND tt.taxonomy = 'category'
    `, [id]);
    post.categories = (terms as any[]).map(t => t.term_taxonomy_id);

    // Get Featured Image
    const [thumbMeta] = await pool.query(`
        SELECT p.guid 
        FROM orion_postmeta pm
        INNER JOIN orion_posts p ON pm.meta_value = p.ID
        WHERE pm.post_id = ? AND pm.meta_key = '_thumbnail_id'
    `, [id]);
    if ((thumbMeta as any[]).length > 0) {
        post.featured_image_url = (thumbMeta as any[])[0].guid;
    }

    // Get Gallery Images
    const [galleryMeta] = await pool.query(`
        SELECT meta_value FROM orion_postmeta WHERE post_id = ? AND meta_key = '_gallery_ids'
    `, [id]);
    
    if ((galleryMeta as any[]).length > 0) {
        const ids = (galleryMeta as any[])[0].meta_value;
        if (ids) {
            const [galleryPosts] = await pool.query(`SELECT guid FROM orion_posts WHERE ID IN (${ids})`);
            post.gallery_urls = (galleryPosts as any[]).map(p => p.guid);
        }
    }

    return post;
  } catch (error) {
    console.error('Failed to fetch post data:', error);
    return null;
  }
}

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [post, categories] = await Promise.all([
    getPostData(id),
    getCategories()
  ]);

  if (!post) {
    notFound();
  }

  const updateAction = updatePost.bind(null, post.ID);

  return <PostForm categories={categories} post={post} action={updateAction} />;
}
