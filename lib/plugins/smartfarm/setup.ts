import { pool } from '@/lib/db';

export async function ensureSmartFarmTables() {
  const connection = await pool.getConnection();
  try {
    // Table: iot_devices
    // We add board_type and location columns if they don't exist
    await connection.query(`
      CREATE TABLE IF NOT EXISTS iot_devices (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        type VARCHAR(50) NOT NULL,
        board_type VARCHAR(50) DEFAULT 'ESP32 Dev Kit',
        unit VARCHAR(20) NOT NULL,
        location VARCHAR(100) DEFAULT 'Greenhouse 1',
        api_endpoint VARCHAR(255),
        status ENUM('active', 'inactive', 'error') DEFAULT 'active',
        last_value TEXT,
        last_updated TIMESTAMP NULL DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // Check if board_type column exists (for updates)
    try {
      await connection.query('SELECT board_type FROM iot_devices LIMIT 1');
    } catch (e) {
      // Column doesn't exist, add it
      await connection.query('ALTER TABLE iot_devices ADD COLUMN board_type VARCHAR(50) DEFAULT "ESP32 Dev Kit" AFTER type');
      await connection.query('ALTER TABLE iot_devices ADD COLUMN location VARCHAR(100) DEFAULT "Greenhouse 1" AFTER unit');
      await connection.query('ALTER TABLE iot_devices MODIFY COLUMN last_value TEXT'); // Change DECIMAL to TEXT to support image URLs or strings
    }

    // Table: iot_logs
    await connection.query(`
      CREATE TABLE IF NOT EXISTS iot_logs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        device_id INT NOT NULL,
        value TEXT NOT NULL,
        recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_device_date (device_id, recorded_at),
        FOREIGN KEY (device_id) REFERENCES iot_devices(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

     // Check if logs value column needs update
    try {
        // simple check if we can insert a string
        // but easier to just ALTER MODIFY to be safe as it's idempotent-ish for type expansion
        await connection.query('ALTER TABLE iot_logs MODIFY COLUMN value TEXT NOT NULL');
    } catch (e) {
        // ignore
    }

    // Seed some initial data if empty
    const [rows] = await connection.query('SELECT COUNT(*) as count FROM iot_devices');
    const count = (rows as any)[0].count;

    if (count === 0) {
      const initialDevices = [
        ['Sensor Suhu Udara', 'temperature', 'ESP32 Dev Kit', '°C', 'Greenhouse A', 'active'],
        ['Kelembaban Udara', 'humidity', 'ESP32 Dev Kit', '%', 'Greenhouse A', 'active'],
        ['Kelembaban Tanah A1', 'soil_moisture', 'ESP32 Dev Kit', '%', 'Bed 1', 'active'],
        ['Kamera Pantau 1', 'camera', 'ESP32-CAM Wrover', 'img', 'Main Entrance', 'active'],
        ['Intensitas Cahaya', 'light_intensity', 'ESP32 Dev Kit', 'lux', 'Roof', 'active'],
        ['pH Tanah', 'ph_level', 'ESP32 Dev Kit', 'pH', 'Bed 1', 'active']
      ];

      for (const device of initialDevices) {
        await connection.query(
          'INSERT INTO iot_devices (name, type, board_type, unit, location, status) VALUES (?, ?, ?, ?, ?, ?)',
          device
        );
      }
    } else {
        // Optional: Insert the Camera if it doesn't exist (for existing users)
        const [camRows] = await connection.query('SELECT * FROM iot_devices WHERE type = "camera"');
        if ((camRows as any).length === 0) {
             await connection.query(
                'INSERT INTO iot_devices (name, type, board_type, unit, location, status) VALUES (?, ?, ?, ?, ?, ?)',
                ['Kamera Pantau 1', 'camera', 'ESP32-CAM Wrover', 'img', 'Main Entrance', 'active']
              );
        }
    }
  } catch (error) {
    console.error('Error setting up Smart Farm tables:', error);
    throw error;
  } finally {
    connection.release();
  }
}
