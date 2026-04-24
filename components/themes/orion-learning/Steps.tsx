import { CheckCircle2 } from 'lucide-react';

export default function Steps() {
  const steps = [
    {
      title: "1. Persiapan Desain & Film",
      content: "Buat desain menggunakan software vektor (CorelDraw/Illustrator). Pisahkan warna jika lebih dari satu. Cetak desain ke kertas kalkir atau mika transparan dengan warna hitam pekat (solid black).",
      image: "Design",
      imageSrc: "/assets/img/learning/design.jpg"
    },
    {
      title: "2. Pelapisan Obat (Coating)",
      content: "Campurkan emulsi dan sensitizer obat afdruk. Oleskan merata ke permukaan screen (depan & belakang) menggunakan coater atau kartu bekas di ruang yang minim cahaya. Keringkan dengan hairdryer (jangan terlalu panas).",
      image: "Coating",
      imageSrc: "/assets/img/learning/coating.jpg"
    },
    {
      title: "3. Penyinaran (Exposing)",
      content: "Tempelkan film desain ke screen yang sudah kering. Letakkan di meja afdruk dan sinari dengan lampu UV selama 5-7 menit (tergantung kekuatan lampu). Tekan dengan pemberat agar film menempel sempurna.",
      image: "Exposing",
      imageSrc: "/assets/img/learning/exposing.jpg"
    },
    {
      title: "4. Penyemprotan (Developing)",
      content: "Basahi screen dengan air, lalu semprot bagian desain dengan sprayer bertekanan sedang hingga desain 'bolong' atau tembus. Keringkan screen di bawah sinar matahari.",
      image: "Developing",
      imageSrc: "/assets/img/learning/developing.jpg"
    },
    {
      title: "5. Proses Sablon (Printing)",
      content: "Pasang screen pada meja catok/banting. Letakkan kaos di bawahnya. Tuang tinta di atas desain, lalu saput menggunakan rakel dengan tekanan stabil (biasanya 2-3 kali saputan).",
      image: "Printing",
      imageSrc: "/assets/img/learning/printing.jpg"
    },
    {
      title: "6. Pengeringan & Finishing",
      content: "Keringkan hasil sablon dengan hairdryer atau hotgun. Untuk tinta plastisol, perlu dipress dengan mesin heat press (160°C selama 10-15 detik) agar tinta matang sempurna.",
      image: "Curing",
      imageSrc: "/assets/img/learning/curing.jpg"
    }
  ];

  return (
    <section id="steps" className="py-20 bg-slate-900 text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-orange-500 font-bold tracking-wider uppercase text-sm">Kurikulum</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">Langkah-Langkah Menyablon</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Ikuti panduan step-by-step ini untuk mulai mencetak kaos custom pertamamu.
          </p>
        </div>

        <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-700 before:to-transparent">
          {steps.map((step, idx) => (
            <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              
              {/* Icon / Number */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-slate-700 bg-slate-900 group-hover:border-orange-500 group-hover:bg-orange-500 transition shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_0_8px_#0f172a] z-10">
                <span className="font-bold text-sm">{idx + 1}</span>
              </div>
              
              {/* Content Card */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 bg-slate-800 rounded-xl border border-slate-700 hover:border-orange-500/50 transition duration-300 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-xl text-white">{step.title}</h3>
                  <div className="px-3 py-1 bg-slate-700 rounded-full text-xs text-slate-300 font-mono hidden sm:block">
                    Step {idx + 1}
                  </div>
                </div>
                <p className="text-slate-400 leading-relaxed text-sm mb-4">
                  {step.content}
                </p>
                <div className="h-40 bg-slate-700/50 rounded-lg flex items-center justify-center border border-slate-700 overflow-hidden relative group-hover:border-orange-500/30 transition">
                   <img src={step.imageSrc} alt={step.title} className="w-full h-full object-cover transition duration-500 group-hover:scale-110" />
                   <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent z-10"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}