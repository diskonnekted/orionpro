import { getPlugins } from '@/lib/plugins/manager';
import PluginCard from '@/components/admin/PluginCard';
import { cleanupThemes } from '@/lib/plugins/cleanup';

export default async function PluginsPage() {
  // Run cleanup once (in production this would be a migration)
  await cleanupThemes();
  
  const plugins = await getPlugins();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">Plugins</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium shadow-sm">
          Add New
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plugins.length > 0 ? (
          plugins.map((plugin) => (
            <PluginCard key={plugin.slug} plugin={plugin} />
          ))
        ) : (
           <div className="col-span-full py-12 text-center bg-white rounded-xl border border-slate-200">
             <p className="text-slate-500">No plugins installed.</p>
           </div>
        )}
      </div>
    </div>
  );
}
