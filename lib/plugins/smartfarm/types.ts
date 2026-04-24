export interface IotDevice {
  id: number;
  name: string;
  type: 'temperature' | 'humidity' | 'soil_moisture' | 'light_intensity' | 'ph_level' | 'camera';
  board_type: 'ESP32 Dev Kit' | 'ESP32-CAM' | 'ESP32-CAM Wrover' | 'Other';
  unit: string;
  location?: string;
  api_endpoint?: string;
  status: 'active' | 'inactive' | 'error';
  last_value: number | string | null; // Changed to allow string for image URLs or status text
  last_updated: Date | null;
}

export interface IotLog {
  id: number;
  device_id: number;
  value: number | string; // Changed to allow string
  recorded_at: Date;
}

export interface SmartFarmStats {
  total_devices: number;
  active_devices: number;
  alerts: number;
  last_sync: Date;
}
