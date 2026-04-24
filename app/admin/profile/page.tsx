import { pool } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { updateAdminColorScheme } from '../appearance/actions';
import { colorSchemes } from '@/lib/color-schemes';
import { SubmitButton } from '../posts/submit-button';

async function getUserProfile() {
  const session = await getSession();
  if (!session?.userId) return null;

  try {
    const [rows] = await pool.query('SELECT ID, display_name, user_email FROM orion_users WHERE ID = ?', [session.userId]);
    const user = (rows as any[])[0];

    if (!user) return null;

    // Get Admin Color Scheme
    const [meta] = await pool.query('SELECT meta_value FROM orion_usermeta WHERE user_id = ? AND meta_key = "admin_color_scheme"', [session.userId]);
    user.admin_color_scheme = (meta as any[])[0]?.meta_value || 'default';

    return user;
  } catch (error) {
    return null;
  }
}

export default async function ProfilePage() {
  const user = await getUserProfile();

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">Your Profile</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center gap-6 mb-8 pb-8 border-b border-slate-100">
           <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-2xl border-2 border-blue-200">
              {user.display_name.charAt(0).toUpperCase()}
           </div>
           <div>
              <h2 className="text-xl font-bold text-slate-900">{user.display_name}</h2>
              <p className="text-slate-500">{user.user_email}</p>
              <span className="inline-flex mt-2 items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                 Administrator
              </span>
           </div>
        </div>

        {/* Admin Color Scheme settings moved to Themes & Appearance */}
        <div className="bg-slate-50 rounded-lg p-6 text-center border border-slate-200">
            <p className="text-slate-500">
                To change your dashboard color scheme, please visit the <a href="/admin/appearance/themes" className="text-blue-600 hover:underline">Themes & Appearance</a> page.
            </p>
        </div>

      </div>
    </div>
  );
}
