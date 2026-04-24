import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { pool } from './db';

export async function uploadFile(file: File, userId: number): Promise<number> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Create directory: public/uploads/YYYY/MM
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const relativeDir = `uploads/${year}/${month}`;
  const uploadDir = join(process.cwd(), 'public', relativeDir);

  await mkdir(uploadDir, { recursive: true });

  // Unique filename
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
  const ext = file.name.split('.').pop();
  const filename = `${file.name.replace(/\.[^/.]+$/, "")}-${uniqueSuffix}.${ext}`;
  const filepath = join(uploadDir, filename);
  const fileUrl = `/${relativeDir}/${filename}`;

  // Write file
  await writeFile(filepath, buffer);

  // Insert attachment into orion_posts
  // Post type 'attachment', status 'inherit'
  const [result] = await pool.query(
    `INSERT INTO orion_posts (
      post_author, 
      post_date, 
      post_content, 
      post_title, 
      post_status, 
      post_type, 
      post_mime_type,
      post_modified,
      guid
    ) VALUES (?, NOW(), '', ?, 'inherit', 'attachment', ?, NOW(), ?)`,
    [userId, file.name, file.type, fileUrl]
  );

  const attachmentId = (result as any).insertId;

  // Add metadata (attached_file)
  // Standard WP stores relative path from uploads dir in _wp_attached_file
  // But simpler here to just store the URL or path
  await pool.query(
    `INSERT INTO orion_postmeta (post_id, meta_key, meta_value) VALUES (?, '_wp_attached_file', ?)`,
    [attachmentId, `${year}/${month}/${filename}`]
  );

  return attachmentId;
}
