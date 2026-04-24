import { pool } from '@/lib/db';
import Link from 'next/link';

async function getPosts() {
  try {
    const [rows] = await pool.query(`
      SELECT p.ID, p.post_title, p.post_date, p.post_status, p.post_author, u.display_name,
      (
        SELECT att.guid 
        FROM orion_postmeta pm 
        INNER JOIN orion_posts att ON pm.meta_value = att.ID 
        WHERE pm.post_id = p.ID AND pm.meta_key = '_thumbnail_id' 
        LIMIT 1
      ) as thumbnail_url
      FROM orion_posts p
      LEFT JOIN orion_users u ON p.post_author = u.ID
      WHERE p.post_type = "post" AND p.post_status != "trash"
      ORDER BY p.post_date DESC
    `);
    
    // Fetch categories for each post
    const posts = rows as any[];
    for (const post of posts) {
        const [terms] = await pool.query(`
            SELECT t.name 
            FROM orion_terms t
            INNER JOIN orion_term_taxonomy tt ON t.term_id = tt.term_id
            INNER JOIN orion_term_relationships tr ON tt.term_taxonomy_id = tr.term_taxonomy_id
            WHERE tr.object_id = ? AND tt.taxonomy = 'category'
            LIMIT 1
        `, [post.ID]);
        post.category = (terms as any[])[0]?.name || 'Uncategorized';
    }

    return posts;
  } catch (error) {
    return [];
  }
}

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Posts</h1>
            <p className="text-gray-500 mt-1">Manage your news articles and content.</p>
        </div>
        <Link href="/admin/posts/new" className="inline-flex items-center justify-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-sm transition-all duration-200">
            <svg className="w-5 h-5 mr-2 -ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
            Add New Post
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-16">
                            Image
                        </th>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Title
                        </th>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Author
                        </th>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Category
                        </th>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Date
                        </th>
                        <th scope="col" className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Status
                        </th>
                        <th scope="col" className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {posts.map((post) => (
                        <tr key={post.ID} className="hover:bg-gray-50 transition-colors duration-150 group">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="h-10 w-16 rounded overflow-hidden bg-gray-100 border border-gray-200 flex-shrink-0">
                                    {post.thumbnail_url ? (
                                        <img className="h-full w-full object-cover" src={post.thumbnail_url} alt="" />
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-gray-400">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                        </div>
                                    )}
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="text-sm font-semibold text-gray-900 line-clamp-1 max-w-xs group-hover:text-blue-600 transition-colors">
                                    <Link href={`/admin/posts/${post.ID}/edit`}>{post.post_title}</Link>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs mr-2">
                                        {(post.display_name || 'U').charAt(0).toUpperCase()}
                                    </div>
                                    <span className="text-sm text-gray-700">{post.display_name || 'Unknown'}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                                    {post.category}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{new Date(post.post_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                                <div className="text-xs text-gray-500">{new Date(post.post_date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    post.post_status === 'publish' 
                                    ? 'bg-green-100 text-green-800 border border-green-200' 
                                    : 'bg-gray-100 text-gray-800'
                                }`}>
                                    {post.post_status === 'publish' ? 'Published' : 'Draft'}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <Link href={`/admin/posts/${post.ID}/edit`} className="text-blue-600 hover:text-blue-900 mr-4">Edit</Link>
                                <button className="text-red-600 hover:text-red-900">Trash</button>
                            </td>
                        </tr>
                    ))}
                    {posts.length === 0 && (
                        <tr>
                            <td colSpan={7} className="px-6 py-10 text-center text-gray-500">
                                <div className="flex flex-col items-center justify-center">
                                    <svg className="w-12 h-12 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path></svg>
                                    <p className="text-lg font-medium text-gray-900">No posts found</p>
                                    <p className="text-sm text-gray-500 mt-1">Get started by creating a new post.</p>
                                    <Link href="/admin/posts/new" className="mt-4 text-blue-600 hover:text-blue-800 font-medium text-sm">Create new post &rarr;</Link>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
}
