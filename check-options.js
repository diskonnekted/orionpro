
const mysql = require('mysql2/promise');

async function checkOptionsTable() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'orion_cms'
  });

  try {
    const [rows] = await connection.execute('DESCRIBE orion_options');
    console.log(rows);
  } catch (error) {
    console.error(error);
  } finally {
    await connection.end();
  }
}

checkOptionsTable();
