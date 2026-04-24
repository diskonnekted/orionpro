const mysql = require('mysql2/promise');
(async () => {
  try {
    const conn = await mysql.createConnection({host:'localhost',user:'root',password:'',database:'orion_cms'});
    const [rows] = await conn.query('SELECT * FROM orion_usermeta WHERE meta_key = "orion_avatar"');
    console.log(rows);
    await conn.end();
  } catch (e) {
    console.error(e);
  }
})();
