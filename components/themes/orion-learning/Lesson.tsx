'use client';

import { useState } from 'react';
import { PlayCircle, CheckCircle, Lock, Menu, X, ChevronRight, FileText } from 'lucide-react';
import Link from 'next/link';

export default function Lesson() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeLesson, setActiveLesson] = useState(0);

  const curriculum = [
    {
      module: "Module 1: Pengenalan",
      lessons: [
        { title: "Apa itu Sablon Manual?", duration: "10:05", type: "video" },
        { title: "Alat & Bahan yang Dibutuhkan", duration: "15:30", type: "video" },
        { title: "Mengenal Jenis-jenis Tinta", duration: "08:45", type: "text" }
      ]
    },
    {
      module: "Module 2: Persiapan Screen",
      lessons: [
        { title: "Teknik Memasang Kain Screen", duration: "12:20", type: "video" },
        { title: "Racikan Obat Afdruk yang Pas", duration: "10:15", type: "video" },
        { title: "Proses Afdruk (Exposing)", duration: "20:00", type: "video" }
      ]
    },
    {
      module: "Module 3: Teknik Gesut",
      lessons: [
        { title: "Posisi Rakel yang Benar", duration: "05:50", type: "video" },
        { title: "Tekanan & Kemiringan", duration: "08:10", type: "video" },
        { title: "Finishing & Curing", duration: "12:00", type: "text" }
      ]
    }
  ];

  const currentLesson = curriculum.flatMap(m => m.lessons)[activeLesson];

  return (
    <div className="flex h-screen bg-slate-900 text-white overflow-hidden font-sans">
      
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-80 translate-x-0' : 'w-0 -translate-x-full'} bg-slate-800 border-r border-slate-700 transition-all duration-300 flex-shrink-0 absolute md:relative z-20 h-full flex flex-col`}>
        <div className="p-4 border-b border-slate-700 flex items-center justify-between">
          <Link href="/" className="font-bold text-orange-500 tracking-tight flex items-center gap-2">
            <ChevronRight className="rotate-180 w-4 h-4" /> Kembali
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {curriculum.map((module, mIdx) => (
            <div key={mIdx} className="mb-2">
              <div className="px-4 py-3 bg-slate-800/50 text-xs font-bold text-slate-400 uppercase tracking-wider sticky top-0 backdrop-blur-sm z-10">
                {module.module}
              </div>
              <div>
                {module.lessons.map((lesson, lIdx) => {
                  const globalIdx = curriculum.slice(0, mIdx).reduce((acc, m) => acc + m.lessons.length, 0) + lIdx;
                  const isActive = globalIdx === activeLesson;
                  
                  return (
                    <button 
                      key={lIdx}
                      onClick={() => setActiveLesson(globalIdx)}
                      className={`w-full text-left px-4 py-3 flex items-start gap-3 hover:bg-slate-700/50 transition border-l-2 ${isActive ? 'bg-slate-700/50 border-orange-500' : 'border-transparent'}`}
                    >
                      <div className={`mt-0.5 ${isActive ? 'text-orange-500' : 'text-slate-500'}`}>
                        {lesson.type === 'video' ? <PlayCircle className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                      </div>
                      <div>
                        <p className={`text-sm font-medium ${isActive ? 'text-white' : 'text-slate-300'}`}>{lesson.title}</p>
                        <p className="text-xs text-slate-500 mt-1">{lesson.duration}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-slate-900 border-t border-slate-700">
          <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
             <div className="bg-orange-500 h-full w-[10%]"></div>
          </div>
          <p className="text-xs text-slate-400 mt-2 text-center">Progress: 10% Completed</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative min-w-0">
        <header className="h-16 bg-slate-800 border-b border-slate-700 flex items-center px-4 justify-between shrink-0">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-slate-400 hover:text-white transition">
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-bold truncate hidden sm:block">{currentLesson.title}</h1>
          </div>
          <div className="flex items-center gap-3">
             <button className="px-4 py-1.5 bg-slate-700 text-sm font-medium rounded-lg hover:bg-slate-600 transition">Diskusi</button>
             <button className="px-4 py-1.5 bg-orange-600 text-sm font-bold rounded-lg hover:bg-orange-700 transition flex items-center gap-2">
               <CheckCircle className="w-4 h-4" /> Selesai
             </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto bg-black p-4 md:p-8 flex items-center justify-center">
           <div className="max-w-4xl w-full">
              {currentLesson.type === 'video' ? (
                <div className="aspect-video bg-slate-900 rounded-xl overflow-hidden shadow-2xl relative group">
                   <img src="/assets/img/learning/intro.jpg" className="w-full h-full object-cover opacity-50" alt="Video Placeholder" />
                   <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 bg-orange-600/90 rounded-full flex items-center justify-center text-white cursor-pointer hover:scale-110 transition shadow-lg shadow-orange-500/20">
                         <PlayCircle className="w-10 h-10 fill-current" />
                      </div>
                   </div>
                   <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-800">
                      <div className="h-full bg-orange-600 w-1/3 relative">
                         <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow"></div>
                      </div>
                   </div>
                </div>
              ) : (
                <div className="bg-white text-slate-900 rounded-xl p-8 md:p-12 shadow-xl max-w-3xl mx-auto min-h-[60vh]">
                   <h2 className="text-3xl font-bold mb-6">{currentLesson.title}</h2>
                   <div className="prose prose-slate max-w-none">
                     <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                     <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                     <h3>Poin Penting:</h3>
                     <ul>
                       <li>Pastikan area kerja bersih</li>
                       <li>Siapkan alat sebelum mulai</li>
                       <li>Gunakan APD yang sesuai</li>
                     </ul>
                   </div>
                </div>
              )}
           </div>
        </div>
      </main>

    </div>
  );
}