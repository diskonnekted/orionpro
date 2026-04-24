const mysql = require('mysql2/promise');

async function checkTables() {
  const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'orion_cms',
  });

  try {
    const [tables] = await pool.query('SHOW TABLES');
    const tableNames = tables.map(t => Object.values(t)[0]);
    console.log('Tables:', tableNames);
    
    if (tableNames.includes('orion_options')) {
        console.log('orion_options exists');
        const [options] = await pool.query('SELECT * FROM orion_options WHERE option_name = "site_color_scheme"');
        console.log('site_color_scheme:', options);
    } else {
        console.log('orion_options does NOT exist');
    }

    if (tableNames.includes('orion_usermeta')) {
        console.log('orion_usermeta exists');
    } else {
        console.log('orion_usermeta does NOT exist');
    }

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

checkTables();
