
const mysql = require('mysql2/promise');

async function checkUsersTable() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'orion_cms'
  });

  try {
    const [rows] = await connection.execute('DESCRIBE orion_users');
    console.log('orion_users structure:', rows);
    
    const [metaRows] = await connection.execute('DESCRIBE orion_usermeta');
    console.log('orion_usermeta structure:', metaRows);
    
    // Check one user to see data
    const [users] = await connection.execute('SELECT * FROM orion_users LIMIT 1');
    console.log('Sample user:', users);

    // Check usermeta for that user
    if (users.length > 0) {
        const [meta] = await connection.execute('SELECT * FROM orion_usermeta WHERE user_id = ?', [users[0].ID]);
        console.log('User meta:', meta);
    }

  } catch (error) {
    console.error(error);
  } finally {
    await connection.end();
  }
}

checkUsersTable();
