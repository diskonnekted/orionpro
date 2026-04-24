'use server';

import { pool } from '@/lib/db';
import { IotDevice, IotLog } from './types';
import { ensureSmartFarmTables } from './setup';

// Ensure tables exist on first load (in a real app, do this in a migration or startup script)
// We'll call this lazily when fetching data for now.

export async function getDevices(): Promise<IotDevice[]> {
  await ensureSmartFarmTables();
  const [rows] = await pool.query('SELECT * FROM iot_devices ORDER BY name ASC');
  return rows as IotDevice[];
}

export async function getDeviceLogs(deviceId: number, limit = 20): Promise<IotLog[]> {
  const [rows] = await pool.query(
    'SELECT * FROM iot_logs WHERE device_id = ? ORDER BY recorded_at DESC LIMIT ?',
    [deviceId, limit]
  );
  return rows as IotLog[];
}

export async function syncDeviceData() {
  // This simulates fetching data from an external API and updating the DB
  const devices = await getDevices();
  const updates = [];

  for (const device of devices) {
    if (device.status === 'active') {
      // Mock data generation based on type
      let newValue: number | string = 0;
      switch (device.type) {
        case 'temperature':
          newValue = 25 + Math.random() * 5 - 2.5; // 22.5 - 27.5
          newValue = parseFloat(newValue.toFixed(2));
          break;
        case 'humidity':
          newValue = 60 + Math.random() * 10 - 5; // 55 - 65
          newValue = parseFloat(newValue.toFixed(2));
          break;
        case 'soil_moisture':
          newValue = 70 + Math.random() * 20 - 10; // 60 - 80
          newValue = parseFloat(newValue.toFixed(2));
          break;
        case 'light_intensity':
          newValue = 5000 + Math.random() * 1000 - 500; // 4500 - 5500
          newValue = parseFloat(newValue.toFixed(2));
          break;
        case 'ph_level':
          newValue = 6.5 + Math.random() * 1 - 0.5; // 6.0 - 7.0
          newValue = parseFloat(newValue.toFixed(2));
          break;
        case 'camera':
          // Mocking an image update - in reality this would be a URL or binary blob
          // We'll use a placeholder from unsplash or similar for demo
          const random = Math.floor(Math.random() * 1000);
          newValue = `https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=400&q=80&random=${random}`;
          break;
        default:
          newValue = Math.random() * 100;
          newValue = parseFloat(newValue.toFixed(2));
      }
      

      // Update device
      await pool.query(
        'UPDATE iot_devices SET last_value = ?, last_updated = NOW() WHERE id = ?',
        [newValue, device.id]
      );

      // Log history
      // For camera, we might not want to log every "frame" in this simple table, but we will for now
      await pool.query(
        'INSERT INTO iot_logs (device_id, value, recorded_at) VALUES (?, ?, NOW())',
        [device.id, newValue]
      );

      updates.push({ id: device.id, value: newValue });
    }
  }

  return { success: true, updates };
}
