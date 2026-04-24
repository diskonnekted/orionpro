
import Link from 'next/link';
import { pool } from '@/lib/db';

type HeaderProps = {
  colors?: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textMuted: string;
    border: string;
  };
};

async function getMenuItems() {
  try {
    const [menus] = await pool.query('SELECT id FROM orion_menus WHERE location = "primary" OR slug = "primary-menu" LIMIT 1');
    const menu = (menus as any[])[0];
    if (!menu) return [];

    const [rows] = await pool.query(`
      SELECT * FROM orion_menu_items 
      WHERE menu_id = ? 
      ORDER BY menu_order ASC
    `, [menu.id]);
    
    return rows as any[];
  } catch (error) {
    console.error('Failed to fetch menu items:', error);
    return [];
  }
}

function buildMenuTree(items: any[]) {
  const map = new Map();
  // Sort items by menu_order first to ensure children are sorted
  // items are already sorted by menu_order from DB query
  items.forEach(item => map.set(item.id, { ...item, children: [] }));
  
  const tree: any[] = [];
  items.forEach(item => {
    if (item.parent_id !== 0) {
        if (map.has(item.parent_id)) {
            map.get(item.parent_id).children.push(map.get(item.id));
        } else {
            // Parent missing, treat as root? Or ignore?
            // Treat as root to be safe
            tree.push(map.get(item.id));
        }
    } else {
        tree.push(map.get(item.id));
    }
  });
  return tree;
}

export default async function Header({ colors }: HeaderProps) {
  const rawItems = await getMenuItems();
  const menuTree = buildMenuTree(rawItems);
  
  const navStyle = colors ? { backgroundColor: colors.surface, borderBottom: `1px solid ${colors.border}` } : {};
  const linkStyle = colors ? { color: colors.textMuted } : {};
  const buttonStyle = colors ? { backgroundColor: colors.primary, color: '#ffffff' } : {};
  const titleStyle = colors ? { color: colors.primary } : {};
  const dropdownBg = colors ? { backgroundColor: colors.surface, border: `1px solid ${colors.border}` } : {};

  return (
    <nav className="bg-white shadow mb-8 transition-colors duration-300 relative z-50" style={navStyle}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="text-2xl font-bold text-blue-600" style={titleStyle}>
            <Link href="/">
              <img src="/orion-logo.png" alt="Orion CMS" className="h-16" />
            </Link>
          </div>
          <div className="hidden md:flex">
             <div className="flex space-x-6">
                {menuTree.map((item) => (
                  <div key={item.id} className="relative group">
                    <Link 
                      href={item.url} 
                      className="text-gray-600 hover:text-blue-600 transition-colors py-2 block" 
                      style={linkStyle}
                    >
                      {item.title}
                      {item.children.length > 0 && <span className="ml-1 text-xs">▼</span>}
                    </Link>
                    
                    {item.children.length > 0 && (
                      <div className="absolute left-0 mt-0 w-48 bg-white shadow-lg rounded-md border border-slate-100 hidden group-hover:block" style={dropdownBg}>
                        <div className="py-1">
                          {item.children.map((child: any) => (
                            <Link 
                              key={child.id}
                              href={child.url}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-50 hover:text-blue-600"
                              style={linkStyle}
                            >
                              {child.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
             </div>
          </div>
          <div className="flex gap-3">
             <Link href="/login" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition-colors" style={buttonStyle}>Login</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
