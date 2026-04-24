import Link from 'next/link';
import { pool } from '@/lib/db';

export const dynamic = 'force-dynamic';

async function getMedia() {
  try {
    const [rows] = await pool.query(`
      SELECT ID, post_title, guid, post_date, post_mime_type 
      FROM orion_posts 
      WHERE post_type = 'attachment' 
      ORDER BY post_date DESC
    `);
    return rows as any[];
  } catch (error) {
    console.error('Failed to fetch media:', error);
    return [];
  }
}

export default async function MediaPage() {
  const mediaItems = await getMedia();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">Media Library</h1>
        {/* TODO: Implement upload functionality */}
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium shadow-sm">
          Upload New
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        {mediaItems.length === 0 ? (
          <div className="border-2 border-dashed border-slate-300 rounded-lg p-12 text-center">
            <svg className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="mt-2 text-sm text-slate-500">No media files found. Upload some files to get started.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {mediaItems.map((item) => (
              <div key={item.ID} className="group relative aspect-square bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                {item.post_mime_type.startsWith('image/') ? (
                  <img 
                    src={item.guid} 
                    alt={item.post_title} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 p-4">
                    <svg className="w-12 h-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <span className="text-xs text-center truncate w-full px-2">{item.post_mime_type}</span>
                  </div>
                )}
                
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex gap-2">
                    <a 
                      href={item.guid} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 bg-white/90 text-slate-700 rounded-full hover:bg-white transition"
                      title="View"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </a>
                  </div>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 bg-white/90 p-2 text-xs truncate border-t border-slate-100">
                  {item.post_title}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
