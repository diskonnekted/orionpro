import Link from 'next/link';
import { pool } from '@/lib/db';

export const dynamic = 'force-dynamic';

async function getPages() {
  try {
    const [rows] = await pool.query(`
      SELECT p.ID, p.post_title, p.post_date, p.post_status, p.post_author, u.display_name
      FROM orion_posts p
      LEFT JOIN orion_users u ON p.post_author = u.ID
      WHERE p.post_type = "page" AND p.post_status != "trash"
      ORDER BY p.post_date DESC
    `);
    return rows as any[];
  } catch (error) {
    console.error('Failed to fetch pages:', error);
    return [];
  }
}

import { deletePage } from './actions';

export default async function PagesPage() {
  const pages = await getPages();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">Pages</h1>
        <Link href="/admin/pages/new" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium shadow-sm">
          Add New
        </Link>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Author</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {pages.length === 0 ? (
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500" colSpan={4}>No pages found.</td>
              </tr>
            ) : (
              pages.map((page) => (
                <tr key={page.ID} className="hover:bg-slate-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-slate-900">{page.post_title}</div>
                    <div className="text-xs text-slate-500">{page.post_status}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    {page.display_name || 'Unknown'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    {new Date(page.post_date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex justify-end items-center">
                    <Link href={`/admin/pages/${page.ID}/edit`} className="text-blue-600 hover:text-blue-900 mr-4">Edit</Link>
                    <form action={deletePage.bind(null, page.ID)}>
                      <button className="text-red-600 hover:text-red-900">Delete</button>
                    </form>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
