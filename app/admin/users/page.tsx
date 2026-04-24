import Link from 'next/link';
import { pool } from '@/lib/db';
import { deleteUser } from './actions';
import { unserialize } from 'php-serialize';
import { getSession } from '@/lib/auth';

interface User {
  ID: number;
  user_login: string;
  user_email: string;
  display_name: string;
  user_registered: string;
  capabilities?: string;
}

function getRole(serializedCaps?: string): string {
  if (!serializedCaps) return 'Subscriber'; // Default if no caps found
  try {
    const caps = unserialize(serializedCaps);
    if (typeof caps === 'object' && caps !== null) {
        const roles = Object.keys(caps).filter((k: string) => caps[k]);
        if (roles.length > 0) {
            return roles[0].charAt(0).toUpperCase() + roles[0].slice(1);
        }
    }
    return 'None';
  } catch (e) {
    return 'Error';
  }
}

async function getUsers() {
  try {
    const [rows] = await pool.query(`
      SELECT u.*, m.meta_value as capabilities 
      FROM orion_users u 
      LEFT JOIN orion_usermeta m ON u.ID = m.user_id AND m.meta_key = 'orion_capabilities'
      ORDER BY u.user_registered DESC
    `);
    return rows as User[];
  } catch (error) {
    console.error('Database Error:', error);
    return [];
  }
}

export default async function UsersPage() {
  const users = await getUsers();
  const session = await getSession();
  const currentUserId = session?.userId;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">Users</h1>
        <Link href="/admin/users/new" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium shadow-sm flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
          Add New User
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Username</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {users.map((user) => {
                const role = getRole(user.capabilities);
                const isCurrentUser = user.ID === currentUserId;
                
                return (
                  <tr key={user.ID} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold mr-3 uppercase">
                          {user.display_name.charAt(0)}
                        </div>
                        <div className="text-sm font-medium text-slate-900">{user.user_login}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {user.display_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      <a href={`mailto:${user.user_email}`} className="hover:text-blue-600">{user.user_email}</a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${role === 'Administrator' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'}`}>
                        {role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link href={`/admin/users/${user.ID}/edit`} className="text-blue-600 hover:text-blue-900 mr-4">Edit</Link>
                      {!isCurrentUser && (
                        <form action={deleteUser.bind(null, user.ID)} className="inline-block" onSubmit={(e) => {
                             if(!confirm('Are you sure you want to delete this user?')) {
                                 e.preventDefault();
                             }
                        }}>
                          <button type="submit" className="text-red-600 hover:text-red-900">Delete</button>
                        </form>
                      )}
                    </td>
                  </tr>
                );
              })}
              {users.length === 0 && (
                <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-slate-500">No users found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
