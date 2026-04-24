
import { updateUser } from '../../actions';
import { pool } from '@/lib/db';
import { notFound } from 'next/navigation';
import { unserialize } from 'php-serialize';

async function getUser(userId: string) {
  try {
    const [rows] = await pool.query('SELECT * FROM orion_users WHERE ID = ?', [userId]);
    if ((rows as any[]).length === 0) return null;
    const user = (rows as any[])[0];
    
    const [metaRows] = await pool.query('SELECT meta_key, meta_value FROM orion_usermeta WHERE user_id = ?', [userId]);
    const meta: any = {};
    (metaRows as any[]).forEach(row => {
        meta[row.meta_key] = row.meta_value;
    });
    
    return { ...user, meta };
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}

function getRole(serializedCaps?: string): string {
    if (!serializedCaps) return 'subscriber';
    try {
      const caps = unserialize(serializedCaps);
      if (typeof caps === 'object' && caps !== null) {
          const roles = Object.keys(caps).filter((k: string) => caps[k]);
          if (roles.length > 0) {
              return roles[0];
          }
      }
      return 'subscriber';
    } catch (e) {
      return 'subscriber';
    }
}

export default async function EditUserPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getUser(id);

  if (!user) {
    notFound();
  }

  const role = getRole(user.meta.orion_capabilities);
  const updateUserWithId = updateUser.bind(null, user.ID);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Edit User</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <form action={updateUserWithId} className="p-6 space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium text-slate-700">Username</label>
              <input type="text" name="username" id="username" defaultValue={user.user_login} disabled className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-slate-100 text-slate-500 cursor-not-allowed" />
              <p className="text-xs text-slate-500">Usernames cannot be changed.</p>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email <span className="text-red-500">*</span></label>
              <input type="email" name="email" id="email" defaultValue={user.user_email} required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" />
            </div>

            <div className="space-y-2">
              <label htmlFor="first_name" className="block text-sm font-medium text-slate-700">First Name</label>
              <input type="text" name="first_name" id="first_name" defaultValue={user.meta.first_name || ''} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" />
            </div>

            <div className="space-y-2">
              <label htmlFor="last_name" className="block text-sm font-medium text-slate-700">Last Name</label>
              <input type="text" name="last_name" id="last_name" defaultValue={user.meta.last_name || ''} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" />
            </div>

            <div className="space-y-2">
              <label htmlFor="display_name" className="block text-sm font-medium text-slate-700">Display Name Publicly as</label>
              <input type="text" name="display_name" id="display_name" defaultValue={user.display_name} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" />
            </div>

            <div className="space-y-2">
              <label htmlFor="url" className="block text-sm font-medium text-slate-700">Website</label>
              <input type="url" name="url" id="url" defaultValue={user.user_url} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" />
            </div>

            <div className="space-y-2 col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">Avatar</label>
                <div className="flex items-center gap-4">
                    {user.meta.orion_avatar ? (
                        <img src={user.meta.orion_avatar} alt="Current Avatar" className="h-16 w-16 rounded-full object-cover border border-slate-200" />
                    ) : (
                        <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 text-slate-400">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                        </div>
                    )}
                    
                    <div className="flex-1">
                        <input type="file" name="user_avatar" id="user_avatar" accept="image/*" className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition" />
                        <p className="text-xs text-slate-500 mt-1">Allowed formats: JPG, PNG, WEBP.</p>
                    </div>
                </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-slate-700">New Password</label>
              <input type="password" name="password" id="password" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" />
              <p className="text-xs text-slate-500">Leave blank to keep current password.</p>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="role" className="block text-sm font-medium text-slate-700">Role</label>
            <select name="role" id="role" defaultValue={role} className="w-full md:w-1/2 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition">
              <option value="operator">Operator</option>
              <option value="administrator">Administrator</option>
              <option value="editor">Editor</option>
              <option value="author">Author</option>
              <option value="contributor">Contributor</option>
              <option value="subscriber">Subscriber</option>
            </select>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center">
            <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium shadow-sm">
              Update User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
