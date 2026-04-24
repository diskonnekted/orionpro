
'use client';

import { updateDevice } from '../../actions';
import Link from 'next/link';
import { useFormStatus } from 'react-dom';
import { useState } from 'react';
import { Plus, Trash2, Cpu, Settings, Save } from 'lucide-react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button 
      type="submit" 
      disabled={pending}
      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 flex items-center gap-2 font-medium"
    >
      {pending ? (
        <>
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          Saving...
        </>
      ) : (
        <>
          <Save className="w-4 h-4" />
          Save Changes
        </>
      )}
    </button>
  );
}

const THEME_PRESETS: Record<string, any[]> = {
  'general': [],
  'orion-ews-pro': [
    { key: 'ultrasonic_1', label: 'Flood Sensor (Water Level)', unit: 'cm', type: 'number' },
    { key: 'vibration_1', label: 'Quake Sensor (Seismic)', unit: 'm/s²', type: 'number' },
    { key: 'gyro_1', label: 'Landslide Sensor (Tilt)', unit: 'deg', type: 'number' }
  ],
  'smartvillage': [
    { key: 'temp_1', label: 'Temperature', unit: '°C', type: 'number' },
    { key: 'hum_1', label: 'Humidity', unit: '%', type: 'number' },
    { key: 'soil_1', label: 'Soil Moisture', unit: '%', type: 'number' }
  ]
};

export default function EditDeviceForm({ device }: { device: any }) {
  const [selectedTheme, setSelectedTheme] = useState(device.theme || 'general');
  // Parse existing config if string, or use as is if object/array
  const initialSensors = typeof device.config === 'string' 
    ? JSON.parse(device.config || '[]') 
    : (device.config || []);
    
  const [sensors, setSensors] = useState<any[]>(initialSensors);

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const theme = e.target.value;
    setSelectedTheme(theme);
    
    // Optional: Ask user if they want to overwrite sensors? 
    // For now, let's just append if empty, or leave it to user to manually add.
    // If we auto-replace, we risk losing existing config.
    // So let's NOT auto-replace on edit, only on creation.
  };

  const loadPreset = () => {
    if (confirm('This will overwrite current sensors with theme defaults. Continue?')) {
        if (THEME_PRESETS[selectedTheme]) {
            setSensors([...THEME_PRESETS[selectedTheme]]);
        }
    }
  }

  const addSensor = () => {
    setSensors([...sensors, { key: '', label: '', unit: '', type: 'number' }]);
  };

  const removeSensor = (index: number) => {
    const newSensors = [...sensors];
    newSensors.splice(index, 1);
    setSensors(newSensors);
  };

  const updateSensor = (index: number, field: string, value: string) => {
    const newSensors = [...sensors];
    newSensors[index] = { ...newSensors[index], [field]: value };
    setSensors(newSensors);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Edit Device</h1>
          <p className="text-slate-500">Update configuration for <span className="font-mono font-semibold">{device.name}</span></p>
        </div>
        <Link href="/admin/iot" className="text-slate-500 hover:text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-100 transition">
          Cancel
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        <form action={updateDevice} className="space-y-8">
          <input type="hidden" name="id" value={device.id} />
          {/* Hidden Config Field */}
          <input type="hidden" name="config" value={JSON.stringify(sensors)} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column: Basic Info */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2 border-b pb-2">
                <Settings className="w-5 h-5 text-blue-500" />
                Device Information
              </h3>
              
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                  Device Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  defaultValue={device.name}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
              </div>

              <div>
                <label htmlFor="type" className="block text-sm font-medium text-slate-700 mb-1">
                  Hardware Type
                </label>
                <select
                  id="type"
                  name="type"
                  defaultValue={device.type}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                >
                  <option value="esp32">ESP32</option>
                  <option value="esp8266">ESP8266</option>
                  <option value="arduino_wifi">Arduino + WiFi</option>
                  <option value="raspberry_pi">Raspberry Pi</option>
                  <option value="virtual">Virtual Device (Simulation)</option>
                </select>
              </div>

              <div>
                <label htmlFor="theme" className="block text-sm font-medium text-slate-700 mb-1">
                  Project / Theme Association
                </label>
                <select
                  id="theme"
                  name="theme"
                  value={selectedTheme}
                  onChange={handleThemeChange}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                >
                  <option value="general">General / Unassigned</option>
                  <option value="orion-ews-pro">Orion EWS Pro (Disaster Warning)</option>
                  <option value="smartvillage">Smart Village (Agriculture)</option>
                  <option value="smarthome">Orion Smarthome</option>
                </select>
              </div>

              <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                <label className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-2 block">API Token</label>
                <code className="block bg-white p-2 rounded border border-slate-200 text-xs font-mono break-all text-slate-600">
                    {device.token}
                </code>
                <p className="text-[10px] text-slate-400 mt-1">Token cannot be changed manually.</p>
              </div>
            </div>

            {/* Right Column: Sensor Configuration */}
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b pb-2">
                <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-green-500" />
                  Sensor Configuration
                </h3>
                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={loadPreset}
                        className="text-xs text-blue-600 hover:text-blue-800 hover:underline px-2 py-1"
                    >
                        Load Preset
                    </button>
                    <button
                    type="button"
                    onClick={addSensor}
                    className="text-xs flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-1 rounded transition"
                    >
                    <Plus className="w-3 h-3" /> Add Sensor
                    </button>
                </div>
              </div>

              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                {sensors.length === 0 ? (
                  <div className="text-center py-8 bg-slate-50 rounded-lg border border-dashed border-slate-300 text-slate-400 text-sm">
                    No sensors configured.
                  </div>
                ) : (
                  sensors.map((sensor, idx) => (
                    <div key={idx} className="bg-slate-50 p-4 rounded-lg border border-slate-200 relative group">
                      <button
                        type="button"
                        onClick={() => removeSensor(idx)}
                        className="absolute top-2 right-2 text-slate-400 hover:text-red-500 transition opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div>
                          <label className="text-xs text-slate-500 block mb-1">Key (JSON)</label>
                          <input
                            type="text"
                            value={sensor.key}
                            onChange={(e) => updateSensor(idx, 'key', e.target.value)}
                            className="w-full px-2 py-1 text-sm border rounded bg-white font-mono text-slate-600"
                            placeholder="e.g. temp_1"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-slate-500 block mb-1">Label (Display)</label>
                          <input
                            type="text"
                            value={sensor.label}
                            onChange={(e) => updateSensor(idx, 'label', e.target.value)}
                            className="w-full px-2 py-1 text-sm border rounded bg-white"
                            placeholder="Temperature"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs text-slate-500 block mb-1">Unit</label>
                          <input
                            type="text"
                            value={sensor.unit}
                            onChange={(e) => updateSensor(idx, 'unit', e.target.value)}
                            className="w-full px-2 py-1 text-sm border rounded bg-white"
                            placeholder="°C"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-slate-500 block mb-1">Data Type</label>
                          <select
                            value={sensor.type}
                            onChange={(e) => updateSensor(idx, 'type', e.target.value)}
                            className="w-full px-2 py-1 text-sm border rounded bg-white"
                          >
                            <option value="number">Number</option>
                            <option value="string">String</option>
                            <option value="boolean">Boolean</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex justify-end">
            <SubmitButton />
          </div>
        </form>
      </div>
    </div>
  );
}
