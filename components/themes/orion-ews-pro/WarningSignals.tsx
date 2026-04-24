
import { Megaphone, CheckCircle, AlertOctagon, Info } from 'lucide-react';

export default function WarningSignals() {
  const levels = [
    {
      level: 'NORMAL',
      color: 'green',
      bg: 'bg-green-500',
      text: 'text-green-500',
      desc: 'Tidak ada ancaman bencana. Kondisi lingkungan stabil dan aman.',
      action: 'Lakukan aktivitas seperti biasa. Tetap jaga kelestarian lingkungan.',
      icon: <CheckCircle className="w-8 h-8 text-white" />
    },
    {
      level: 'WASPADA',
      color: 'yellow',
      bg: 'bg-yellow-500',
      text: 'text-yellow-500',
      desc: 'Terdeteksi peningkatan aktivitas (curah hujan tinggi, pergerakan tanah kecil).',
      action: 'Siapkan tas siaga bencana. Pantau informasi resmi secara berkala.',
      icon: <Info className="w-8 h-8 text-white" />
    },
    {
      level: 'AWAS',
      color: 'red',
      bg: 'bg-red-500',
      text: 'text-red-500',
      desc: 'Ancaman bencana nyata dan segera terjadi. Sensor mendeteksi bahaya kritis.',
      action: 'SEGERA EVAKUASI ke tempat aman. Ikuti jalur evakuasi yang ditentukan.',
      icon: <AlertOctagon className="w-8 h-8 text-white" />
    }
  ];

  return (
    <section className="py-20 bg-slate-900 border-y border-slate-800 text-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          
          <div className="lg:w-1/3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/20 text-blue-400 text-xs font-bold mb-4">
              <Megaphone className="w-4 h-4" />
              SISTEM PERINGATAN
            </div>
            <h2 className="text-3xl font-bold mb-6">Pahami Status Peringatan Dini</h2>
            <p className="text-slate-400 mb-8 leading-relaxed">
              Orion EWS Pro menggunakan sistem tingkatan status untuk memberikan informasi yang jelas kepada masyarakat. Setiap warna memiliki arti dan instruksi keselamatan yang berbeda.
            </p>
            <div className="p-6 bg-slate-800 rounded-xl border border-slate-700">
              <h3 className="font-bold mb-2 text-white">Nomor Darurat Penting</h3>
              <div className="space-y-2 font-mono text-lg">
                <div className="flex justify-between">
                  <span className="text-slate-400">BPBD</span>
                  <span className="text-blue-400">112</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">SAR</span>
                  <span className="text-orange-400">115</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Polisi</span>
                  <span className="text-slate-200">110</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-2/3 grid gap-6">
            {levels.map((lvl) => (
              <div key={lvl.level} className="flex flex-col sm:flex-row items-start gap-6 p-6 bg-slate-950 rounded-xl border border-slate-800 hover:border-slate-600 transition">
                <div className={`w-16 h-16 rounded-full ${lvl.bg} flex items-center justify-center shadow-lg shrink-0`}>
                  {lvl.icon}
                </div>
                <div>
                  <h3 className={`text-xl font-bold mb-1 ${lvl.text}`}>STATUS {lvl.level}</h3>
                  <p className="text-slate-300 mb-3">{lvl.desc}</p>
                  <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-sm text-slate-400">
                    <span className="font-bold text-slate-200">Tindakan:</span> {lvl.action}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
