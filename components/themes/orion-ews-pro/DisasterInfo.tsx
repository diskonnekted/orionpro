
import { Waves, Mountain, Activity, AlertTriangle } from 'lucide-react';

export default function DisasterInfo() {
  const disasters = [
    {
      id: 'flood',
      title: 'Banjir',
      icon: <Waves className="w-12 h-12 text-blue-500" />,
      description: 'Luapan air yang merendam daratan. Disebabkan oleh curah hujan tinggi, penyumbatan aliran sungai, atau pasang laut.',
      signs: [
        'Hujan deras terus menerus',
        'Air sungai keruh dan berbusa',
        'Ketinggian air sungai meningkat cepat',
        'Suara gemuruh dari hulu sungai'
      ],
      color: 'blue'
    },
    {
      id: 'landslide',
      title: 'Tanah Longsor',
      icon: <Mountain className="w-12 h-12 text-orange-500" />,
      description: 'Pergerakan massa tanah atau batuan menuruni lereng. Sering terjadi di daerah perbukitan dengan kondisi tanah labil.',
      signs: [
        'Retakan pada tanah atau tembok rumah',
        'Pohon atau tiang listrik miring',
        'Mata air baru muncul tiba-tiba',
        'Air sumur menjadi keruh mendadak'
      ],
      color: 'orange'
    },
    {
      id: 'earthquake',
      title: 'Gempa Bumi',
      icon: <Activity className="w-12 h-12 text-red-500" />,
      description: 'Getaran atau guncangan yang terjadi di permukaan bumi akibat pelepasan energi dari dalam secara tiba-tiba.',
      signs: [
        'Guncangan tanah secara tiba-tiba',
        'Lampu gantung bergoyang kuat',
        'Benda-benda berjatuhan',
        'Suara gemuruh dari dalam tanah'
      ],
      color: 'red'
    }
  ];

  return (
    <section id="edukasi" className="py-20 bg-slate-950 text-slate-200">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Kenali Jenis Bencana</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Memahami karakteristik dan tanda-tanda awal bencana alam adalah langkah pertama yang krusial dalam upaya penyelamatan diri dan mitigasi risiko.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {disasters.map((item) => (
            <div key={item.id} className="bg-slate-900 rounded-2xl p-8 border border-slate-800 hover:border-slate-700 transition hover:-translate-y-2 duration-300">
              <div className={`w-20 h-20 rounded-2xl bg-${item.color}-500/10 flex items-center justify-center mb-6`}>
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
              <p className="text-slate-400 mb-6 text-sm leading-relaxed">
                {item.description}
              </p>
              
              <div className="bg-slate-950 rounded-xl p-5 border border-slate-800">
                <h4 className="text-sm font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-500" />
                  Tanda-Tanda Awal
                </h4>
                <ul className="space-y-2">
                  {item.signs.map((sign, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-600 mt-1.5 shrink-0"></span>
                      {sign}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
