import { pool } from '@/lib/db';
import { updateSiteColorScheme, updateAdminColorScheme, activateTheme } from '../actions';
import { colorSchemes } from '@/lib/color-schemes';
import { SubmitButton } from '../../posts/submit-button';
import { getSession } from '@/lib/auth';

const availableThemes = [
  { 
    id: 'orion-promo', 
    name: 'Orion Promo', 
    description: 'Default promotional theme for Orion CMS',
    screenshot: '/themes/orion-promo.png'
  },
  { 
    id: 'orion-learning',
    name: 'Orion Learning',
    description: 'Educational Platform & Course Management',
    screenshot: '/themes/orion-learning.png'
  },
  { 
    id: 'orion-school', 
    name: 'Orion School', 
    description: 'Academic Institution & School Management',
    screenshot: 'https://images.unsplash.com/photo-152305085306e-8c3d3e7d9f3f?auto=format&fit=crop&w=800&q=80'
  },
  { 
    id: 'orion-portfolio', 
    name: 'Orion Portfolio', 
    description: 'Creative Portfolio & Personal Resume',
    screenshot: '/themes/orion-portfolio.png'
  },
  { 
    id: 'smartvillage', 
    name: 'Smart Village', 
    description: 'Specialized theme for Smart Village and IoT monitoring',
    screenshot: '/smart farm.jpg'
  },
  { 
    id: 'orion-ews-pro', 
    name: 'Orion EWS Pro', 
    description: 'Flood, Landslide, Quake & Tsunami Detection',
    screenshot: '/ews03.jpg'
  },
  { 
    id: 'orion-load-scanner', 
    name: 'Orion Load Scanner', 
    description: 'Mining Material Volume Calculation',
    screenshot: '/loadscanner.jpg'
  },
  { 
    id: 'orion-smarthome', 
    name: 'Orion Smarthome', 
    description: 'Integrated Home Automation',
    screenshot: '/smart-home.jpg'
  },
  { 
    id: 'orion-smartpark', 
    name: 'Orion Smartpark', 
    description: 'Intelligent Parking System',
    screenshot: '/smart-parking.jpg'
  },
  { 
    id: 'orion-weather', 
    name: 'Weather Station', 
    description: 'Real-time Environmental Monitoring',
    screenshot: '/weatherstation.jpg'
  },
  { 
    id: 'orion-livecam', 
    name: 'Orion Livecam', 
    description: 'Live CCTV Streaming Integration',
    screenshot: '/livecam.jpg'
  },
  { 
    id: 'orion-automation', 
    name: 'Industrial Automation', 
    description: 'Process Control & Efficiency',
    screenshot: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80'
  },
  { 
    id: 'orion-machine-monitor', 
    name: 'Machine Monitor', 
    description: 'Industrial Equipment Health Check',
    screenshot: '/machine-monitor.jpg'
  }
];

async function getData() {
  const session = await getSession();
  const userId = session?.userId;
  
  let currentSiteScheme = 'default';
  let currentAdminScheme = 'default';
  let activeTheme = 'orion-promo';

  try {
    // Get Site Scheme
    const [siteRows] = await pool.query('SELECT option_value FROM orion_options WHERE option_name = "site_color_scheme"');
    currentSiteScheme = (siteRows as any[])[0]?.option_value || 'default';

    // Get Active Theme
    const [themeRows] = await pool.query('SELECT option_value FROM orion_options WHERE option_name = "active_theme"');
    activeTheme = (themeRows as any[])[0]?.option_value || 'orion-promo';

    // Get Admin Scheme (if logged in)
    if (userId) {
       const [userRows] = await pool.query('SELECT meta_value FROM orion_usermeta WHERE user_id = ? AND meta_key = "admin_color_scheme"', [userId]);
       currentAdminScheme = (userRows as any[])[0]?.meta_value || 'default';
    }

  } catch (error) {
    // Default fallback
  }

  return { currentSiteScheme, currentAdminScheme, activeTheme };
}

