import { pool } from '@/lib/db';
import Link from 'next/link';
import VisitorChart from '@/components/admin/VisitorChart';
import { getSession } from '@/lib/auth';
import { colorSchemes, ColorSchemeName } from '@/lib/color-schemes';

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

async function getStats() {
  try {
    const [posts] = await pool.query('SELECT COUNT(*) as count FROM orion_posts WHERE post_type = "post" AND post_status = "publish"');
    const [pages] = await pool.query('SELECT COUNT(*) as count FROM orion_posts WHERE post_type = "page" AND post_status = "publish"');
    const [users] = await pool.query('SELECT COUNT(*) as count FROM orion_users');
    const [cats] = await pool.query('SELECT COUNT(*) as count FROM orion_term_taxonomy WHERE taxonomy = "category"');
    const [postsWeek] = await pool.query('SELECT COUNT(*) as count FROM orion_posts WHERE post_type = "post" AND post_status = "publish" AND post_date >= DATE_SUB(NOW(), INTERVAL 7 DAY)');
    const [usersWeek] = await pool.query('SELECT COUNT(*) as count FROM orion_users WHERE user_registered >= DATE_SUB(NOW(), INTERVAL 7 DAY)');

    return {
      posts: (posts as any)[0].count,
      postsWeek: (postsWeek as any)[0].count,
      pages: (pages as any)[0].count,
      users: (users as any)[0].count,
      usersWeek: (usersWeek as any)[0].count,
      cats: (cats as any)[0].count
    };
  } catch (error) {
    return { posts: 0, postsWeek: 0, pages: 0, users: 0, usersWeek: 0, cats: 0 };
  }
}

async function getRecentActivity() {
    try {
        const activities = [];

        // Recent Posts
        const [posts] = await pool.query(`
            SELECT p.ID, p.post_title, p.post_date, u.display_name 
            FROM orion_posts p 
            LEFT JOIN orion_users u ON p.post_author = u.ID 
            WHERE p.post_type = 'post' AND p.post_status = 'publish' 
            ORDER BY p.post_date DESC LIMIT 5
        `);
        
        (posts as any[]).forEach(post => {
            activities.push({
                type: 'post',
                title: post.post_title,
                author: post.display_name,
                date: post.post_date,
                id: post.ID
            });
        });

        // Recent Users
        const [users] = await pool.query('SELECT ID, display_name, user_registered FROM orion_users ORDER BY user_registered DESC LIMIT 3');
        
        (users as any[]).forEach(user => {
            activities.push({
                type: 'user',
                title: user.display_name,
                author: '',
                date: user.user_registered,
                id: user.ID
            });
        });

        // Sort by date desc
        activities.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        
        return activities.slice(0, 5);
    } catch (error) {
        return [];
    }
}

// Time Ago Helper
function timeAgo(dateString: string) {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 604800;
    if (interval > 1) return Math.floor(interval) + " weeks ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return "just now";
}

