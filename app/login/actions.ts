'use server';

import { pool } from '@/lib/db';
import { createSession, deleteSession } from '@/lib/auth';
import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';

export async function login(prevState: any, formData: FormData) {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  if (!username || !password) {
    return { error: 'Please enter both username and password.' };
  }

  try {
    console.log('DEBUG: Attempting login for user:', username);
    
    if (!pool || typeof pool.query !== 'function') {
      console.error('DEBUG: Database pool is not initialized');
      return { error: 'Database configuration error.' };
    }

    // Check if user exists (by username or email)
    const [rows] = await pool.query(
      'SELECT ID, user_login, user_pass, user_email FROM orion_users WHERE user_login = ? OR user_email = ?', 
      [username, username]
    );

    const users = rows as any[];

    if (users.length === 0) {
      console.log('DEBUG: User not found in database:', username);
      return { error: 'Invalid username or password.' };
    }

    const user = users[0];
    console.log('DEBUG: Found user:', user.user_login);

    // Verify password
    const hashedPassword = user.user_pass.replace(/^\$2y\$/, '$2a$');
    const validPassword = await bcrypt.compare(password, hashedPassword);

    if (!validPassword) {
      console.log('DEBUG: Invalid password for user:', username);
      return { error: 'Invalid username or password.' };
    }

    console.log('DEBUG: Login successful for user:', user.user_login);
    // Create session
    await createSession(user.ID);

  } catch (error: any) {
     console.error('DEBUG: Login error details:', {
       message: error?.message,
       code: error?.code,
       errno: error?.errno,
       sqlState: error?.sqlState
     });
     
     if (error?.code === 'ECONNREFUSED') {
       return { error: 'Database connection failed. Please ensure MySQL is running on 127.0.0.1:3306.' };
     }
     if (error?.code === 'ER_BAD_DB_ERROR') {
       return { error: 'Database "orion_cms" not found. Please create it in phpMyAdmin.' };
     }
     if (error?.code === 'ER_ACCESS_DENIED_ERROR') {
       return { error: 'Access denied for user "root". Check your database password.' };
     }
     return { error: 'Login failed: ' + (error?.message || 'Unknown error') };
   }
  
  redirect('/admin');
}

export async function logout() {
  await deleteSession();
  redirect('/login');
}
