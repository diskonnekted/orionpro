
'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { ShieldAlert, Info, MapPin, Calendar, Clock, Activity, Signal } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

interface EarthquakeData {
  Tanggal: string;
  Jam: string;
  DateTime: string;
  Coordinates: string;
  Lintang: string;
  Bujur: string;
  Magnitude: string;
  Kedalaman: string;
  Wilayah: string;
  Potensi: string;
  Dirasakan: string;
  Shakemap: string;
}

interface Alert {
  type: 'earthquake' | 'weather' | 'flood';
  level: 'info' | 'warning' | 'danger';
  title: string;
  description: string;
  time: string;
  location: string;
  magnitude?: string;
  depth?: string;
}

export default function AlertsPage() {
  const [latestQuake, setLatestQuake] = useState<EarthquakeData | null>(null);
  const [recentQuakes, setRecentQuakes] = useState<EarthquakeData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBMKGData = async () => {
      try {
        // Fetch AutoGempa (Latest Major Quake)
        const autoGempaRes = await axios.get('https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json');
        setLatestQuake(autoGempaRes.data.Infogempa.gempa);

        // Fetch Recent Quakes (Gempaterkini)
        const recentGempaRes = await axios.get('https://data.bmkg.go.id/DataMKG/TEWS/gempaterkini.json');
        // Limit to 5 recent quakes
        setRecentQuakes(recentGempaRes.data.Infogempa.gempa.slice(0, 5));
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching BMKG data:', error);
        setLoading(false);
      }
    };

    fetchBMKGData();
  }, []);

  return (
    <div className="bg-slate-950 min-h-screen font-sans text-slate-200">
      <Header />
      
      <div className="container mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-4 flex items-center gap-3">
            <Signal className="w-8 h-8 text-red-500 animate-pulse" />
            Live Alerts & Disaster Feed
          </h1>
          <p className="text-slate-400">
            Real-time data sourced directly from BMKG (Badan Meteorologi, Klimatologi, dan Geofisika).
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Main Alert: Latest Major Earthquake */}
            {latestQuake && (
              <div className="lg:col-span-2">
                <div className="bg-slate-900 rounded-2xl border border-red-500/50 shadow-lg shadow-red-900/20 overflow-hidden relative">
                   <div className="absolute top-0 right-0 p-4">
                      <span className="px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-full animate-pulse">
                        TERKINI
                      </span>
                   </div>
                   
                   <div className="p-8">
                     <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center">
                           <Activity className="w-8 h-8 text-red-500" />
                        </div>
                        <div>
                           <h2 className="text-2xl font-bold text-white">Gempa Bumi Terkini</h2>
                           <p className="text-red-400 font-mono text-sm">{latestQuake.Tanggal}, {latestQuake.Jam}</p>
                        </div>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                           <div className="text-slate-500 text-xs mb-1">Magnitude</div>
                           <div className="text-4xl font-bold text-white">{latestQuake.Magnitude} <span className="text-lg text-slate-500">SR</span></div>
                        </div>
                        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                           <div className="text-slate-500 text-xs mb-1">Kedalaman</div>
                           <div className="text-4xl font-bold text-white">{latestQuake.Kedalaman}</div>
                        </div>
                     </div>

                     <div className="space-y-4">
                        <div className="flex items-start gap-3">
                           <MapPin className="w-5 h-5 text-blue-500 mt-1" />
                           <div>
                              <div className="text-sm text-slate-400">Lokasi</div>
                              <div className="font-medium text-white">{latestQuake.Wilayah}</div>
                              <div className="text-xs text-slate-500 font-mono mt-1">{latestQuake.Lintang} - {latestQuake.Bujur}</div>
                           </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                           <ShieldAlert className="w-5 h-5 text-orange-500 mt-1" />
                           <div>
                              <div className="text-sm text-slate-400">Potensi Tsunami</div>
                              <div className="font-bold text-orange-400">{latestQuake.Potensi}</div>
                           </div>
                        </div>

                        {latestQuake.Dirasakan && (
                          <div className="flex items-start gap-3">
                             <Info className="w-5 h-5 text-green-500 mt-1" />
                             <div>
                                <div className="text-sm text-slate-400">Dirasakan (MMI)</div>
                                <div className="text-sm text-slate-300">{latestQuake.Dirasakan}</div>
                             </div>
                          </div>
                        )}
                     </div>

                     <div className="mt-8 pt-6 border-t border-slate-800">
                        <img 
                          src={`https://data.bmkg.go.id/DataMKG/TEWS/${latestQuake.Shakemap}`} 
                          alt="Shakemap" 
                          className="w-full rounded-lg border border-slate-700"
                        />
                     </div>
                   </div>
                </div>
              </div>
            )}

            {/* Recent Quakes List */}
            <div className="lg:col-span-1">
               <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                 <Clock className="w-5 h-5 text-blue-500" />
                 Gempa Terkini (M ≥ 5.0)
               </h3>
               <div className="space-y-4">
                  {recentQuakes.map((quake, idx) => (
                    <div key={idx} className="bg-slate-900 p-4 rounded-xl border border-slate-800 hover:border-slate-700 transition">
                       <div className="flex justify-between items-start mb-2">
                          <span className={`px-2 py-0.5 rounded text-xs font-bold ${parseFloat(quake.Magnitude) >= 6 ? 'bg-red-500 text-white' : 'bg-orange-500/20 text-orange-400'}`}>
                             M {quake.Magnitude}
                          </span>
                          <span className="text-xs text-slate-500">{quake.Tanggal}</span>
                       </div>
                       <h4 className="font-bold text-sm text-slate-200 mb-1 line-clamp-2">{quake.Wilayah}</h4>
                       <div className="flex items-center gap-2 text-xs text-slate-400">
                          <Clock className="w-3 h-3" /> {quake.Jam}
                          <span className="w-1 h-1 bg-slate-600 rounded-full"></span>
                          <span>{quake.Kedalaman}</span>
                       </div>
                    </div>
                  ))}
               </div>
            </div>

          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
