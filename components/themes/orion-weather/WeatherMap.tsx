'use client';

import { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
import { CloudRain, CloudLightning, Sun, Cloud, AlertTriangle, Thermometer, Wind, Droplets, Search, MapPin, Navigation, Clock } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

// Initialize Highcharts Map module safely
if (typeof window !== 'undefined') {
  try {
    const highchartsMap = require('highcharts/modules/map');
    if (highchartsMap && typeof highchartsMap === 'function') {
      highchartsMap(Highcharts);
    } else if (highchartsMap && highchartsMap.default && typeof highchartsMap.default === 'function') {
      highchartsMap.default(Highcharts);
    }
  } catch (e) {
    console.error('Failed to load Highcharts map module', e);
  }
}

const WEATHER_CODES: Record<string, { label: string; icon: any; color: string }> = {
  '0': { label: 'Cerah', icon: Sun, color: '#fbbf24' },
  '1': { label: 'Cerah Berawan', icon: Cloud, color: '#fcd34d' },
  '2': { label: 'Cerah Berawan', icon: Cloud, color: '#fcd34d' },
  '3': { label: 'Berawan', icon: Cloud, color: '#94a3b8' },
  '4': { label: 'Berawan Tebal', icon: Cloud, color: '#64748b' },
  '5': { label: 'Udara Kabur', icon: Cloud, color: '#cbd5e1' },
  '10': { label: 'Asap', icon: Cloud, color: '#94a3b8' },
  '45': { label: 'Kabut', icon: Cloud, color: '#cbd5e1' },
  '60': { label: 'Hujan Ringan', icon: CloudRain, color: '#60a5fa' },
  '61': { label: 'Hujan Sedang', icon: CloudRain, color: '#3b82f6' },
  '63': { label: 'Hujan Lebat', icon: CloudRain, color: '#2563eb' },
  '80': { label: 'Hujan Lokal', icon: CloudRain, color: '#60a5fa' },
  '95': { label: 'Hujan Petir', icon: CloudLightning, color: '#f59e0b' },
  '97': { label: 'Hujan Petir', icon: CloudLightning, color: '#f59e0b' },
};

export default function WeatherMap() {
  const [mapOptions, setMapOptions] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [extremeWeather, setExtremeWeather] = useState<any[]>([]);

  // Detailed Forecast States
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [detailedForecast, setDetailedForecast] = useState<any>(null);
  const [loadingDetailed, setLoadingDetailed] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.length < 3) return;
    
    setSearching(true);
    try {
      // Use emsifa API for location search (Province level first, but let's try a direct search if possible)
      // Since emsifa is static, searching is hard. Let's use a mock list or a specific common location first.
      // Actually, let's use the BMKG location search if it exists.
      // Based on search results, we can try to find the adm4.
      
      // For now, let's provide a few default locations if the search matches
      const defaults = [
        { name: 'Gambir, Jakarta Pusat', adm4: '31.71.01.1001' },
        { name: 'Cilandak, Jakarta Selatan', adm4: '31.74.06.1001' },
        { name: 'Bandung, Jawa Barat', adm4: '32.73.01.1001' },
        { name: 'Surabaya, Jawa Timur', adm4: '35.78.01.1001' },
        { name: 'Medan, Sumatera Utara', adm4: '12.71.01.1001' },
        { name: 'Makassar, Sulawesi Selatan', adm4: '73.71.01.1001' }
      ];
      
      const filtered = defaults.filter(d => d.name.toLowerCase().includes(searchQuery.toLowerCase()));
      setSearchResults(filtered);
    } catch (err) {
      console.error(err);
    } finally {
      setSearching(false);
    }
  };

  const fetchDetailedForecast = async (location: any) => {
    setLoadingDetailed(true);
    setSelectedLocation(location);
    try {
      const res = await axios.get(`https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=${location.adm4}`);
      setDetailedForecast(res.data);
    } catch (err) {
      console.error('Failed to fetch detailed forecast', err);
    } finally {
      setLoadingDetailed(false);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      let topology;
      try {
        const topologyRes = await axios.get('/assets/data/id-all.topo.json', { timeout: 5000 });
        topology = topologyRes.data;
      } catch (localErr) {
        const topologyRes = await axios.get('https://code.highcharts.com/mapdata/countries/id/id-all.topo.json', { timeout: 15000 });
        topology = topologyRes.data;
      }

      const weatherRes = await axios.get('https://data.bmkg.go.id/DataMKG/MEWS/DigitalForecast/DigitalForecast-Indonesia.xml', { timeout: 15000 });
      const rawData = weatherRes.data;
      if (typeof rawData === 'string' && (rawData.trim().startsWith('<html') || rawData.includes('<body'))) {
        throw new Error('Server data BMKG sedang mengalami gangguan.');
      }

      const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "@_", parseAttributeValue: true, parseTagValue: true, trimValues: true });
      const jsonObj = parser.parse(rawData);
      const forecastData = jsonObj?.data || jsonObj?.forecast || jsonObj?.DigitalForecast;
      
      if (!forecastData || !forecastData.forecast) {
        throw new Error('Format data BMKG tidak dikenali.');
      }
      
      const areasRaw = forecastData.forecast.area;
      const areas = Array.isArray(areasRaw) ? areasRaw : (areasRaw ? [areasRaw] : []);
      const weatherPoints: any[] = [];
      const alerts: any[] = [];

      areas.forEach((area: any) => {
        const lat = parseFloat(area['@_latitude'] || area.latitude || 0);
        const lon = parseFloat(area['@_longitude'] || area.longitude || 0);
        const name = area['@_description'] || area.description || area.name || 'Unknown';
        const parameters = Array.isArray(area.parameter) ? area.parameter : (area.parameter ? [area.parameter] : []);
        
        const weatherParam = parameters.find((p: any) => p['@_id'] === 'weather' || p.id === 'weather');
        if (!weatherParam) return;

        const timeranges = Array.isArray(weatherParam.timerange) ? weatherParam.timerange : (weatherParam.timerange ? [weatherParam.timerange] : []);
        if (timeranges.length === 0) return;

        const currentForecast = timeranges[0];
        const values = Array.isArray(currentForecast.value) ? currentForecast.value : (currentForecast.value ? [currentForecast.value] : []);
        const weatherValue = values[0];
        const weatherCode = typeof weatherValue === 'object' ? (weatherValue['#text'] || weatherValue.value || '') : weatherValue.toString();

        if (['63', '95', '97'].includes(weatherCode)) {
          alerts.push({ city: name, code: weatherCode, desc: WEATHER_CODES[weatherCode]?.label || 'Cuaca Ekstrem', lat, lon });
        }

        weatherPoints.push({
          name: name, lat: lat, lon: lon, weatherCode: weatherCode,
          color: WEATHER_CODES[weatherCode]?.color || '#94a3b8',
          desc: WEATHER_CODES[weatherCode]?.label || 'Unknown'
        });
      });

      setExtremeWeather(alerts);
      setMapOptions({
        chart: { map: topology, backgroundColor: 'transparent' },
        title: { text: '' },
        mapNavigation: { enabled: true, buttonOptions: { verticalAlign: 'bottom' } },
        tooltip: { pointFormat: '{point.name}: <b>{point.desc}</b>' },
        series: [
          { name: 'Basemap', borderColor: '#1e293b', nullColor: '#0f172a', showInLegend: false },
          {
            type: 'mappoint', name: 'Cuaca Kota', color: '#3b82f6', data: weatherPoints,
            marker: { radius: 4, symbol: 'circle' },
            tooltip: { headerFormat: '', pointFormat: '<b>{point.name}</b><br>{point.desc}' }
          }
        ]
      });
      setLoading(false);
    } catch (err: any) {
      setError(err.message || 'Gagal memuat data.');
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  return (
    <section className="py-12 bg-slate-900/50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <div className="bg-slate-950 rounded-3xl border border-slate-800 p-6 shadow-2xl h-[600px] relative overflow-hidden">
              {loading ? (
                <div className="flex flex-col items-center justify-center h-full gap-4">
                  <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-slate-400">Menghubungkan ke BMKG...</p>
                </div>
              ) : error ? (
                <div className="flex flex-col items-center justify-center h-full text-center p-6">
                  <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Gagal Memuat Peta</h3>
                  <p className="text-slate-400 mb-6">{error}</p>
                  <button onClick={fetchData} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition">Coba Lagi</button>
                </div>
              ) : (
                <HighchartsReact highcharts={Highcharts} constructorType={'mapChart'} options={mapOptions} />
              )}
            </div>
          </div>
          
          <div className="lg:w-1/3 flex flex-col gap-6">
            <div className="bg-slate-950 rounded-3xl border border-slate-800 p-6 shadow-xl flex-1">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-500" />
                Peringatan Cuaca
              </h3>
              <div className="space-y-4 max-h-[450px] overflow-y-auto pr-2 custom-scrollbar">
                {extremeWeather.length > 0 ? (
                  extremeWeather.map((alert, i) => (
                    <div key={i} className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl">
                      <p className="text-red-400 font-bold text-sm">{alert.city}</p>
                      <p className="text-slate-300 text-xs">{alert.desc}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Sun className="w-12 h-12 text-slate-700 mx-auto mb-3" />
                    <p className="text-slate-500 text-sm">Tidak ada peringatan cuaca ekstrem saat ini.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Forecast Section */}
        <div className="mt-12 bg-slate-950 rounded-[2.5rem] border border-slate-800 p-8 shadow-2xl overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[100px] rounded-full"></div>
          
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
              <div className="max-w-xl">
                <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-2">
                  <span className="text-blue-500">Detail</span> Lokasi
                </h2>
                <p className="text-slate-500 text-sm font-medium">Prakiraan cuaca 3 harian dengan resolusi tinggi (setiap 3 jam) langsung dari satelit BMKG.</p>
              </div>
              <form onSubmit={handleSearch} className="flex-1 w-full md:max-w-md relative">
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari Kota (Contoh: Gambir, Bandung...)" 
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-12 py-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-600 font-bold"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 px-4 py-2 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-blue-700 transition">Cari</button>
              </form>
            </div>

            {searchResults.length > 0 && !selectedLocation && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
                {searchResults.map((res, i) => (
                  <button 
                    key={i} 
                    onClick={() => fetchDetailedForecast(res)}
                    className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex items-center gap-4 hover:border-blue-500/50 transition group text-left"
                  >
                    <div className="w-10 h-10 bg-blue-600/10 rounded-xl flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white uppercase tracking-tight">{res.name}</div>
                      <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">ID: {res.adm4}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {loadingDetailed ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-slate-400 font-mono text-xs uppercase tracking-widest">Mengunduh data resolusi tinggi...</p>
              </div>
            ) : detailedForecast ? (
              <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                {/* Current Info Header */}
                <div className="flex flex-wrap items-center justify-between gap-8 p-8 bg-slate-900/50 border border-white/5 rounded-[2rem]">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-blue-600 rounded-[2rem] flex items-center justify-center text-white shadow-2xl shadow-blue-600/20">
                      <Navigation className="w-10 h-10" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter leading-none mb-2">{detailedForecast.lokasi.desa}</h3>
                      <p className="text-sm font-mono text-slate-500 uppercase tracking-widest">{detailedForecast.lokasi.kecamatan}, {detailedForecast.lokasi.kotkab}, {detailedForecast.lokasi.provinsi}</p>
                    </div>
                  </div>
                  <div className="flex gap-12 text-center">
                    <div>
                      <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">Koordinat</div>
                      <div className="text-sm font-bold text-white">{detailedForecast.lokasi.lat}, {detailedForecast.lokasi.lon}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">Timezone</div>
                      <div className="text-sm font-bold text-white">{detailedForecast.lokasi.timezone}</div>
                    </div>
                  </div>
                </div>

                {/* Forecast Timeline (3-hourly) */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <Clock className="w-5 h-5 text-blue-500" />
                    <h4 className="text-lg font-bold text-white uppercase tracking-tighter">Timeline 3 Harian</h4>
                  </div>
                  <div className="overflow-x-auto pb-6 custom-scrollbar">
                    <div className="flex gap-4 min-w-max">
                      {detailedForecast.data[0].cuaca.map((day: any, dayIdx: number) => (
                        <div key={dayIdx} className="flex gap-4">
                          {day.map((forecast: any, i: number) => (
                            <div key={i} className="w-44 bg-slate-900 border border-white/5 p-6 rounded-3xl flex flex-col items-center text-center hover:border-blue-500/30 transition-all group">
                              <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-4">
                                {new Date(forecast.local_datetime).toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short' })}
                                <br />
                                {new Date(forecast.local_datetime).getHours()}:00
                              </div>
                              <img src={forecast.image} alt={forecast.weather_desc} className="w-12 h-12 mb-4 group-hover:scale-110 transition-transform" />
                              <div className="text-2xl font-black text-white mb-1 tracking-tighter">{forecast.t}°C</div>
                              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 h-8 flex items-center justify-center leading-tight">{forecast.weather_desc}</div>
                              <div className="w-full grid grid-cols-2 gap-2 pt-4 border-t border-white/5">
                                <div className="flex flex-col items-center">
                                  <Droplets className="w-3 h-3 text-blue-500 mb-1" />
                                  <span className="text-[8px] font-bold text-white">{forecast.hu}%</span>
                                </div>
                                <div className="flex flex-col items-center">
                                  <Wind className="w-3 h-3 text-emerald-500 mb-1" />
                                  <span className="text-[8px] font-bold text-white">{forecast.ws}kph</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-20">
                <Navigation className="w-16 h-16 text-slate-800 mx-auto mb-6 opacity-20" />
                <p className="text-slate-500 font-medium">Gunakan kotak pencarian di atas untuk mendapatkan data spesifik kelurahan.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
