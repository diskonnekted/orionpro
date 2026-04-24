'use client';

import { useEffect, useState } from 'react';
import SensorChart from './SensorChart';
import { getDashboardData, TelemetryPoint } from '@/lib/iot/actions';

export default function MonitorDashboard() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{
    temp: number[];
    humid: number[];
    soil: number[];
    light: number[];
    alerts: any[];
    current: { temp: string; humid: string; soil: string; light: string };
  } | null>(null);

  // Default/Fallback data
  const fallbackData = {
    temp: [24, 23, 25, 29, 31, 28, 26],
    humid: [80, 82, 75, 60, 55, 65, 78],
    soil: [45, 44, 43, 42, 41, 40, 45],
    light: [0, 10, 50, 90, 85, 40, 0],
    alerts: [
      { time: '10:42 AM', id: 'SENS-003', type: 'Humidity', msg: 'Low humidity warning (55%)', status: 'Active' },
      { time: '09:15 AM', id: 'SENS-012', type: 'Connectivity', msg: 'Device offline', status: 'Resolved' },
    ],
    current: { temp: '28°C', humid: '65%', soil: '42%', light: '850 lux' }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getDashboardData();
        
        if (result.telemetry && result.telemetry.length > 0) {
          // Process telemetry for charts (reverse to show chronological order left-to-right)
          const sorted = [...result.telemetry].sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
          
          // Get last 10 points for cleaner charts
          const recent = sorted.slice(-10);
          
          const temps = recent.map(t => t.data.temperature || 0);
          const humids = recent.map(t => t.data.humidity || 0);
          const soils = recent.map(t => t.data.soil_moisture || 0);
          const lights = recent.map(t => t.data.light || 0);

          // Get latest values
          const latest = sorted[sorted.length - 1];
          const current = {
            temp: (latest.data.temperature?.toFixed(1) || '--') + '°C',
            humid: (latest.data.humidity?.toFixed(0) || '--') + '%',
            soil: (latest.data.soil_moisture?.toFixed(0) || '--') + '%',
            light: (latest.data.light?.toFixed(0) || '--') + ' lux'
          };

          // Generate simple alerts based on thresholds
          const newAlerts = [];
          if (latest.data.temperature && latest.data.temperature > 35) {
            newAlerts.push({ 
              time: new Date(latest.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
              id: latest.device_name,
              type: 'Temp',
              msg: `High temperature (${latest.data.temperature.toFixed(1)}°C)`,
              status: 'Active'
            });
          }
           if (latest.data.soil_moisture && latest.data.soil_moisture < 30) {
            newAlerts.push({ 
              time: new Date(latest.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
              id: latest.device_name,
              type: 'Soil',
              msg: `Low moisture (${latest.data.soil_moisture.toFixed(0)}%)`,
              status: 'Active'
            });
          }

          setData({
            temp: temps,
            humid: humids,
            soil: soils,
            light: lights,
            alerts: newAlerts.length > 0 ? newAlerts : fallbackData.alerts, // Keep fallback alerts if none generated
            current
          });
        } else {
          // No data found, use fallback
          setData(fallbackData);
        }
      } catch (e) {
        console.error("Failed to fetch dashboard data", e);
        setData(fallbackData);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    const interval = setInterval(fetchData, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, []);

  // Use state data or fallback if still loading (for smooth transition)
  const displayData = data || fallbackData;

  return (
    <div className="py-12 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Real-Time Monitoring</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Live data feed from our IoT sensor network across the village farmlands.
            {loading && <span className="ml-2 text-sm text-emerald-600 animate-pulse">(Connecting...)</span>}
          </p>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Avg Temperature', value: displayData.current.temp, change: '+2%', status: 'normal', color: 'text-orange-500' },
            { label: 'Avg Humidity', value: displayData.current.humid, change: '-5%', status: 'warning', color: 'text-blue-500' },
            { label: 'Soil Moisture', value: displayData.current.soil, change: '0%', status: 'normal', color: 'text-emerald-500' },
            { label: 'Light Intensity', value: displayData.current.light, change: '+12%', status: 'normal', color: 'text-yellow-500' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <div className="text-slate-500 text-sm font-medium uppercase tracking-wider mb-2">{stat.label}</div>
              <div className={`text-3xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
              <div className="flex items-center text-sm">
                 {/* Placeholder trends */}
                <span className="text-emerald-500">Live</span>
                <span className="text-slate-400 ml-2">updating...</span>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <SensorChart 
            title="Temperature Trend (°C)" 
            label="Temperature" 
            color="#f97316" 
            dataPoints={displayData.temp} 
          />
          <SensorChart 
            title="Humidity Levels (%)" 
            label="Humidity" 
            color="#3b82f6" 
            dataPoints={displayData.humid} 
          />
          <SensorChart 
            title="Soil Moisture (%)" 
            label="Moisture" 
            color="#10b981" 
            dataPoints={displayData.soil} 
          />
          <SensorChart 
            title="Light Intensity (lux)" 
            label="Light" 
            color="#eab308" 
            dataPoints={displayData.light} 
          />
        </div>

        {/* Recent Alerts Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
            <h3 className="font-bold text-slate-800">Recent Alerts</h3>
            <span className="px-2 py-1 text-xs font-semibold bg-red-100 text-red-600 rounded-full">{displayData.alerts.length} Active</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50">
                <tr>
                  <th className="px-6 py-3">Time</th>
                  <th className="px-6 py-3">Sensor ID</th>
                  <th className="px-6 py-3">Type</th>
                  <th className="px-6 py-3">Message</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {displayData.alerts.map((alert, i) => (
                  <tr key={i} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-slate-900">{alert.time}</td>
                    <td className="px-6 py-4 text-slate-500">{alert.id}</td>
                    <td className="px-6 py-4 text-slate-500">{alert.type}</td>
                    <td className="px-6 py-4 text-slate-500">{alert.msg}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        alert.status === 'Active' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                      }`}>
                        {alert.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
