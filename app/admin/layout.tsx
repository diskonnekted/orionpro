import Link from 'next/link';
import { ReactNode } from 'react';
import Sidebar from '@/components/admin/Sidebar';
import { getSession } from '@/lib/auth';
import { pool } from '@/lib/db';
import { logout } from './actions';
import { colorSchemes, ColorSchemeName } from '@/lib/color-schemes';
import { getPlugins } from '@/lib/plugins/manager';

async function getUser() {
  const session = await getSession();
  if (!session?.userId) return null;

  try {
    const [rows] = await pool.query('SELECT display_name, user_email FROM orion_users WHERE ID = ?', [session.userId]);
    return (rows as any)[0] || null;
  } catch (error) {
    return null;
  }
}

async function getUserScheme() {
  const session = await getSession();
  if (!session?.userId) return 'default';

  try {
    const [rows] = await pool.query(
      'SELECT meta_value FROM orion_usermeta WHERE user_id = ? AND meta_key = "admin_color_scheme"',
      [session.userId]
    );
    const scheme = (rows as any)[0]?.meta_value;
    return (scheme && colorSchemes[scheme as ColorSchemeName]) ? scheme : 'default';
  } catch (error) {
    return 'default';
  }
}

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const user = await getUser();
  const schemeName = await getUserScheme() as ColorSchemeName;
  const colors = colorSchemes[schemeName]?.colors;
  const plugins = await getPlugins();
  
  const mainStyle = colors ? { backgroundColor: colors.background } : {};
  const headerStyle = colors ? { 
    backgroundColor: colors.surface, 
    borderColor: colors.border,
    color: colors.text
  } : {};
  const textStyle = colors ? { color: colors.text } : {};
  const textMutedStyle = colors ? { color: colors.textMuted } : {};
  
  // Helper for button hover effect simulation if needed, or just use simple colors
  // For logout button, we keep it red usually, or adapt? Let's keep it red for safety.

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 font-sans text-slate-800" style={mainStyle}>
      <Sidebar colors={colors} plugins={plugins} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden bg-slate-50" style={mainStyle}>
        {/* Topbar */}
        <header 
          className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-10 shadow-sm transition-colors duration-300"
          style={headerStyle}
        >
           <div className="flex items-center">
              <h2 className="text-xl font-semibold text-slate-800" style={textStyle}>Orion Pro Dashboard</h2>
           </div>
           <div className="flex items-center gap-6">
              <Link href="/" target="_blank" className="text-sm font-medium text-slate-500 hover:text-blue-600 flex items-center gap-2 transition-colors" style={textMutedStyle}>
                 Visit Site <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
              </Link>
              
              <div className="h-6 w-px bg-slate-200" style={{ backgroundColor: colors?.border }}></div>

              <div className="flex items-center gap-4">
                  <Link href="/admin/users/profile" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                      <div className="text-right hidden sm:block">
                          <p className="text-sm font-medium text-slate-700" style={textStyle}>{user?.display_name || 'Administrator'}</p>
                      </div>
                      <div 
                        className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold border border-blue-200"
                        style={colors ? { 
                          backgroundColor: colors.background, 
                          color: colors.primary,
                          borderColor: colors.border
                        } : {}}
                      >
                          {(user?.display_name || 'A').charAt(0).toUpperCase()}
                      </div>
                  </Link>
                  
                  <form action={logout}>
                      <button type="submit" className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors">
                          Logout
                      </button>
                  </form>
              </div>
           </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
