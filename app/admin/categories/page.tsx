import { pool } from '@/lib/db';
import { createCategory, deleteCategory } from './actions';
import { getSession } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

async function getCategories() {
  try {
    const [rows] = await pool.query(`
      SELECT t.term_id, t.name, t.slug, tt.term_taxonomy_id, tt.description, tt.count, tt.parent
      FROM orion_terms t 
      INNER JOIN orion_term_taxonomy tt ON t.term_id = tt.term_id 
      WHERE tt.taxonomy = 'category'
      ORDER BY t.name ASC
    `);
    return rows as any[];
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return [];
  }
}

type Category = {
    term_id: number;
    name: string;
    slug: string;
    term_taxonomy_id: number;
    description: string;
    count: number;
    parent: number;
    children?: Category[];
    level?: number;
};

function buildCategoryTree(categories: Category[], parentId = 0, level = 0): Category[] {
    const branch: Category[] = [];
    categories.forEach(cat => {
        if (cat.parent === parentId) {
            const children = buildCategoryTree(categories, cat.term_id, level + 1);
            branch.push({ ...cat, children, level });
            // We can also flatten the array for easier display if needed, but tree is good for some uses.
            // For the table, a flattened list with level indicator is better.
        }
    });
    return branch;
}

function flattenCategories(categories: Category[], parentId = 0, level = 0, result: Category[] = []) {
    categories
        .filter(cat => cat.parent === parentId)
        .forEach(cat => {
            result.push({ ...cat, level });
            flattenCategories(categories, cat.term_id, level + 1, result);
        });
    return result;
}

export default async function CategoriesPage() {
  const rawCategories = await getCategories();
  const categories = flattenCategories(rawCategories);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">Categories</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Add New Category Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sticky top-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Add New Category</h2>
            <form action={createCategory} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  className="block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                  placeholder="e.g. Technology"
                />
                <p className="mt-1 text-xs text-slate-500">The name is how it appears on your site.</p>
              </div>

              <div>
                <label htmlFor="slug" className="block text-sm font-medium text-slate-700 mb-1">Slug</label>
                <input
                  type="text"
                  name="slug"
                  id="slug"
                  className="block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                  placeholder="e.g. technology"
                />
                <p className="mt-1 text-xs text-slate-500">The "slug" is the URL-friendly version of the name. It is usually all lowercase and contains only letters, numbers, and hyphens.</p>
              </div>

              <div>
                <label htmlFor="parent" className="block text-sm font-medium text-slate-700 mb-1">Parent Category</label>
                <select
                  name="parent"
                  id="parent"
                  className="block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                >
                  <option value="0">None</option>
                  {categories.map((cat) => (
                    <option key={cat.term_id} value={cat.term_id}>
                      {'\u00A0'.repeat((cat.level || 0) * 4)}{cat.name}
                    </option>
                  ))}
                </select>
                <p className="mt-1 text-xs text-slate-500">Categories, unlike tags, can have a hierarchy. You might have a Jazz category, and under that have children categories for Bebop and Big Band.</p>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                <textarea
                  name="description"
                  id="description"
                  rows={3}
                  className="block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                ></textarea>
                <p className="mt-1 text-xs text-slate-500">The description is not prominent by default; however, some themes may show it.</p>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Add New Category
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Categories List Table */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Description</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Slug</th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">Count</th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {categories.length > 0 ? (
                    categories.map((category) => (
                      <tr key={category.term_taxonomy_id} className="hover:bg-slate-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-slate-900">
                             {category.level && category.level > 0 ? (
                                <span className="text-slate-400 mr-1">
                                    {'\u2014'.repeat(category.level)}
                                </span>
                             ) : null}
                             {category.name}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-slate-500 truncate max-w-xs">{category.description || '—'}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-slate-500">{category.slug}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {category.count}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <form action={deleteCategory.bind(null, category.term_taxonomy_id)}>
                            <button className="text-red-600 hover:text-red-900 bg-transparent border-none cursor-pointer">Delete</button>
                          </form>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-4 text-center text-sm text-slate-500">
                        No categories found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
