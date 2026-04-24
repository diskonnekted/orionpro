export default function Stats() {
  return (
    <section className="py-10 bg-slate-900 text-white border-y border-slate-800">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-800">
          <div>
            <div className="text-4xl font-bold text-brand-400 mb-1">IoT</div>
            <div className="text-slate-400 text-sm font-medium uppercase tracking-wider">Focused</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-brand-400 mb-1">3</div>
            <div className="text-slate-400 text-sm font-medium uppercase tracking-wider">Pro Packages</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-brand-400 mb-1">24/7</div>
            <div className="text-slate-400 text-sm font-medium uppercase tracking-wider">Monitoring</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-brand-400 mb-1">100%</div>
            <div className="text-slate-400 text-sm font-medium uppercase tracking-wider">Control</div>
          </div>
        </div>
      </div>
    </section>
  );
}
