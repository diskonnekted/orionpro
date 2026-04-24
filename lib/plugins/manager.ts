'use server';

import { pool } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export interface Plugin {
  slug: string;
  name: string;
  description: string;
  version: string;
  author: string;
  status: 'active' | 'inactive';
  icon: string;
  link: string;
}

export async function ensurePluginTable() {
  const connection = await pool.getConnection();
  try {
    await connection.query(`
      CREATE TABLE IF NOT EXISTS orion_plugins (
        slug VARCHAR(100) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        version VARCHAR(20),
        author VARCHAR(100),
        status ENUM('active', 'inactive') DEFAULT 'inactive',
        icon VARCHAR(50),
        link VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // Seed Default Plugins
    const defaultPlugins = [
      {
        slug: 'smartfarm',
        name: 'Smart Farm IoT',
        description: 'Real-time monitoring and management system for agricultural IoT devices.',
        version: '1.0.0',
        author: 'Orion Pro',
        status: 'active',
        icon: '🌱',
        link: '/admin/plugins/smartfarm'
      },
      {
        slug: 'hello-orion',
        name: 'Hello Orion',
        description: 'A simple plugin to demonstrate plugin capabilities.',
        version: '1.0.0',
        author: 'Orion Team',
        status: 'inactive',
        icon: '/plugins/hello-orion.png',
        link: '#'
      },
      {
        slug: 'orion-form',
        name: 'Orion Form',
        description: 'Powerful form builder for your website.',
        version: '2.0.0',
        author: 'Orion Team',
        status: 'inactive',
        icon: '/plugins/orion-form.png',
        link: '#'
      },
      {
        slug: 'orion-pdf-reader',
        name: 'PDF Reader',
        description: 'Embed and read PDF files directly on your site.',
        version: '1.5.0',
        author: 'Orion Team',
        status: 'inactive',
        icon: '/plugins/orion-pdf-reader.png',
        link: '#'
      },
      {
        slug: 'orion-shop-manager',
        name: 'Shop Manager',
        description: 'Manage your e-commerce products and orders.',
        version: '3.0.0',
        author: 'Orion Team',
        status: 'inactive',
        icon: '/plugins/orion-shop-manager.png',
        link: '#'
      }
    ];

    for (const plugin of defaultPlugins) {
      const [rows] = await connection.query('SELECT COUNT(*) as count FROM orion_plugins WHERE slug = ?', [plugin.slug]);
      const count = (rows as any)[0].count;

      if (count === 0) {
        await connection.query(`
          INSERT INTO orion_plugins (slug, name, description, version, author, status, icon, link)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `, [
          plugin.slug,
          plugin.name,
          plugin.description,
          plugin.version,
          plugin.author,
          plugin.status,
          plugin.icon,
          plugin.link
        ]);
      }
    }
  } catch (error) {
    console.error('Error ensuring plugin table:', error);
  } finally {
    connection.release();
  }
}

export async function getPlugins(): Promise<Plugin[]> {
  await ensurePluginTable();
  const [rows] = await pool.query('SELECT * FROM orion_plugins ORDER BY name ASC');
  return rows as Plugin[];
}

export async function togglePluginStatus(slug: string, currentStatus: 'active' | 'inactive') {
  const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
  
  await pool.query(
    'UPDATE orion_plugins SET status = ? WHERE slug = ?',
    [newStatus, slug]
  );
  
  revalidatePath('/admin', 'layout');
  return { success: true, status: newStatus };
}
