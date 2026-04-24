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
  Filler,
  ScriptableContext
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

type VisitorChartProps = {
  colors?: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textMuted: string;
    border: string;
  };
};

export default function VisitorChart({ colors }: VisitorChartProps) {
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    // Generate Dummy Data (matching PHP logic)
    const labels = [];
    const visitors = [];
    const pageviews = [];

    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      labels.push(dateStr);

      const base = 100 + Math.floor(Math.random() * 50);
      const dayOfWeek = d.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      const weekendFactor = isWeekend ? 0.7 : 1.0;
      
      const v = Math.floor(base * weekendFactor * (1 + (Math.random() * 50 - 20) / 100));
      const pv = Math.floor(v * (1.5 + Math.random() * 1.5)); // 1.5 to 3.0 pageviews per visitor

      visitors.push(v);
      pageviews.push(pv);
    }

    const primaryColor = colors?.primary || '#3b82f6';
    const secondaryColor = colors?.secondary || '#94a3b8';

    setChartData({
      labels,
      datasets: [
        {
          label: 'Unique Visitors',
          data: visitors,
          borderColor: primaryColor,
          backgroundColor: (context: ScriptableContext<'line'>) => {
            const ctx = context.chart.ctx;
            const gradient = ctx.createLinearGradient(0, 0, 0, 400);
            gradient.addColorStop(0, `${primaryColor}66`); // 0.4 opacity
            gradient.addColorStop(1, `${primaryColor}0D`); // 0.05 opacity
            return gradient;
          },
          borderWidth: 3,
          pointBackgroundColor: '#ffffff',
          pointBorderColor: primaryColor,
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverBackgroundColor: primaryColor,
          pointHoverBorderColor: '#ffffff',
          pointHoverRadius: 6,
          fill: true,
          tension: 0.4
        },
        {
          label: 'Page Views',
          data: pageviews,
          borderColor: secondaryColor,
          backgroundColor: (context: ScriptableContext<'line'>) => {
            const ctx = context.chart.ctx;
            const gradient = ctx.createLinearGradient(0, 0, 0, 400);
            gradient.addColorStop(0, `${secondaryColor}4D`); // 0.3 opacity
            gradient.addColorStop(1, `${secondaryColor}0D`); // 0.05 opacity
            return gradient;
          },
          borderWidth: 2,
          borderDash: [5, 5],
          pointBackgroundColor: '#ffffff',
          pointBorderColor: secondaryColor,
          pointHoverBackgroundColor: secondaryColor,
          pointHoverBorderColor: '#ffffff',
          fill: true,
          tension: 0.4
        }
      ]
    });
  }, [colors]);

  if (!chartData) return <div className="w-full h-full flex items-center justify-center text-slate-400">Loading chart...</div>;

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        align: 'end' as const,
        labels: {
          usePointStyle: true,
          boxWidth: 8,
          font: {
            size: 12,
            family: "'Inter', sans-serif"
          },
          color: colors?.textMuted || '#64748b'
        }
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#1e293b',
        bodyColor: '#475569',
        borderColor: '#e2e8f0',
        borderWidth: 1,
        padding: 12,
        boxPadding: 4,
        usePointStyle: true,
        callbacks: {
          labelColor: function(context: any) {
            return {
              borderColor: context.dataset.borderColor,
              backgroundColor: context.dataset.borderColor,
              borderWidth: 2,
              borderRadius: 2,
            };
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false
        },
        ticks: {
          color: colors?.textMuted || '#94a3b8',
          font: {
            size: 11
          },
          maxTicksLimit: 10
        }
      },
      y: {
        grid: {
          color: colors?.border || '#f1f5f9',
          borderDash: [5, 5],
          drawBorder: false
        },
        ticks: {
          color: colors?.textMuted || '#94a3b8',
          font: {
            size: 11
          },
          padding: 10
        },
        beginAtZero: true
      }
    },
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false
    }
  };

  return <Line options={options} data={chartData} />;
}
