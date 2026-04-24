
'use client';

import { useState, useEffect } from 'react';
import { Waves, Mountain, Activity, ArrowUp, ArrowDown, AlertTriangle } from 'lucide-react';

// Simulated Sensor Data Hook
function useSensorData() {
  const [data, setData] = useState({
    flood: { level: 120, status: 'SAFE' }, // cm (distance to water surface)
    landslide: { gyroX: 0, gyroY: 0, displacement: 0, status: 'STABLE' },
    earthquake: { vibration: 0.0, magnitude: 0, status: 'NORMAL' }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        // Simulate Flood (Ultrasonic)
        // Fluctuate around 120cm
        const newFloodLevel = 120 + Math.random() * 10 - 5;
        
        // Simulate Landslide (Gyro/Rotary)
        // Occasional spikes
        const newGyroX = Math.random() * 2 - 1;
        const newGyroY = Math.random() * 2 - 1;
        const newDisp = prev.landslide.displacement + (Math.random() > 0.95 ? 0.1 : 0);

        // Simulate Earthquake (Vibration)
        // Mostly quiet, random spikes
        const newVibration = Math.random() > 0.9 ? Math.random() * 0.5 : 0.02;

        return {
          flood: { 
            level: newFloodLevel, 
            status: newFloodLevel < 50 ? 'DANGER' : newFloodLevel < 80 ? 'WARNING' : 'SAFE' 
          },
          landslide: { 
            gyroX: newGyroX, 
            gyroY: newGyroY, 
            displacement: newDisp, 
            status: newDisp > 10 ? 'WARNING' : 'STABLE' 
          },
          earthquake: { 
            vibration: newVibration, 
            magnitude: newVibration * 2, // Dummy conversion
            status: newVibration > 2.0 ? 'DANGER' : newVibration > 0.5 ? 'WARNING' : 'NORMAL' 
          }
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return data;
}

export default function Monitor() {
  const sensors = useSensorData();

  return (
    <section id="monitor" className="py-12 bg-slate-950 text-slate-200">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <Activity className="w-6 h-6 text-blue-500" />
            Real-time Sensor Telemetry
          </h2>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Updating Live
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Flood Detection Card */}
          <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 shadow-lg relative overflow-hidden group hover:border-blue-500/50 transition">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition">
              <Waves className="w-24 h-24 text-blue-500" />
            </div>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold text-blue-400">Flood Detection</h3>
                <span className={`px-2 py-1 rounded text-xs font-bold ${sensors.flood.status === 'SAFE' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                  {sensors.flood.status}
                </span>
              </div>
              
              <div className="mb-6">
                <div className="text-sm text-slate-500 mb-1">Ultrasonic Sensor (Distance)</div>
                <div className="text-4xl font-mono font-bold text-white flex items-baseline gap-2">
                  {sensors.flood.level.toFixed(1)} <span className="text-sm text-slate-500">cm</span>
                </div>
              </div>

              <div className="w-full bg-slate-800 rounded-full h-2 mb-2">
                <div className="bg-blue-500 h-2 rounded-full transition-all duration-500" style={{ width: `${Math.min(100, (200 - sensors.flood.level) / 2)}%` }}></div>
              </div>
              <p className="text-xs text-slate-500">Lower distance = Higher water level</p>
            </div>
          </div>

          {/* Landslide Detection Card */}
          <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 shadow-lg relative overflow-hidden group hover:border-orange-500/50 transition">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition">
              <Mountain className="w-24 h-24 text-orange-500" />
            </div>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold text-orange-400">Landslide Monitor</h3>
                <span className={`px-2 py-1 rounded text-xs font-bold ${sensors.landslide.status === 'STABLE' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                  {sensors.landslide.status}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <div className="text-xs text-slate-500 mb-1">Gyro (Tilt)</div>
                  <div className="text-xl font-mono font-bold text-white">
                    {sensors.landslide.gyroX.toFixed(2)}°
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 mb-1">Displacement</div>
                  <div className="text-xl font-mono font-bold text-white">
                    {sensors.landslide.displacement.toFixed(1)} <span className="text-xs">mm</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 text-xs text-slate-500">
                <div className="flex items-center gap-1"><ArrowUp className="w-3 h-3" /> Rotary Encoder</div>
                <div className="flex items-center gap-1"><Activity className="w-3 h-3" /> MPU6050</div>
              </div>
            </div>
          </div>

          {/* Earthquake Detection Card */}
          <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 shadow-lg relative overflow-hidden group hover:border-red-500/50 transition">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition">
              <Activity className="w-24 h-24 text-red-500" />
            </div>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold text-red-400">Seismic Activity</h3>
                <span className={`px-2 py-1 rounded text-xs font-bold ${sensors.earthquake.status === 'NORMAL' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                  {sensors.earthquake.status}
                </span>
              </div>
              
              <div className="mb-6">
                <div className="text-sm text-slate-500 mb-1">Vibration Sensor</div>
                <div className="text-4xl font-mono font-bold text-white flex items-baseline gap-2">
                  {sensors.earthquake.vibration.toFixed(3)} <span className="text-sm text-slate-500">g</span>
                </div>
                <div className="text-xs text-red-400 mt-1 font-mono">
                  Est. Magnitude: {sensors.earthquake.magnitude.toFixed(1)} SR
                </div>
              </div>

              {/* Visualization Bar */}
              <div className="flex items-end h-12 gap-1">
                 {[...Array(20)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`flex-1 rounded-t-sm transition-all duration-100 ${i/20 < sensors.earthquake.vibration * 2 ? 'bg-red-500' : 'bg-slate-800'}`}
                      style={{ height: `${20 + ((i * 37) % 80)}%` }}
                    ></div>
                 ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
