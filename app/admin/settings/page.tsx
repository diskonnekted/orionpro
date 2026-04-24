import { pool } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { updateSiteColorScheme } from '../appearance/actions';
import { saveSettings } from './actions';
import { colorSchemes } from '@/lib/color-schemes';
import { SubmitButton } from '../posts/submit-button';

async function getData() {
  const session = await getSession();
  if (!session?.userId) return { 
    siteScheme: 'default',
    options: {
      blogname: 'Orion CMS',
      blogdescription: 'Just another Orion CMS site',
      site_lang: 'en_US',
      timezone_string: 'UTC',
      admin_color_scheme: 'default',
      site_meta_description: '',
      site_meta_keywords: '',
      site_logo: '/orion-light.png' // Default logo
    }
  };

  try {
    // Get Site Scheme
    const [siteRows] = await pool.query('SELECT option_value FROM orion_options WHERE option_name = "site_color_scheme"');
    const siteScheme = (siteRows as any[])[0]?.option_value || 'default';

    // Get All Options
    const [optionRows] = await pool.query('SELECT option_name, option_value FROM orion_options');
    const optionsMap: Record<string, string> = {};
    (optionRows as any[]).forEach(row => {
      optionsMap[row.option_name] = row.option_value;
    });

    return { 
      siteScheme,
      options: {
        blogname: optionsMap['blogname'] || 'Orion CMS',
        blogdescription: optionsMap['blogdescription'] || 'Just another Orion CMS site',
        site_lang: optionsMap['site_lang'] || 'en_US',
        timezone_string: optionsMap['timezone_string'] || 'UTC',
        admin_color_scheme: optionsMap['admin_color_scheme'] || 'default',
        site_meta_description: optionsMap['site_meta_description'] || '',
        site_meta_keywords: optionsMap['site_meta_keywords'] || '',
        site_logo: optionsMap['site_logo'] || '/orion-light.png'
      }
    };
  } catch (error) {
    return { 
      siteScheme: 'default', 
      options: {
        blogname: 'Orion CMS',
        blogdescription: 'Just another Orion CMS site',
        site_lang: 'en_US',
        timezone_string: 'UTC',
        admin_color_scheme: 'default',
        site_meta_description: '',
        site_meta_keywords: '',
        site_logo: '/orion-light.png'
      } 
    };
  }
}

