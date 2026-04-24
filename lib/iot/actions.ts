'use server';

import { pool } from '@/lib/db';

export interface TelemetryPoint {
  created_at: string;
  data: {
    temperature?: number;
    humidity?: number;
    soil_moisture?: number;
    light?: number;
    [key: string]: any;
  };
  device_name: string;
}

export async function getDashboardData() {
  try {
    // Get active devices count
    const [deviceRows] = await pool.query('SELECT COUNT(*) as count FROM orion_iot_devices WHERE status = "active"');
    const activeDevices = (deviceRows as any[])[0]?.count || 0;

    // Get latest telemetry
    const [rows] = await pool.query(`
      SELECT 
        t.created_at,
        t.data,
        d.name as device_name
      FROM orion_iot_telemetry t
      JOIN orion_iot_devices d ON t.device_id = d.id
      ORDER BY t.created_at DESC
      LIMIT 50
    `);

    return {
      activeDevices,
      telemetry: (rows as any[]).map(row => ({
        ...row,
        // Ensure data is parsed if it comes as string (depending on driver/mysql version)
        data: typeof row.data === 'string' ? JSON.parse(row.data) : row.data
      })) as TelemetryPoint[]
    };
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return { activeDevices: 0, telemetry: [] };
  }
}

export async function seedDummyTelemetry() {
  // Helper to add some dummy data if needed for demo
  try {
    // Check if we have devices
    const [devices] = await pool.query('SELECT id FROM orion_iot_devices LIMIT 1');
    let deviceId;
    
    if ((devices as any[]).length === 0) {
      // Create a dummy device
      const [res] = await pool.query('INSERT INTO orion_iot_devices (name, token, status) VALUES (?, ?, ?)', 
        ['Demo Sensor 1', 'demo-token-' + Date.now(), 'active']);
      deviceId = (res as any).insertId;
    } else {
      deviceId = (devices as any[])[0].id;
    }

    // Insert a few readings
    for (let i = 0; i < 10; i++) {
      const data = JSON.stringify({
        temperature: 24 + Math.random() * 5,
        humidity: 60 + Math.random() * 20,
        soil_moisture: 40 + Math.random() * 10,
        light: 500 + Math.random() * 500
      });
      // Time in past
      const date = new Date();
      date.setMinutes(date.getMinutes() - i * 10);
      
      await pool.query('INSERT INTO orion_iot_telemetry (device_id, data, created_at) VALUES (?, ?, ?)',
        [deviceId, data, date]);
    }
    
    return { success: true };
  } catch (e) {
    console.error(e);
    return { success: false };
  }
}
