
const mysql = require('mysql2/promise');

async function updateTheme() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'orion_cms'
  });

  try {
    const [rows] = await connection.execute(
      'UPDATE orion_options SET option_value = ? WHERE option_name = ?',
      ['orion-learning', 'active_theme']
    );
    console.log('Theme updated to orion-learning:', rows.info);
  } catch (error) {
    console.error('Error updating theme:', error);
  } finally {
    await connection.end();
  }
}

updateTheme();
