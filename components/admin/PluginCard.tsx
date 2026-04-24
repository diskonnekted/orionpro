'use client';

import { Plugin, togglePluginStatus } from '@/lib/plugins/manager';
import Link from 'next/link';
import { useState, useTransition } from 'react';
import { 
  Sprout, 
  Sparkles, 
  FileInput, 
  FileText, 
  ShoppingBag, 
  Box,
  LucideIcon,
  Settings,
  Activity,
  Power
} from 'lucide-react';

interface PluginCardProps {
  plugin: Plugin;
}

interface PluginTheme {
  icon: LucideIcon;
  color: string;
  bgGradient: string;
  textColor: string;
  borderColor: string;
}

const getPluginTheme = (slug: string): PluginTheme => {
  const themes: Record<string, PluginTheme> = {
    'smartfarm': {
      icon: Sprout,
      color: 'text-emerald-600',
      bgGradient: 'from-emerald-50 to-emerald-100/50',
      textColor: 'text-emerald-900',
      borderColor: 'border-emerald-200'
    },
    'hello-orion': {
      icon: Sparkles,
      color: 'text-amber-500',
      bgGradient: 'from-amber-50 to-amber-100/50',
      textColor: 'text-amber-900',
      borderColor: 'border-amber-200'
    },
    'orion-form': {
      icon: FileInput,
      color: 'text-blue-600',
      bgGradient: 'from-blue-50 to-blue-100/50',
      textColor: 'text-blue-900',
      borderColor: 'border-blue-200'
    },
    'orion-pdf-reader': {
      icon: FileText,
      color: 'text-rose-600',
      bgGradient: 'from-rose-50 to-rose-100/50',
      textColor: 'text-rose-900',
      borderColor: 'border-rose-200'
    },
    'orion-shop-manager': {
      icon: ShoppingBag,
      color: 'text-orange-600',
      bgGradient: 'from-orange-50 to-orange-100/50',
      textColor: 'text-orange-900',
      borderColor: 'border-orange-200'
    }
  };

  return themes[slug] || {
    icon: Box,
    color: 'text-slate-600',
    bgGradient: 'from-slate-50 to-slate-100/50',
    textColor: 'text-slate-900',
    borderColor: 'border-slate-200'
  };
};

export default function PluginCard({ plugin }: PluginCardProps) {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState(plugin.status);

  const handleToggle = async () => {
    startTransition(async () => {
      try {
        const result = await togglePluginStatus(plugin.slug, status);
        if (result.success) {
          setStatus(result.status as 'active' | 'inactive');
        }
      } catch (error) {
        console.error('Failed to toggle plugin status:', error);
      }
    });
  };

  const isActive = status === 'active';
  const theme = getPluginTheme(plugin.slug);
  const Icon = theme.icon;

  return (
    <div className={`relative group rounded-3xl overflow-hidden transition-all duration-300 flex flex-col h-full border ${
      isActive 
        ? `bg-white ${theme.borderColor} shadow-lg hover:shadow-xl hover:-translate-y-1` 
        : 'bg-slate-50 border-slate-200 opacity-90 hover:opacity-100 hover:shadow-md hover:-translate-y-1'
    }`}>
      
      {/* Background Icon (Watermark) */}
      <div className={`absolute -right-8 -bottom-8 opacity-5 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12 ${
        isActive ? theme.color : 'text-slate-400'
      }`}>
        <Icon size={240} strokeWidth={1.5} />
      </div>

      {/* Top Gradient Accent */}
      {isActive && (
        <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${theme.bgGradient.replace('from-', 'from-').replace('to-', 'to-').split(' ')[0]} to-transparent opacity-75`}></div>
      )}

      <div className="relative p-7 flex-1 flex flex-col z-10">
        <div className="flex items-start justify-between mb-6">
          {/* Icon Badge */}
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm transition-all duration-300 group-hover:scale-105 ${
            isActive ? `bg-white ${theme.color}` : 'bg-slate-200 text-slate-500'
          }`}>
             <Icon size={32} strokeWidth={2} />
          </div>

          {/* Status Pill */}
          <div className={`px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wider uppercase border flex items-center gap-1.5 shadow-sm ${
            isActive 
              ? 'bg-white/80 backdrop-blur-sm text-green-700 border-green-200' 
              : 'bg-slate-200/80 text-slate-500 border-slate-300'
          }`}>
            <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-500 animate-pulse' : 'bg-slate-400'}`}></span>
            {isActive ? 'Active' : 'Inactive'}
          </div>
        </div>

        {/* Content */}
        <div className="mb-4">
          <h3 className={`text-xl font-bold mb-2 tracking-tight ${isActive ? theme.textColor : 'text-slate-700'}`}>
            {plugin.name}
          </h3>
          <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 font-medium">
            {plugin.description}
          </p>
        </div>

        {/* Meta Info */}
        <div className="mt-auto flex items-center gap-3 text-xs font-semibold text-slate-400">
           <span className="bg-slate-100/80 px-2.5 py-1 rounded-md">v{plugin.version}</span>
           <span>by <span className="text-slate-500">{plugin.author}</span></span>
        </div>
      </div>

      {/* Action Footer */}
      <div className={`relative px-7 py-5 border-t backdrop-blur-sm z-10 flex items-center justify-between gap-4 ${
        isActive ? 'bg-white/50 border-slate-100' : 'bg-slate-100/50 border-slate-200'
      }`}>
        {isActive && plugin.link ? (
           <Link 
             href={plugin.link}
             className={`text-sm font-bold hover:underline flex items-center gap-1.5 group/link transition-colors ${theme.color}`}
           >
             <Settings size={16} />
             Settings
           </Link>
        ) : (
          <span className="text-sm text-slate-400 italic font-medium flex items-center gap-1.5">
            <Settings size={16} className="opacity-50" />
            No settings
          </span>
        )}

        <button
          onClick={handleToggle}
          disabled={isPending}
          className={`px-5 py-2.5 text-xs font-bold rounded-xl transition-all shadow-sm hover:shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 ${
            isActive
              ? 'bg-white text-rose-500 border border-rose-100 hover:bg-rose-50 hover:border-rose-200'
              : `bg-slate-800 text-white border border-transparent hover:bg-slate-900`
          }`}
        >
          {isPending ? (
            <>
              <Activity size={14} className="animate-spin" />
              Processing
            </>
          ) : (
            isActive ? (
              <>
                <Power size={14} />
                Deactivate
              </>
            ) : (
              <>
                <Power size={14} />
                Activate
              </>
            )
          )}
        </button>
      </div>
    </div>
  );
}
