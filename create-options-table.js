const mysql = require('mysql2/promise');

async function createOptionsTable() {
  const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'orion_cms',
  });

  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS orion_options (
        option_id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
        option_name varchar(191) NOT NULL DEFAULT '',
        option_value longtext NOT NULL,
        autoload varchar(20) NOT NULL DEFAULT 'yes',
        PRIMARY KEY (option_id),
        UNIQUE KEY option_name (option_name)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    console.log('orion_options table created/verified.');
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

createOptionsTable();
