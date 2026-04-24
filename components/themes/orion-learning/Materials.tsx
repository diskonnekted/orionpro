import { PenTool, Layers, Droplets, Sun, Shirt, Scissors } from 'lucide-react';

export default function Materials() {
  const materials = [
    {
      icon: Layers,
      name: "Screen Frame",
      desc: "Bingkai kayu/aluminium dengan kain mesh (T61/T77 untuk kaos)."
    },
    {
      icon: Droplets,
      name: "Obat Afdruk",
      desc: "Emulsi foto sensitif (seperti Bremol/Ulano) untuk mencetak desain ke screen."
    },
    {
      icon: PenTool,
      name: "Rakel (Squeegee)",
      desc: "Alat karet untuk menyapu tinta ke atas permukaan kaos."
    },
    {
      icon: Sun,
      name: "Meja Afdruk",
      desc: "Meja kaca dengan lampu UV/neon untuk proses penyinaran (exposure)."
    },
    {
      icon: Shirt,
      name: "Tinta Sablon",
      desc: "Tinta rubber (basis air) atau plastisol (basis minyak) sesuai kebutuhan."
    },
    {
      icon: Scissors,
      name: "Alat Bantu",
      desc: "Hairdryer/hotgun, semprotan air, lakban, dan spatula."
    }
  ];

  return (
    <section id="materials" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-orange-600 font-bold tracking-wider uppercase text-sm">Persiapan</span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-4">Alat & Bahan Yang Dibutuhkan</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Sebelum memulai, pastikan Anda memiliki perlengkapan dasar berikut untuk hasil sablon yang maksimal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {materials.map((item, idx) => (
            <div key={idx} className="flex items-start p-6 bg-slate-50 rounded-xl border border-slate-100 hover:shadow-lg hover:border-orange-200 transition duration-300 group">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-orange-600 shadow-sm mr-4 group-hover:bg-orange-600 group-hover:text-white transition">
                <item.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{item.name}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}