export default async function ThemesPage() {
  const { currentSiteScheme, currentAdminScheme, activeTheme } = await getData();

  return (
    <div className="space-y-8 pb-12">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">Themes & Appearance</h1>
      </div>

      {/* Active Theme Section */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Active Theme</h2>
        <p className="text-slate-500 mb-6">Select the active theme for your website.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableThemes.map((theme) => (
            <div key={theme.id} className={`border rounded-xl overflow-hidden transition-all ${activeTheme === theme.id ? 'border-blue-500 ring-2 ring-blue-200' : 'border-slate-200 hover:border-slate-300'}`}>
              <div className="aspect-video bg-slate-100 relative">
                 <img src={theme.screenshot} alt={theme.name} className="w-full h-full object-cover" />
                 {activeTheme === theme.id && (
                    <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
                      Active
                    </div>
                 )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-slate-900 mb-1">{theme.name}</h3>
                <p className="text-sm text-slate-500 mb-4">{theme.description}</p>
                
                {activeTheme !== theme.id ? (
                  <form action={activateTheme}>
                    <input type="hidden" name="themeId" value={theme.id} />
                    <SubmitButton label="Activate" />
                  </form>
                ) : (
                  <button disabled className="w-full py-2 bg-slate-100 text-slate-400 font-medium rounded-lg cursor-not-allowed">
                    Active
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Admin Color Scheme Section */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Admin Color Scheme</h2>
        <p className="text-slate-500 mb-6">Select the color palette for your dashboard.</p>
        
        <form action={updateAdminColorScheme}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {Object.entries(colorSchemes).map(([key, scheme]) => (
              <label key={key} className={`relative block cursor-pointer group`}>
                <input 
                  type="radio" 
                  name="scheme" 
                  value={key} 
                  defaultChecked={currentAdminScheme === key}
                  className="peer sr-only" 
                />
                <div className="rounded-lg border-2 border-slate-200 peer-checked:border-blue-500 peer-checked:ring-2 peer-checked:ring-blue-200 transition-all overflow-hidden h-full">
                  <div className="h-24 flex">
                    {/* Admin Dashboard Sidebar Preview */}
                    <div className="w-1/4 h-full flex flex-col items-center justify-center gap-2" style={{ backgroundColor: scheme.colors.secondary, borderRight: `1px solid ${scheme.colors.border}` }}>
                       <div className="w-8 h-8 rounded bg-slate-100" style={{ backgroundColor: scheme.colors.primary, opacity: 0.5 }}></div>
                       <div className="w-8 h-2 rounded bg-slate-100" style={{ backgroundColor: '#ffffff', opacity: 0.2 }}></div>
                    </div>
                    {/* Admin Dashboard Content Preview */}
                    <div className="w-3/4 h-full p-2" style={{ backgroundColor: scheme.colors.background }}>
                        <div className="w-full h-8 rounded mb-2" style={{ backgroundColor: scheme.colors.surface }}></div>
                        <div className="flex gap-2">
                             <div className="w-1/2 h-8 rounded" style={{ backgroundColor: scheme.colors.primary }}></div>
                             <div className="w-1/2 h-8 rounded" style={{ backgroundColor: scheme.colors.surface }}></div>
                        </div>
                    </div>
                  </div>
                  <div className="p-4 bg-white">
                    <div className="font-medium text-slate-900">{scheme.name}</div>
                  </div>
                </div>
                <div className="absolute top-2 right-2 opacity-0 peer-checked:opacity-100 transition-opacity">
                  <div className="bg-blue-500 text-white rounded-full p-1 shadow-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                </div>
              </label>
            ))}
          </div>
          <div className="flex justify-end">
            <div className="w-32">
                <SubmitButton label="Save Changes" />
            </div>
          </div>
        </form>
      </div>

      {/* Front Page Color Scheme Section */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Front Page Color Scheme</h2>
        <p className="text-slate-500 mb-6">Select the color palette for your website's front end.</p>
        
        <form action={updateSiteColorScheme}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {Object.entries(colorSchemes).map(([key, scheme]) => (
              <label key={key} className={`relative block cursor-pointer group`}>
                <input 
                  type="radio" 
                  name="scheme" 
                  value={key} 
                  defaultChecked={currentSiteScheme === key}
                  className="peer sr-only" 
                />
                <div className="rounded-lg border-2 border-slate-200 peer-checked:border-blue-500 peer-checked:ring-2 peer-checked:ring-blue-200 transition-all overflow-hidden h-full">
                  <div className="h-24 flex">
                    <div className="w-1/3" style={{ backgroundColor: scheme.colors.primary }}></div>
                    <div className="w-1/3" style={{ backgroundColor: scheme.colors.secondary }}></div>
                    <div className="w-1/3" style={{ backgroundColor: scheme.colors.background }}></div>
                  </div>
                  <div className="p-4 bg-white">
                    <div className="font-medium text-slate-900">{scheme.name}</div>
                    <div className="flex gap-2 mt-2">
                        <div className="w-6 h-6 rounded-full border border-slate-100" style={{ backgroundColor: scheme.colors.accent || scheme.colors.text }}></div>
                        <div className="w-6 h-6 rounded-full border border-slate-100" style={{ backgroundColor: scheme.colors.neutral || scheme.colors.border }}></div>
                    </div>
                  </div>
                </div>
                <div className="absolute top-2 right-2 opacity-0 peer-checked:opacity-100 transition-opacity">
                  <div className="bg-blue-500 text-white rounded-full p-1 shadow-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                </div>
              </label>
            ))}
          </div>
          <div className="flex justify-end">
            <div className="w-32">
                <SubmitButton label="Save Changes" />
            </div>
          </div>
        </form>
      </div>

      {/* Existing Themes Section (Placeholder) */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden opacity-75">
          <div className="p-6 border-b border-slate-200">
             <h2 className="text-lg font-semibold text-slate-800">Installed Themes</h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-50 rounded-lg border border-slate-200 overflow-hidden">
                <div className="h-40 bg-slate-200 flex items-center justify-center text-slate-400">Preview</div>
                <div className="p-4">
                    <h3 className="font-medium text-slate-900">Orion Default</h3>
                    <p className="text-xs text-slate-500 mt-1">Active</p>
                </div>
            </div>
          </div>
      </div>
    </div>
  );
}
