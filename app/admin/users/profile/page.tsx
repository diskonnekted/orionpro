import { pool } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { updateAdminColorScheme, updateUser } from '../actions';
import { colorSchemes } from '@/lib/color-schemes';
import { SubmitButton } from '../../posts/submit-button';

async function getUserData() {
  const session = await getSession();
  if (!session?.userId) return { user: null, meta: {}, adminScheme: 'default' };

  try {
    const [userRows] = await pool.query('SELECT * FROM orion_users WHERE ID = ?', [session.userId]);
    const user = (userRows as any[])[0] || null;

    const [metaRows] = await pool.query('SELECT meta_key, meta_value FROM orion_usermeta WHERE user_id = ?', [session.userId]);
    const meta = (metaRows as any[]).reduce((acc, row) => {
      acc[row.meta_key] = row.meta_value;
      return acc;
    }, {});

    const adminScheme = meta.admin_color_scheme || 'default';

    return { user, meta, adminScheme };
  } catch (error) {
    return { user: null, meta: {}, adminScheme: 'default' };
  }
}

export default async function ProfilePage() {
  const { user, meta, adminScheme } = await getUserData();

  if (!user) {
    return <div>User not found.</div>;
  }

  const updateUserWithId = updateUser.bind(null, user.ID);

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">Your Profile</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-4 pb-2 border-b border-slate-100">Personal Options</h2>
        
        {/* Admin Color Scheme */}
        <div className="mb-8">
            <h3 className="text-md font-medium text-slate-700 mb-2">Admin Color Scheme</h3>
            <p className="text-slate-500 mb-4 text-sm">Select the color palette for your dashboard.</p>
            
            <form action={updateAdminColorScheme}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {Object.entries(colorSchemes).map(([key, scheme]) => (
                <label key={`admin-${key}`} className={`relative block cursor-pointer group`}>
                    <input 
                    type="radio" 
                    name="scheme" 
                    value={key} 
                    defaultChecked={adminScheme === key}
                    className="peer sr-only" 
                    />
                    <div className="rounded-lg border-2 border-slate-200 peer-checked:border-blue-500 peer-checked:ring-2 peer-checked:ring-blue-200 transition-all overflow-hidden h-full hover:border-blue-300">
                    <div className="h-16 flex">
                        <div className="w-1/4" style={{ backgroundColor: scheme.colors.secondary }}></div>
                        <div className="w-3/4 bg-slate-50 flex flex-col">
                            <div className="h-4 border-b border-slate-200 flex items-center px-2">
                                <div className="w-full h-1 bg-slate-200 rounded"></div>
                            </div>
                            <div className="p-2">
                                <div className="w-1/2 h-2 bg-blue-500 rounded mb-1" style={{ backgroundColor: scheme.colors.primary }}></div>
                                <div className="w-3/4 h-2 bg-slate-200 rounded"></div>
                            </div>
                        </div>
                    </div>
                    <div className="p-3 bg-white">
                        <div className="font-medium text-slate-900 text-sm">{scheme.name}</div>
                    </div>
                    </div>
                    <div className="absolute top-2 right-2 opacity-0 peer-checked:opacity-100 transition-opacity">
                    <div className="bg-blue-500 text-white rounded-full p-0.5 shadow-sm">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    </div>
                </label>
                ))}
            </div>
            <div className="flex justify-start">
                <SubmitButton label="Save Profile" />
            </div>
            </form>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-4 pb-2 border-b border-slate-100">Account Management</h2>
        
        <form action={updateUserWithId}>
            <input type="hidden" name="_redirect" value="/admin/users/profile" />
            <div className="grid grid-cols-1 gap-6 max-w-xl">
            
            <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">Profile Picture</label>
                <div className="flex items-center gap-4">
                    {meta.orion_avatar ? (
                        <img src={meta.orion_avatar} alt="Profile" className="h-16 w-16 rounded-full object-cover border border-slate-200" />
                    ) : (
                        <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 text-slate-400">
                             <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                        </div>
                    )}
                    <div className="flex-1">
                        <input type="file" name="user_avatar" accept="image/*" className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition" />
                        <p className="text-xs text-slate-500 mt-1">Allowed formats: JPG, PNG, WEBP.</p>
                    </div>
                </div>
            </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700">Username</label>
                    <input 
                        type="text" 
                        value={user.user_login} 
                        disabled 
                        className="mt-1 block w-full rounded-md border-slate-200 bg-slate-100 text-slate-500 shadow-sm sm:text-sm border p-2 cursor-not-allowed" 
                    />
                    <p className="mt-1 text-xs text-slate-500">Usernames cannot be changed.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="first_name" className="block text-sm font-medium text-slate-700">First Name</label>
                        <input 
                            type="text" 
                            name="first_name" 
                            id="first_name" 
                            defaultValue={meta.first_name || ''}
                            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2" 
                        />
                    </div>
                    <div>
                        <label htmlFor="last_name" className="block text-sm font-medium text-slate-700">Last Name</label>
                        <input 
                            type="text" 
                            name="last_name" 
                            id="last_name" 
                            defaultValue={meta.last_name || ''}
                            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2" 
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="display_name" className="block text-sm font-medium text-slate-700">Display Name Publicly as</label>
                    <input 
                        type="text" 
                        name="display_name" 
                        id="display_name" 
                        defaultValue={user.display_name}
                        className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2" 
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email Address <span className="text-red-500">*</span></label>
                    <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        required
                        defaultValue={user.user_email}
                        className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2" 
                    />
                </div>

                <div>
                    <label htmlFor="url" className="block text-sm font-medium text-slate-700">Website</label>
                    <input 
                        type="url" 
                        name="url" 
                        id="url" 
                        defaultValue={user.user_url || ''}
                        className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2" 
                    />
                </div>

                <div className="pt-4 border-t border-slate-100">
                    <h3 className="text-md font-medium text-slate-700 mb-2">Password Management</h3>
                    <p className="text-slate-500 text-sm mb-4">Leave blank to keep current password.</p>
                    
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-slate-700">New Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            id="password" 
                            autoComplete="new-password"
                            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2" 
                        />
                    </div>
                </div>

                <div className="pt-4">
                    <SubmitButton label="Update Profile" />
                </div>
            </div>
        </form>
      </div>
    </div>
  );
}
