import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Missing or invalid Authorization header' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    
    // Verify Token
    const [rows] = await pool.query('SELECT id FROM orion_iot_devices WHERE token = ?', [token]);
    const devices = rows as any[];
    
    if (devices.length === 0) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 403 });
    }
    
    const deviceId = devices[0].id;
    const data = await request.json();

    // Update Last Seen
    await pool.query('UPDATE orion_iot_devices SET last_seen = NOW(), status = "active" WHERE id = ?', [deviceId]);

    // Insert Telemetry
    await pool.query('INSERT INTO orion_iot_telemetry (device_id, data) VALUES (?, ?)', [
      deviceId, 
      JSON.stringify(data)
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Telemetry Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