export default async function AdminPage() {
  const stats = await getStats();
  const activities = await getRecentActivity();
  const schemeName = await getUserScheme() as ColorSchemeName;
  const colors = colorSchemes[schemeName]?.colors;

  // Dynamic styles
  const cardStyle = colors ? { backgroundColor: colors.surface, borderColor: colors.border } : {};
  const headerStyle = colors ? { backgroundColor: `${colors.background}`, borderBottomColor: colors.border } : {};
  const textStyle = colors ? { color: colors.text } : {};
  const mutedTextStyle = colors ? { color: colors.textMuted } : {};
  const headingStyle = colors ? { color: colors.text } : {};

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Posts */}
        <div className="bg-gradient-to-br from-white to-blue-50 backdrop-blur-sm rounded-xl shadow-sm border border-blue-100 p-5 relative overflow-hidden group hover:shadow-md hover:border-blue-200 hover:-translate-y-0.5 transition-all duration-300">
            {/* Background Icon */}
            <div className="absolute -right-6 -bottom-6 text-blue-600 opacity-10 transform rotate-12 group-hover:scale-110 group-hover:rotate-0 transition-all duration-500 pointer-events-none">
                <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path stroke="none" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path></svg>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            
            <div className="flex justify-between items-start z-10 relative mb-3">
                <div className="p-2.5 bg-white text-blue-600 rounded-lg shadow-sm border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path></svg>
                </div>
                {stats.postsWeek > 0 && (
                    <span className="flex items-center text-xs font-semibold text-emerald-600 bg-white/80 px-2 py-0.5 rounded-full border border-emerald-100 shadow-sm">
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                        +{stats.postsWeek}
                    </span>
                )}
            </div>
            <div>
                <p className="text-sm font-medium text-slate-500 mb-1">Total Posts</p>
                <h3 className="text-2xl font-semibold text-slate-700 tracking-tight group-hover:text-blue-600 transition-colors">{stats.posts}</h3>
            </div>
        </div>

        {/* Pages */}
        <div className="bg-gradient-to-br from-white to-purple-50 backdrop-blur-sm rounded-xl shadow-sm border border-purple-100 p-5 relative overflow-hidden group hover:shadow-md hover:border-purple-200 hover:-translate-y-0.5 transition-all duration-300">
            {/* Background Icon */}
            <div className="absolute -right-6 -bottom-6 text-purple-600 opacity-10 transform rotate-12 group-hover:scale-110 group-hover:rotate-0 transition-all duration-500 pointer-events-none">
                <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path stroke="none" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            
            <div className="flex justify-between items-start z-10 relative mb-3">
                <div className="p-2.5 bg-white text-purple-600 rounded-lg shadow-sm border border-purple-100 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                </div>
            </div>
            <div>
                <p className="text-sm font-medium text-slate-500 mb-1">Total Pages</p>
                <h3 className="text-2xl font-semibold text-slate-700 tracking-tight group-hover:text-purple-600 transition-colors">{stats.pages}</h3>
            </div>
        </div>

        {/* Categories */}
        <div className="bg-gradient-to-br from-white to-amber-50 backdrop-blur-sm rounded-xl shadow-sm border border-amber-100 p-5 relative overflow-hidden group hover:shadow-md hover:border-amber-200 hover:-translate-y-0.5 transition-all duration-300">
            {/* Background Icon */}
            <div className="absolute -right-6 -bottom-6 text-amber-600 opacity-10 transform rotate-12 group-hover:scale-110 group-hover:rotate-0 transition-all duration-500 pointer-events-none">
                <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path stroke="none" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path></svg>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-amber-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            
            <div className="flex justify-between items-start z-10 relative mb-3">
                <div className="p-2.5 bg-white text-amber-600 rounded-lg shadow-sm border border-amber-100 group-hover:bg-amber-600 group-hover:text-white transition-colors duration-300">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path></svg>
                </div>
            </div>
            <div>
                <p className="text-sm font-medium text-slate-500 mb-1">Categories</p>
                <h3 className="text-2xl font-semibold text-slate-700 tracking-tight group-hover:text-amber-600 transition-colors">{stats.cats}</h3>
            </div>
        </div>
        
        {/* Users */}
        <div className="bg-gradient-to-br from-white to-emerald-50 backdrop-blur-sm rounded-xl shadow-sm border border-emerald-100 p-5 relative overflow-hidden group hover:shadow-md hover:border-emerald-200 hover:-translate-y-0.5 transition-all duration-300">
            {/* Background Icon */}
            <div className="absolute -right-6 -bottom-6 text-emerald-600 opacity-10 transform rotate-12 group-hover:scale-110 group-hover:rotate-0 transition-all duration-500 pointer-events-none">
                <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path stroke="none" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-emerald-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            
            <div className="flex justify-between items-start z-10 relative mb-3">
                <div className="p-2.5 bg-white text-emerald-600 rounded-lg shadow-sm border border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                </div>
                {stats.usersWeek > 0 && (
                    <span className="flex items-center text-xs font-semibold text-emerald-600 bg-white/80 px-2 py-0.5 rounded-full border border-emerald-100 shadow-sm">
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                        +{stats.usersWeek}
                    </span>
                )}
            </div>
            <div>
                <p className="text-sm font-medium text-slate-500 mb-1">Total Users</p>
                <h3 className="text-2xl font-semibold text-slate-700 tracking-tight group-hover:text-emerald-600 transition-colors">{stats.users}</h3>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         {/* Visitor Statistics Chart */}
         <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden h-fit" style={cardStyle}>
            <div className="px-5 py-4 border-b border-slate-100 flex flex-col md:flex-row md:justify-between md:items-center gap-4 bg-slate-50/50" style={headerStyle}>
                <div className="flex items-center gap-3 w-full md:w-auto md:flex-1 min-w-0">
                    <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg flex-shrink-0" style={{ backgroundColor: colors?.primary ? `${colors.primary}1A` : undefined, color: colors?.primary }}>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                    </div>
                    <div className="min-w-0 flex-1">
                        <h2 className="text-base font-semibold text-slate-800 flex items-center flex-wrap gap-2" style={headingStyle}>
                            Traffic Overview
                            <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                            </span>
                        </h2>
                        <p className="text-xs text-slate-500 mt-0.5 break-words leading-relaxed" style={mutedTextStyle}>Real-time visitor statistics for the last 30 days</p>
                    </div>
                </div>
                <div className="flex gap-2 w-full md:w-auto flex-shrink-0">
                    <button className="flex-1 md:flex-none inline-flex justify-center items-center px-2.5 py-1 rounded-md text-xs font-medium bg-white border border-slate-200 text-slate-600 shadow-sm hover:bg-slate-50 transition-colors" style={{ ...cardStyle, ...mutedTextStyle }}>
                        <span className="w-2 h-2 rounded-full mr-1.5" style={{ backgroundColor: colors?.primary || '#3b82f6' }}></span> Visitors
                    </button>
                    <button className="flex-1 md:flex-none inline-flex justify-center items-center px-2.5 py-1 rounded-md text-xs font-medium bg-white border border-slate-200 text-slate-600 shadow-sm hover:bg-slate-50 transition-colors" style={{ ...cardStyle, ...mutedTextStyle }}>
                        <span className="w-2 h-2 rounded-full mr-1.5" style={{ backgroundColor: colors?.secondary || '#94a3b8' }}></span> Page Views
                    </button>
                </div>
            </div>
            <div className="p-5 relative h-[400px] min-h-[400px]" style={{ backgroundColor: colors?.surface }}>
                <VisitorChart colors={colors} />
            </div>
         </div>

         {/* Recent Activity */}
         <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col overflow-hidden h-fit" style={cardStyle}>
            <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50" style={headerStyle}>
                <h2 className="text-base font-semibold text-slate-800 flex items-center" style={headingStyle}>
                    <svg className="w-5 h-5 mr-2 text-slate-500" style={{ color: colors?.textMuted }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    Recent Activity
                </h2>
                <Link href="/admin/posts" className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline flex items-center" style={{ color: colors?.primary }}>
                    View All
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </Link>
            </div>
            <div className="p-5 flex-grow" style={{ backgroundColor: colors?.surface }}>
                <ul className="relative border-l-2 border-slate-100 ml-3 space-y-6" style={{ borderColor: colors?.border }}>
                    {activities.length === 0 ? (
                        <li className="pl-6 text-slate-500 italic text-sm" style={mutedTextStyle}>No recent activity found.</li>
                    ) : (
                        activities.map((item) => (
                            <li key={`${item.type}-${item.id}`} className="relative pl-8 group">
                                {item.type === 'post' ? (
                                    <>
                                        <span className="absolute -left-[11px] top-1 h-5 w-5 rounded-full border-4 border-white bg-blue-500 shadow-sm group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: colors?.primary, borderColor: colors?.surface }}></span>
                                        <div className="p-3 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100" style={{ borderColor: 'transparent' }}>
                                            <div className="flex justify-between items-start">
                                                <p className="text-sm text-slate-600" style={mutedTextStyle}><span className="font-semibold text-slate-900" style={headingStyle}>{item.author}</span> published a new post</p>
                                                <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full whitespace-nowrap" style={{ backgroundColor: colors?.background, color: colors?.textMuted }}>{timeAgo(item.date)}</span>
                                            </div>
                                            <Link href={`/admin/posts/${item.id}/edit`} className="block mt-1 text-sm font-semibold text-slate-800 hover:text-blue-600 transition-colors" style={{ color: colors?.text }}>
                                                {item.title}
                                            </Link>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <span className="absolute -left-[11px] top-1 h-5 w-5 rounded-full border-4 border-white bg-rose-500 shadow-sm group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: colors?.secondary, borderColor: colors?.surface }}></span>
                                        <div className="p-3 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100" style={{ borderColor: 'transparent' }}>
                                            <div className="flex justify-between items-start">
                                                <p className="text-sm text-slate-600" style={mutedTextStyle}><span className="font-semibold text-slate-900" style={headingStyle}>New User</span> registered</p>
                                                <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full whitespace-nowrap" style={{ backgroundColor: colors?.background, color: colors?.textMuted }}>{timeAgo(item.date)}</span>
                                            </div>
                                            <p className="block mt-1 text-sm font-semibold text-slate-800" style={{ color: colors?.text }}>
                                                {item.title}
                                            </p>
                                        </div>
                                    </>
                                )}
                            </li>
                        ))
                    )}
                </ul>
            </div>
         </div>
      </div>
    </div>
  );
}
