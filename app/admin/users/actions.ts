'use server';

import { pool } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { getSession } from '@/lib/auth';
import bcrypt from 'bcryptjs';
import { serialize } from 'php-serialize';
import { redirect } from 'next/navigation';
import fs from 'fs/promises';
import path from 'path';

async function saveAvatar(file: File, userId: number): Promise<string | null> {
    if (!file || file.size === 0) return null;

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) return null;

    const buffer = Buffer.from(await file.arrayBuffer());
    const uploadDir = path.join(process.cwd(), 'public/assets/uploads/avatars');
    
    try {
        await fs.access(uploadDir);
    } catch {
        await fs.mkdir(uploadDir, { recursive: true });
    }
    
    const ext = path.extname(file.name).toLowerCase();
    const fileName = `avatar-${userId}-${Math.floor(Date.now() / 1000)}${ext}`;
    const filePath = path.join(uploadDir, fileName);
    
    await fs.writeFile(filePath, buffer);
    
    return `/assets/uploads/avatars/${fileName}`;
}

async function updateUserMeta(connection: any, userId: number, key: string, value: string | number) {
    const [rows] = await connection.query('SELECT umeta_id FROM orion_usermeta WHERE user_id = ? AND meta_key = ?', [userId, key]);
    if ((rows as any[]).length > 0) {
        await connection.query('UPDATE orion_usermeta SET meta_value = ? WHERE user_id = ? AND meta_key = ?', [value, userId, key]);
    } else {
        await connection.query('INSERT INTO orion_usermeta (user_id, meta_key, meta_value) VALUES (?, ?, ?)', [userId, key, value]);
    }
}

export async function deleteUser(userId: number) {
  const session = await getSession();
  if (!session?.userId) {
    throw new Error('Unauthorized');
  }

  // Prevent deleting self
  if (session.userId === userId) {
    throw new Error('Cannot delete your own account');
  }

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // Delete user meta
    await connection.query('DELETE FROM orion_usermeta WHERE user_id = ?', [userId]);

    // Delete user
    await connection.query('DELETE FROM orion_users WHERE ID = ?', [userId]);

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    console.error('Failed to delete user:', error);
    throw new Error('Failed to delete user');
  } finally {
    connection.release();
  }

  revalidatePath('/admin/users');
}

export async function createUser(formData: FormData) {
  const session = await getSession();
  if (!session?.userId) {
    throw new Error('Unauthorized');
  }

  const username = formData.get('username') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const role = formData.get('role') as string;
  const firstName = formData.get('first_name') as string;
  const lastName = formData.get('last_name') as string;
  const website = formData.get('url') as string;
  const displayNameInput = formData.get('display_name') as string;

  if (!username || !email || !password || !role) {
    throw new Error('Missing required fields');
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  
  let displayName = displayNameInput;
  if (!displayName) {
      displayName = (firstName || lastName) ? `${firstName} ${lastName}`.trim() : username;
  }
  
  const niceName = username.toLowerCase().replace(/[^a-z0-9]/g, '-');

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // Check if user exists
    const [existing] = await connection.query(
      'SELECT ID FROM orion_users WHERE user_login = ? OR user_email = ?',
      [username, email]
    );

    if ((existing as any[]).length > 0) {
      throw new Error('Username or Email already exists');
    }

    // Insert User
    const [result] = await connection.query(
      `INSERT INTO orion_users (
        user_login, user_pass, user_nicename, user_email, 
        user_registered, user_activation_key, user_status, display_name
      ) VALUES (?, ?, ?, ?, NOW(), '', 0, ?)`,
      [username, hashedPassword, niceName, email, displayName]
    );

    const userId = (result as any).insertId;

    // Insert Capabilities
    const caps = { [role]: true };
    const serializedCaps = serialize(caps);

    await updateUserMeta(connection, userId, 'orion_capabilities', serializedCaps);

    // Insert User Level (compatibility)
    let userLevel = 0;
    if (role === 'administrator') userLevel = 10;
    else if (role === 'editor') userLevel = 7;
    else if (role === 'operator') userLevel = 5;
    else if (role === 'author') userLevel = 2;
    
    await updateUserMeta(connection, userId, 'orion_user_level', userLevel);
    
    // Insert Name Meta
    if (firstName) await updateUserMeta(connection, userId, 'first_name', firstName);
    if (lastName) await updateUserMeta(connection, userId, 'last_name', lastName);

    // Handle Avatar
    const avatarFile = formData.get('user_avatar') as File;
    const avatarUrl = await saveAvatar(avatarFile, userId);
    if (avatarUrl) {
        await updateUserMeta(connection, userId, 'orion_avatar', avatarUrl);
    }

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    console.error('Failed to create user:', error);
    throw error;
  } finally {
    connection.release();
  }

  revalidatePath('/admin/users');
  redirect('/admin/users');
}

export async function updateUser(userId: number, formData: FormData) {
  const session = await getSession();
  if (!session?.userId) {
    throw new Error('Unauthorized');
  }

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const role = formData.get('role') as string;
  const firstName = formData.get('first_name') as string;
  const lastName = formData.get('last_name') as string;
  const website = formData.get('url') as string;
  const displayNameInput = formData.get('display_name') as string;

  if (!email) {
    throw new Error('Missing required fields');
  }

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // Check if email taken by another user
    const [existing] = await connection.query(
      'SELECT ID FROM orion_users WHERE user_email = ? AND ID != ?',
      [email, userId]
    );

    if ((existing as any[]).length > 0) {
      throw new Error('Email already exists');
    }

    // Update User
    let displayName = displayNameInput;
    if (!displayName) {
        if (firstName || lastName) {
            displayName = `${firstName} ${lastName}`.trim();
        } else {
            const [u] = await connection.query('SELECT user_login FROM orion_users WHERE ID = ?', [userId]);
            displayName = (u as any[])[0].user_login;
        }
    }

    let updateQuery = 'UPDATE orion_users SET user_email = ?, display_name = ?';
    let updateParams = [email, displayName];

    if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        updateQuery += ', user_pass = ?';
        updateParams.push(hashedPassword);
    }

    updateQuery += ' WHERE ID = ?';
    updateParams.push(userId); // Use userId as number

    await connection.query(updateQuery, updateParams);

    // Update Capabilities only if role is provided
    if (role) {
        const caps = { [role]: true };
        const serializedCaps = serialize(caps);
        await updateUserMeta(connection, userId, 'orion_capabilities', serializedCaps);

        // Update User Level
        let userLevel = 0;
        if (role === 'administrator') userLevel = 10;
        else if (role === 'editor') userLevel = 7;
        else if (role === 'operator') userLevel = 5;
        else if (role === 'author') userLevel = 2;
        
        await updateUserMeta(connection, userId, 'orion_user_level', userLevel);
    }

    // Update Name Meta
    await updateUserMeta(connection, userId, 'first_name', firstName || '');
    await updateUserMeta(connection, userId, 'last_name', lastName || '');

    // Handle Avatar
    const avatarFile = formData.get('user_avatar') as File;
    const avatarUrl = await saveAvatar(avatarFile, userId);
    if (avatarUrl) {
        await updateUserMeta(connection, userId, 'orion_avatar', avatarUrl);
    }

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    console.error('Failed to update user:', error);
    throw error;
  } finally {
    connection.release();
  }

  revalidatePath('/admin/users');
  revalidatePath(`/admin/users/${userId}/edit`);
  revalidatePath('/admin/users/profile');

  const redirectTo = formData.get('_redirect') as string;
  if (redirectTo) {
      redirect(redirectTo);
  } else {
      redirect('/admin/users');
  }
}
