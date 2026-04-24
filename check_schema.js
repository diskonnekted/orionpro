const mysql = require('mysql2/promise');

(async () => {
  try {
    const conn = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'orion_cms'
    });
    const [rows] = await conn.query('DESCRIBE orion_users');
    console.log(rows);
    await conn.end();
  } catch (err) {
    console.error(err);
  }
})();
