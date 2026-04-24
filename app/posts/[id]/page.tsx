import { pool } from '@/lib/db';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { notFound } from 'next/navigation';
import { getSiteScheme, colorSchemes } from '@/lib/color-schemes';

interface Post {
  ID: number;
  post_title: string;
  post_content: string;
  post_date: string;
  thumbnail_url?: string;
  gallery_urls?: string[];
}

async function getPost(id: string) {
  try {
    const [rows] = await pool.query(`
      SELECT p.*,
      (
        SELECT att.guid 
        FROM orion_postmeta pm 
        INNER JOIN orion_posts att ON pm.meta_value = att.ID 
        WHERE pm.post_id = p.ID AND pm.meta_key = '_thumbnail_id' 
        LIMIT 1
      ) as thumbnail_url
      FROM orion_posts p 
      WHERE p.ID = ? AND p.post_type = "post"
    `, [id]);
    const posts = rows as Post[];
    if (posts.length === 0) return null;

    const post = posts[0];

    // Fetch Gallery
    const [galleryMeta] = await pool.query(`
      SELECT meta_value FROM orion_postmeta WHERE post_id = ? AND meta_key = '_gallery_ids'
    `, [id]);

    if ((galleryMeta as any[]).length > 0) {
      const galleryIds = (galleryMeta as any[])[0].meta_value;
      if (galleryIds) {
        const [attachments] = await pool.query(`
          SELECT guid FROM orion_posts WHERE ID IN (${galleryIds})
        `);
        post.gallery_urls = (attachments as any[]).map(a => a.guid);
      }
    }

    return post;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getPost(id);
  const schemeName = await getSiteScheme();
  const colors = colorSchemes[schemeName]?.colors;

  if (!post) {
    notFound();
  }

  const wrapperStyle = colors ? { backgroundColor: colors.background, color: colors.text } : {};
  const cardStyle = colors ? { backgroundColor: colors.surface, borderColor: colors.border } : {};
  const titleStyle = colors ? { color: colors.text } : {};
  const metaStyle = colors ? { color: colors.textMuted, borderBottomColor: colors.border } : {};

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col font-sans text-gray-800 transition-colors duration-300" style={wrapperStyle}>
      <Header colors={colors} />
      <main className="container mx-auto px-4 flex-grow">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-4xl mx-auto" style={cardStyle}>
             {post.thumbnail_url && (
                <div className="mb-8 rounded-xl overflow-hidden aspect-video">
                    <img src={post.thumbnail_url} alt={post.post_title} className="w-full h-full object-cover" />
                </div>
             )}
             <h1 className="text-4xl font-extrabold text-gray-900 mb-4" style={titleStyle}>{post.post_title}</h1>
             <div className="text-gray-500 mb-8 border-b pb-4" style={metaStyle}>
                {new Date(post.post_date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
             </div>
             <div className="prose max-w-none break-words overflow-hidden" dangerouslySetInnerHTML={{ __html: post.post_content }}></div>

             {/* Gallery Section */}
             {post.gallery_urls && post.gallery_urls.length > 0 && (
               <div className="mt-12 pt-8 border-t border-gray-100" style={metaStyle}>
                 <h3 className="text-2xl font-bold mb-6" style={titleStyle}>Gallery</h3>
                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                   {post.gallery_urls.map((url, index) => (
                     <div key={index} className="relative aspect-square rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                       <img src={url} alt={`Gallery image ${index + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                     </div>
                   ))}
                 </div>
               </div>
             )}
        </div>
      </main>
      <Footer colors={colors} />
    </div>
  );
}