export default async function SettingsPage() {
  const { siteScheme, options } = await getData();

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">Settings</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Settings Form */}
        <div className="lg:col-span-2 space-y-8">
          <form action={saveSettings} className="space-y-8">
            
            {/* Logo Settings */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-800 mb-4 pb-2 border-b border-slate-100">Logo Settings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Current Logo</label>
                  <div className="p-4 bg-slate-100 rounded-lg flex items-center justify-center border border-slate-200 h-32">
                    <img src={options.site_logo} alt="Site Logo" className="max-h-full max-w-full object-contain" />
                  </div>
                </div>
                <div>
                  <label htmlFor="site_logo" className="block text-sm font-medium text-slate-700 mb-2">Upload New Logo</label>
                  <input type="file" name="site_logo" id="site_logo" accept="image/*" className="block w-full text-sm text-slate-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100
                  "/>
                  <p className="text-xs text-slate-500 mt-2">Allowed formats: PNG, JPG, GIF, SVG, WEBP.</p>
                </div>
              </div>
            </div>

            {/* General Settings */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-800 mb-4 pb-2 border-b border-slate-100">General Settings</h2>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="blogname" className="block text-sm font-medium text-slate-700 mb-1">Site Title</label>
                  <input type="text" name="blogname" id="blogname" defaultValue={options.blogname} className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2" />
                  <p className="text-xs text-slate-500 mt-1">The name of your website.</p>
                </div>
                <div>
                  <label htmlFor="blogdescription" className="block text-sm font-medium text-slate-700 mb-1">Tagline</label>
                  <input type="text" name="blogdescription" id="blogdescription" defaultValue={options.blogdescription} className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2" />
                  <p className="text-xs text-slate-500 mt-1">In a few words, explain what this site is about.</p>
                </div>
              </div>
            </div>

            {/* Localization */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-800 mb-4 pb-2 border-b border-slate-100">Localization</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="site_lang" className="block text-sm font-medium text-slate-700 mb-1">Site Language</label>
                  <select name="site_lang" id="site_lang" defaultValue={options.site_lang} className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2 bg-white">
                    <option value="en_US">English (United States)</option>
                    <option value="id_ID">Bahasa Indonesia</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="timezone_string" className="block text-sm font-medium text-slate-700 mb-1">Timezone</label>
                  <select name="timezone_string" id="timezone_string" defaultValue={options.timezone_string} className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2 bg-white">
                    <option value="UTC">UTC</option>
                    <option value="Asia/Jakarta">Asia/Jakarta</option>
                  </select>
                </div>
              </div>
            </div>

            {/* SEO Settings */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-800 mb-4 pb-2 border-b border-slate-100">SEO Settings</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="site_meta_description" className="block text-sm font-medium text-slate-700 mb-1">Meta Description</label>
                  <textarea name="site_meta_description" id="site_meta_description" rows={3} defaultValue={options.site_meta_description} className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"></textarea>
                  <p className="text-xs text-slate-500 mt-1">A brief description of your site for search engines.</p>
                </div>
                <div>
                  <label htmlFor="site_meta_keywords" className="block text-sm font-medium text-slate-700 mb-1">Meta Keywords</label>
                  <input type="text" name="site_meta_keywords" id="site_meta_keywords" defaultValue={options.site_meta_keywords} className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2" />
                  <p className="text-xs text-slate-500 mt-1">Separate keywords with commas (e.g., cms, orion, php).</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <SubmitButton label="Save Changes" />
            </div>
          </form>
        </div>

        {/* Sidebar / Additional Settings */}
        <div className="lg:col-span-1 space-y-8">
           {/* Site Color Scheme (Orion Pro Feature) */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sticky top-8">
            <h2 className="text-lg font-semibold text-slate-800 mb-2">Front Page Color Scheme</h2>
            <p className="text-slate-500 mb-6 text-sm">Select the color palette for your website's front end.</p>
            
            <form action={updateSiteColorScheme}>
              <div className="grid grid-cols-1 gap-3 mb-6">
                {Object.entries(colorSchemes).map(([key, scheme]) => (
                  <label key={`site-${key}`} className={`relative block cursor-pointer group`}>
                    <input 
                      type="radio" 
                      name="scheme" 
                      value={key} 
                      defaultChecked={siteScheme === key}
                      className="peer sr-only" 
                    />
                    <div className="rounded-lg border-2 border-slate-200 peer-checked:border-blue-500 peer-checked:ring-2 peer-checked:ring-blue-200 transition-all overflow-hidden h-full hover:border-blue-300 flex items-center p-2">
                      <div className="h-8 w-8 rounded mr-3 flex-shrink-0 flex overflow-hidden border border-gray-100">
                        <div className="w-1/3 h-full" style={{ backgroundColor: scheme.colors.primary }}></div>
                        <div className="w-1/3 h-full" style={{ backgroundColor: scheme.colors.secondary }}></div>
                        <div className="w-1/3 h-full" style={{ backgroundColor: scheme.colors.background }}></div>
                      </div>
                      <div className="font-medium text-slate-900 text-sm">{scheme.name}</div>
                    </div>
                    <div className="absolute top-1/2 right-3 -translate-y-1/2 opacity-0 peer-checked:opacity-100 transition-opacity">
                      <div className="bg-blue-500 text-white rounded-full p-0.5 shadow-sm">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
              <div className="flex justify-end">
                 <SubmitButton label="Save Scheme" />
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
