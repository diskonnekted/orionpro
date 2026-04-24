import { pool } from '@/lib/db';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { notFound } from 'next/navigation';
import { getSiteScheme, colorSchemes } from '@/lib/color-schemes';

interface Page {
  ID: number;
  post_title: string;
  post_content: string;
  post_date: string;
}

async function getPage(slug: string) {
  try {
    const [rows] = await pool.query(`
      SELECT * FROM orion_posts 
      WHERE post_name = ? AND post_type = 'page' AND post_status = 'publish'
    `, [slug]);
    
    const pages = rows as Page[];
    if (pages.length === 0) return null;

    return pages[0];
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await getPage(slug);
  const schemeName = await getSiteScheme();
  const colors = colorSchemes[schemeName]?.colors;

  if (!page) {
    notFound();
  }

  const wrapperStyle = colors ? { backgroundColor: colors.background, color: colors.text } : {};
  const cardStyle = colors ? { backgroundColor: colors.surface, borderColor: colors.border } : {};
  const titleStyle = colors ? { color: colors.text } : {};
  
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col font-sans text-gray-800 transition-colors duration-300" style={wrapperStyle}>
      <Header colors={colors} />
      <main className="container mx-auto px-4 flex-grow">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-4xl mx-auto" style={cardStyle}>
             <h1 className="text-4xl font-extrabold text-gray-900 mb-8 border-b pb-4" style={titleStyle}>{page.post_title}</h1>
             <div className="prose max-w-none break-words overflow-hidden" dangerouslySetInnerHTML={{ __html: page.post_content }}></div>
        </div>
      </main>

      <Footer colors={colors} />
    </div>
  );
}
