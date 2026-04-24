
'use client';

import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Waves, Mountain, Activity, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

// Generate dummy history data
const generateHistory = (points: number, baseValue: number, variance: number) => {
  const data = [];
  const now = new Date();
  for (let i = points; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60000); // every minute
    data.push({
      time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      value: baseValue + (Math.random() * variance * 2 - variance)
    });
  }
  return data;
};

export default function MonitorPage() {
  const [floodData, setFloodData] = useState(generateHistory(20, 120, 10));
  const [seismicData, setSeismicData] = useState(generateHistory(20, 0.2, 0.1));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setFloodData(prev => {
        const newData = [...prev.slice(1)];
        const lastVal = prev[prev.length - 1].value;
        const nextVal = 120 + (Math.random() * 20 - 10); // Random fluctuation around 120cm
        newData.push({
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          value: nextVal
        });
        return newData;
      });

      setSeismicData(prev => {
        const newData = [...prev.slice(1)];
        const nextVal = Math.max(0, Math.random() * 0.5); // Random vibration 0-0.5g
        newData.push({
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          value: nextVal
        });
        return newData;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <div className="bg-slate-950 min-h-screen font-sans text-slate-200">
      <Header />
      
      <div className="container mx-auto px-6 py-12">
        <div className="mb-10 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold mb-2">Sensor Monitor Dashboard</h1>
            <p className="text-slate-400">Real-time telemetry from installed field sensors.</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-green-900/20 border border-green-500/30 rounded-lg text-green-400 text-sm font-bold animate-pulse">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            LIVE DATA STREAM
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          
          {/* Flood Sensor Chart */}
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-500/10 rounded-lg">
                  <Waves className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Water Level</h2>
                  <p className="text-xs text-slate-400">Ultrasonic Sensor (HC-SR04)</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white font-mono">{floodData[floodData.length-1].value.toFixed(1)} cm</div>
                <div className="text-xs text-green-400 flex items-center justify-end gap-1">
                  <ArrowUpRight className="w-3 h-3" /> Normal
                </div>
              </div>
            </div>
            
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={floodData}>
                  <defs>
                    <linearGradient id="colorFlood" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="time" stroke="#64748b" fontSize={12} tickMargin={10} />
                  <YAxis stroke="#64748b" fontSize={12} domain={[0, 200]} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }}
                    itemStyle={{ color: '#3b82f6' }}
                  />
                  <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorFlood)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Seismic Sensor Chart */}
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-red-500/10 rounded-lg">
                  <Activity className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Seismic Vibration</h2>
                  <p className="text-xs text-slate-400">Vibration Sensor (SW-420)</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white font-mono">{seismicData[seismicData.length-1].value.toFixed(3)} g</div>
                <div className="text-xs text-green-400 flex items-center justify-end gap-1">
                  <ArrowDownRight className="w-3 h-3" /> Stable
                </div>
              </div>
            </div>
            
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={seismicData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="time" stroke="#64748b" fontSize={12} tickMargin={10} />
                  <YAxis stroke="#64748b" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }}
                    itemStyle={{ color: '#ef4444' }}
                  />
                  <Line type="monotone" dataKey="value" stroke="#ef4444" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* Landslide Status Grid (Simulated) */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-lg">
           <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-orange-500/10 rounded-lg">
                <Mountain className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Landslide Monitor</h2>
                <p className="text-xs text-slate-400">Multi-point Gyroscope & Extensometer</p>
              </div>
           </div>
           
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((id) => (
                <div key={id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center justify-center text-center">
                   <div className="text-xs text-slate-500 mb-2">Sensor Node #{id}</div>
                   <div className="w-12 h-12 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center mb-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
                   </div>
                   <div className="text-sm font-bold text-green-400">STABLE</div>
                   <div className="text-xs text-slate-600 mt-1">Tilt: 0.0{id}°</div>
                </div>
              ))}
           </div>
        </div>

      </div>

      <Footer />
    </div>
  );
}
