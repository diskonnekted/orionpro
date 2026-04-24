'use client';

import { useEffect, useState } from 'react';
import { IotDevice, IotLog } from '@/lib/plugins/smartfarm/types';
import { getDevices, syncDeviceData, getDeviceLogs } from '@/lib/plugins/smartfarm/actions';
import DeviceCard from './DeviceCard';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const [devices, setDevices] = useState<IotDevice[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<IotDevice | null>(null);
  const [logs, setLogs] = useState<IotLog[]>([]);

  useEffect(() => {
    loadDevices();
  }, []);

  useEffect(() => {
    if (selectedDevice) {
      loadLogs(selectedDevice.id);
    }
  }, [selectedDevice]);

  const loadDevices = async () => {
    try {
      const data = await getDevices();
      setDevices(data);
    } catch (error) {
      console.error('Failed to load devices:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadLogs = async (deviceId: number) => {
    try {
      const data = await getDeviceLogs(deviceId);
      setLogs(data.reverse()); // Reverse to show oldest to newest on chart
    } catch (error) {
      console.error('Failed to load logs:', error);
    }
  };

  const handleSync = async () => {
    setSyncing(true);
    try {
      await syncDeviceData();
      await loadDevices();
      if (selectedDevice) {
        await loadLogs(selectedDevice.id);
      }
    } catch (error) {
      console.error('Sync failed:', error);
    } finally {
      setSyncing(false);
    }
  };

  const chartData = {
    labels: logs.map(log => new Date(log.recorded_at).toLocaleTimeString()),
    datasets: [
      {
        label: selectedDevice ? `${selectedDevice.name} (${selectedDevice.unit})` : 'Data',
        data: logs.map(log => log.value),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: selectedDevice ? `History: ${selectedDevice.name}` : 'Select a device',
      },
    },
    scales: {
      y: {
        beginAtZero: false,
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Smart Farm Overview</h2>
          <p className="text-slate-500 text-sm">Real-time monitoring from IoT sensors</p>
        </div>
        <button
          onClick={handleSync}
          disabled={syncing}
          className={`flex items-center gap-2 px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition font-medium shadow-sm disabled:opacity-70 disabled:cursor-not-allowed`}
        >
          {syncing ? (
            <>
              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Syncing...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
              Refresh Data
            </>
          )}
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-600"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {devices.map((device) => (
              <DeviceCard 
                key={device.id} 
                device={device} 
                onClick={() => setSelectedDevice(device)}
              />
            ))}
          </div>

          {selectedDevice && (
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-300">
               <Line options={chartOptions} data={chartData} />
            </div>
          )}
        </>
      )}
    </div>
  );
}
