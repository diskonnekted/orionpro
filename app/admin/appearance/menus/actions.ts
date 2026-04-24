
'use server';

import { pool } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function getMenus() {
  const [rows] = await pool.query('SELECT * FROM orion_menus ORDER BY name');
  return rows as any[];
}

export async function getMenuItems(menuId: number) {
  const [rows] = await pool.query(`
    SELECT * FROM orion_menu_items 
    WHERE menu_id = ? 
    ORDER BY menu_order ASC
  `, [menuId]);
  return rows as any[];
}

export async function getPages() {
  const [rows] = await pool.query(`
    SELECT ID, post_title, post_name 
    FROM orion_posts 
    WHERE post_type = 'page' AND post_status = 'publish' 
    ORDER BY post_title ASC
  `);
  return rows as any[];
}

export async function addCustomLink(menuId: number, title: string, url: string) {
  // Get max order
  const [rows] = await pool.query('SELECT MAX(menu_order) as maxOrder FROM orion_menu_items WHERE menu_id = ?', [menuId]);
  const maxOrder = (rows as any[])[0].maxOrder || 0;

  await pool.query(`
    INSERT INTO orion_menu_items (menu_id, title, url, type, menu_order)
    VALUES (?, ?, ?, 'custom', ?)
  `, [menuId, title, url, maxOrder + 1]);
  
  revalidatePath('/admin/appearance/menus');
}

export async function addPageLink(menuId: number, pageId: number, title: string, url: string) {
  const [rows] = await pool.query('SELECT MAX(menu_order) as maxOrder FROM orion_menu_items WHERE menu_id = ?', [menuId]);
  const maxOrder = (rows as any[])[0].maxOrder || 0;

  await pool.query(`
    INSERT INTO orion_menu_items (menu_id, title, url, type, object_id, menu_order)
    VALUES (?, ?, ?, 'page', ?, ?)
  `, [menuId, title, url, pageId, maxOrder + 1]);

  revalidatePath('/admin/appearance/menus');
}

export async function deleteMenuItem(id: number) {
  await pool.query('DELETE FROM orion_menu_items WHERE id = ?', [id]);
  // Also delete children? Or promote them?
  // For simplicity, let's delete children too or set their parent to 0. 
  // Standard behavior is often to delete children or move them up.
  // Given cascading delete on foreign key is not set for self-reference, we should handle it.
  // Let's just update children to have parent_id = 0 for now to be safe.
  await pool.query('UPDATE orion_menu_items SET parent_id = 0 WHERE parent_id = ?', [id]);
  
  revalidatePath('/admin/appearance/menus');
}

export async function updateMenuItems(items: any[]) {
  // items is an array of { id, parent_id, menu_order }
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    for (const item of items) {
      await connection.query(
        'UPDATE orion_menu_items SET parent_id = ?, menu_order = ? WHERE id = ?',
        [item.parent_id, item.menu_order, item.id]
      );
    }
    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
  revalidatePath('/admin/appearance/menus');
}
