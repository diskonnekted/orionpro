
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

// Helper to serialize PHP-like object (simplified for this case)
function serializeCaps(role) {
  return `a:1:{s:${role.length}:"${role}";b:1;}`;
}

async function createAdmin() {
  const config = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'orion_cms',
  };

  console.log('Connecting to database:', { ...config, password: '***' });

  let connection;
  try {
    connection = await mysql.createConnection(config);
    console.log('Connected successfully.');

    const username = 'admin';
    const password = 'admin123';
    const email = 'admin@orion-pro.com';
    const hashedPassword = await bcrypt.hash(password, 10);
    const niceName = 'admin';
    const displayName = 'Administrator';

    // 1. Check if user exists
    const [users] = await connection.execute(
      'SELECT ID FROM orion_users WHERE user_login = ?',
      [username]
    );

    let userId;
    if (users.length > 0) {
      userId = users[0].ID;
      console.log(`User "${username}" already exists (ID: ${userId}). Updating password...`);
      await connection.execute(
        'UPDATE orion_users SET user_pass = ?, user_email = ?, display_name = ? WHERE ID = ?',
        [hashedPassword, email, displayName, userId]
      );
    } else {
      console.log(`Creating user "${username}"...`);
      const [result] = await connection.execute(
        `INSERT INTO orion_users (
          user_login, user_pass, user_nicename, user_email, 
          user_registered, user_activation_key, user_status, display_name
        ) VALUES (?, ?, ?, ?, NOW(), '', 0, ?)`,
        [username, hashedPassword, niceName, email, displayName]
      );
      userId = result.insertId;
      console.log(`User created with ID: ${userId}`);
    }

    // 2. Set capabilities
    const serializedCaps = serializeCaps('administrator');
    const [metaCaps] = await connection.execute(
      'SELECT umeta_id FROM orion_usermeta WHERE user_id = ? AND meta_key = "orion_capabilities"',
      [userId]
    );

    if (metaCaps.length > 0) {
      await connection.execute(
        'UPDATE orion_usermeta SET meta_value = ? WHERE user_id = ? AND meta_key = "orion_capabilities"',
        [serializedCaps, userId]
      );
    } else {
      await connection.execute(
        'INSERT INTO orion_usermeta (user_id, meta_key, meta_value) VALUES (?, "orion_capabilities", ?)',
        [userId, serializedCaps]
      );
    }

    // 3. Set user level
    const [metaLevel] = await connection.execute(
      'SELECT umeta_id FROM orion_usermeta WHERE user_id = ? AND meta_key = "orion_user_level"',
      [userId]
    );

    if (metaLevel.length > 0) {
      await connection.execute(
        'UPDATE orion_usermeta SET meta_value = "10" WHERE user_id = ? AND meta_key = "orion_user_level"',
        [userId]
      );
    } else {
      await connection.execute(
        'INSERT INTO orion_usermeta (user_id, meta_key, meta_value) VALUES (?, "orion_user_level", "10")',
        [userId]
      );
    }

    console.log('--------------------------------------------------');
    console.log('SUCCESS: Admin account is ready!');
    console.log('Username: ' + username);
    console.log('Password: ' + password);
    console.log('--------------------------------------------------');

  } catch (error) {
    console.error('ERROR:', error.message);
    if (error.code === 'ECONNREFUSED') {
      console.error('Could not connect to MySQL. Please make sure XAMPP/MySQL is running.');
    }
  } finally {
    if (connection) await connection.end();
  }
}

createAdmin();
