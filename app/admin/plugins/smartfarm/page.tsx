'use client';

import Dashboard from '@/components/plugins/smartfarm/Dashboard';

export default function SmartFarmPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Smart Farm IoT</h1>
          <p className="text-slate-500">Monitor and manage your IoT devices</p>
        </div>
      </div>
      
      <Dashboard />
    </div>
  );
}
