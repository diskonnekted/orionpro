'use client';

import { IotDevice } from '@/lib/plugins/smartfarm/types';

interface DeviceCardProps {
  device: IotDevice;
  onClick?: () => void;
}

export default function DeviceCard({ device, onClick }: DeviceCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive': return 'bg-slate-100 text-slate-800 border-slate-200';
      case 'error': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'temperature': return '🌡️';
      case 'humidity': return '💧';
      case 'soil_moisture': return '🌱';
      case 'light_intensity': return '☀️';
      case 'ph_level': return '🧪';
      case 'camera': return '📷';
      default: return '📡';
    }
  };

  return (
    <div 
      onClick={onClick}
      className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col justify-between"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl bg-slate-50 p-2 rounded-lg">{getIcon(device.type)}</span>
          <div>
            <h3 className="font-semibold text-slate-800">{device.name}</h3>
            <p className="text-xs text-slate-500 uppercase tracking-wider">{device.type.replace('_', ' ')}</p>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(device.status)}`}>
          {device.status}
        </span>
      </div>
      
      <div className="mt-2">
        {device.type === 'camera' ? (
           <div className="relative aspect-video bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
             {device.last_value ? (
               <img src={device.last_value as string} alt="Camera Feed" className="w-full h-full object-cover" />
             ) : (
               <div className="flex items-center justify-center h-full text-slate-400 text-xs">No Signal</div>
             )}
             <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-black/50 text-white text-[10px] rounded backdrop-blur-sm">LIVE</div>
           </div>
        ) : (
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-slate-900">
              {device.last_value !== null ? device.last_value : '--'}
            </span>
            <span className="text-slate-500 font-medium">{device.unit}</span>
          </div>
        )}
        
        <div className="flex justify-between items-end mt-3 pt-3 border-t border-slate-50">
           <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 font-medium uppercase">Board</span>
              <span className="text-xs text-slate-600">{device.board_type || 'Generic'}</span>
           </div>
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-slate-400 font-medium uppercase">Location</span>
              <span className="text-xs text-slate-600">{device.location || 'Unknown'}</span>
           </div>
        </div>
      </div>
    </div>
  );
}
