import Header from './Header';
import Footer from './Footer';

export default function Contact() {
  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-800">
      <Header />
      
      {/* Page Header */}
      <div className="bg-blue-900 py-20 text-white relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Hubungi Kami</h1>
          <p className="text-blue-100 max-w-2xl mx-auto text-lg">Kami siap melayani pertanyaan dan kebutuhan informasi Anda.</p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
          
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
              <h3 className="text-2xl font-bold text-blue-900 mb-6">Informasi Kontak</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    📍
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Alamat Sekolah</h4>
                    <p className="text-slate-600 mt-1">Jl. Pendidikan No. 123, Kelurahan Ilmu, Kecamatan Cerdas, Jakarta Selatan 12345</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    📞
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Telepon</h4>
                    <p className="text-slate-600 mt-1">(021) 1234-5678</p>
                    <p className="text-slate-600">0812-3456-7890 (WhatsApp)</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    ✉️
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Email</h4>
                    <p className="text-slate-600 mt-1">info@orionschool.sch.id</p>
                    <p className="text-slate-600">admissions@orionschool.sch.id</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
              <h3 className="text-2xl font-bold text-blue-900 mb-4">Jam Operasional</h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex justify-between border-b border-slate-100 pb-2">
                  <span>Senin - Jumat</span>
                  <span className="font-medium">07:00 - 15:00 WIB</span>
                </li>
                <li className="flex justify-between border-b border-slate-100 pb-2">
                  <span>Sabtu</span>
                  <span className="font-medium">08:00 - 12:00 WIB</span>
                </li>
                <li className="flex justify-between">
                  <span>Minggu</span>
                  <span className="text-red-500 font-medium">Tutup</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
            <h3 className="text-2xl font-bold text-blue-900 mb-6">Kirim Pesan</h3>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap</label>
                <input type="text" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" placeholder="Masukkan nama Anda" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input type="email" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" placeholder="contoh@email.com" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Subjek</label>
                <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition">
                  <option>Informasi Pendaftaran</option>
                  <option>Pertanyaan Umum</option>
                  <option>Kerjasama</option>
                  <option>Lainnya</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Pesan</label>
                <textarea rows={4} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" placeholder="Tulis pesan Anda di sini..."></textarea>
              </div>
              
              <button type="button" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5">
                Kirim Pesan
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
