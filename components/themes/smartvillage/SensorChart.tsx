'use client';

import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend, 
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useEffect, useState } from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function SensorChart({ title, color, dataPoints, label }: { title: string, color: string, dataPoints: number[], label: string }) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          color: '#f1f5f9',
        },
        beginAtZero: true,
      },
    },
    elements: {
      line: {
        tension: 0.4,
      },
    },
  };

  const labels = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'];

  const data = {
    labels,
    datasets: [
      {
        label: label,
        data: dataPoints,
        borderColor: color,
        backgroundColor: color + '20', // Add transparency for fill
        fill: true,
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
      <h3 className="text-lg font-bold text-slate-800 mb-4">{title}</h3>
      <Line options={options} data={data} />
    </div>
  );
}
