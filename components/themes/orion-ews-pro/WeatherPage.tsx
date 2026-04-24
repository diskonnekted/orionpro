
'use client';

import { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
import { CloudRain, CloudLightning, Sun, Cloud, AlertTriangle } from 'lucide-react';
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

export default function WeatherPage() {
  const [mapOptions, setMapOptions] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [extremeWeather, setExtremeWeather] = useState<any[]>([]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      // 1. Fetch Indonesia Topology
      // Prefer local copy to avoid network timeouts
      let topology;
      try {
        console.log('DEBUG: Attempting to fetch local topology');
        const topologyRes = await axios.get('/assets/data/id-all.topo.json', {
          timeout: 5000 
        });
        topology = topologyRes.data;
        console.log('DEBUG: Local topology loaded successfully');
      } catch (localErr) {
        console.warn('DEBUG: Local topology failed, trying Highcharts CDN:', localErr);
        try {
          const topologyRes = await axios.get('https://code.highcharts.com/mapdata/countries/id/id-all.topo.json', {
            timeout: 15000
          });
          topology = topologyRes.data;
        } catch (cdnErr) {
          console.error('Failed to fetch topology from all sources:', cdnErr);
          throw new Error('Gagal memuat data peta Indonesia. Periksa koneksi internet Anda.');
        }
      }

      // 2. Fetch BMKG Weather Data (Digital Forecast Indonesia)
      let jsonObj;
      try {
        console.log('DEBUG: Fetching weather data from BMKG...');
        const weatherRes = await axios.get('https://data.bmkg.go.id/DataMKG/MEWS/DigitalForecast/DigitalForecast-Indonesia.xml', {
          timeout: 15000 
        });
        
        const rawData = weatherRes.data;
        
        // Check if response is actually HTML (happens during BMKG server errors/redirects)
        if (typeof rawData === 'string' && (rawData.trim().startsWith('<html') || rawData.includes('<body'))) {
          console.error('DEBUG: Received HTML instead of XML from BMKG. Server might be redirected or down.');
          throw new Error('Server data BMKG sedang mengalami gangguan atau dialihkan. Silakan coba lagi nanti.');
        }

        const parser = new XMLParser({
          ignoreAttributes: false,
          attributeNamePrefix: "@_",
          parseAttributeValue: true,
          parseTagValue: true,
          trimValues: true
        });
        
        jsonObj = parser.parse(rawData);
        console.log('DEBUG: Raw BMKG parsed keys:', Object.keys(jsonObj || {}));
      } catch (weatherErr: any) {
        console.error('Failed to fetch weather data from BMKG:', weatherErr);
        if (weatherErr.message.includes('Server data BMKG')) {
          throw weatherErr;
        }
        throw new Error('Gagal memuat data cuaca dari BMKG. Server BMKG mungkin sedang sibuk atau dalam pemeliharaan.');
      }
      
      // BMKG XML structure can vary slightly (sometimes root is <data>, sometimes inside <forecast>)
      const forecastData = jsonObj?.data || jsonObj?.forecast || jsonObj?.DigitalForecast;
      
      if (!forecastData || !forecastData.forecast) {
        console.error('DEBUG: Invalid BMKG structure. Parsed object:', JSON.stringify(jsonObj).substring(0, 500));
        throw new Error('Format data BMKG tidak dikenali atau sedang diperbarui.');
      }
      
      // Parse areas - handle case where area might be a single object instead of array
      const areasRaw = forecastData.forecast.area;
      const areas = Array.isArray(areasRaw) ? areasRaw : (areasRaw ? [areasRaw] : []);
      
      if (areas.length === 0) {
        throw new Error('Data wilayah tidak ditemukan dalam respon BMKG.');
      }

      const weatherPoints: any[] = [];
      const alerts: any[] = [];

      areas.forEach((area: any) => {
        // Handle cases where area attributes might be missing
        const lat = parseFloat(area['@_latitude'] || area.latitude || 0);
        const lon = parseFloat(area['@_longitude'] || area.longitude || 0);
        const name = area['@_description'] || area.description || area.name || 'Unknown';

        // Get weather parameter (id="weather")
        const parameters = Array.isArray(area.parameter) ? area.parameter : (area.parameter ? [area.parameter] : []);
        const weatherParam = parameters.find((p: any) => p['@_id'] === 'weather' || p.id === 'weather');
        
        if (!weatherParam) return;

        // Get timeranges
        const timeranges = Array.isArray(weatherParam.timerange) ? weatherParam.timerange : (weatherParam.timerange ? [weatherParam.timerange] : []);
        if (timeranges.length === 0) return;

        // Use the first timerange for current weather
        const currentForecast = timeranges[0];
        const values = Array.isArray(currentForecast.value) ? currentForecast.value : (currentForecast.value ? [currentForecast.value] : []);
        
        // Find the value for weather code (usually first value or has unit="icon")
        const weatherValue = values[0];
        const weatherCode = typeof weatherValue === 'object' ? (weatherValue['#text'] || weatherValue.value || '') : weatherValue.toString();

        if (!weatherCode) return;

        // Check for extreme weather (Heavy Rain: 63, Thunderstorm: 95, 97)
        if (['63', '95', '97'].includes(weatherCode)) {
          alerts.push({
            city: name,
            code: weatherCode,
            desc: WEATHER_CODES[weatherCode]?.label || 'Cuaca Ekstrem',
            lat,
            lon
          });
        }

        // Add to map points
        weatherPoints.push({
          name: name,
          lat: lat,
          lon: lon,
          weatherCode: weatherCode,
          color: WEATHER_CODES[weatherCode]?.color || '#94a3b8',
          desc: WEATHER_CODES[weatherCode]?.label || 'Unknown'
        });
      });

        setExtremeWeather(alerts);

        // 3. Configure Highcharts Map
        setMapOptions({
          chart: {
            map: topology,
            backgroundColor: '#0f172a', // slate-900
          },
          title: {
            text: 'Peta Prakiraan Cuaca Indonesia',
            style: { color: '#e2e8f0' }
          },
          subtitle: {
            text: 'Sumber: BMKG Open Data',
            style: { color: '#94a3b8' }
          },
          mapNavigation: {
            enabled: true,
            buttonOptions: {
              verticalAlign: 'bottom'
            }
          },
          tooltip: {
            pointFormat: '{point.name}: <b>{point.desc}</b>'
          },
          series: [
            {
              name: 'Basemap',
              borderColor: '#334155',
              nullColor: '#1e293b',
              showInLegend: false
            },
            {
              type: 'mappoint',
              name: 'Cuaca Kota',
              color: '#3b82f6',
              data: weatherPoints,
              marker: {
                radius: 4,
                symbol: 'circle'
              },
              tooltip: {
                headerFormat: '',
                pointFormat: '<b>{point.name}</b><br>{point.desc}'
              }
            }
          ]
        });

        setLoading(false);

      } catch (error: any) {
        console.error('Error fetching weather data:', error);
        setError(error?.message || 'Terjadi kesalahan saat memuat data cuaca.');
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchData();
    }, []);

  return (
    <div className="bg-slate-950 min-h-screen font-sans text-slate-200">
      <Header />
      
      <div className="container mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-4 flex items-center gap-3">
            <CloudLightning className="w-8 h-8 text-yellow-500" />
            Pantauan Cuaca Nasional
          </h1>
          <p className="text-slate-400">
            Prakiraan cuaca terkini di kota-kota besar Indonesia berdasarkan data BMKG.
          </p>
        </div>

        {/* Extreme Weather Alerts */}
        {extremeWeather.length > 0 && (
          <div className="mb-8 bg-orange-900/20 border border-orange-500/50 rounded-xl p-6">
            <h2 className="text-xl font-bold text-orange-400 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Peringatan Cuaca Ekstrem
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {extremeWeather.map((alert, idx) => (
                <div key={idx} className="bg-slate-900 p-4 rounded-lg border border-slate-800 flex items-center gap-3">
                  <div className="p-2 bg-slate-800 rounded-full">
                     {alert.code === '95' || alert.code === '97' ? (
                       <CloudLightning className="w-6 h-6 text-yellow-500" />
                     ) : (
                       <CloudRain className="w-6 h-6 text-blue-500" />
                     )}
                  </div>
                  <div>
                    <div className="font-bold text-slate-200">{alert.city}</div>
                    <div className="text-sm text-orange-400">{alert.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Highcharts Map */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 shadow-lg h-[600px] relative">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-slate-400 animate-pulse">Memuat data cuaca...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-6">
              <div className="bg-red-500/10 p-4 rounded-full mb-4">
                <AlertTriangle className="w-12 h-12 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Gagal Memuat Data</h3>
              <p className="text-slate-400 max-w-md mb-6">{error}</p>
              <button 
                onClick={() => fetchData()}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                Coba Lagi
              </button>
            </div>
          ) : (
            <HighchartsReact
              highcharts={Highcharts}
              constructorType={'mapChart'}
              options={mapOptions}
            />
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
