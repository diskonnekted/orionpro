'use client';

import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';

interface NewsCardProps {
  date: string;
  category: string;
  title: string;
  excerpt: string;
  image?: string;
  slug: string;
}

export default function NewsCard({ date, category, title, excerpt, image, slug }: NewsCardProps) {
  return (
    <article className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden bg-slate-200">
        {image ? (
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400 bg-slate-100">
            <svg className="w-12 h-12 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-blue-700 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
            {category}
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        {/* Meta */}
        <div className="flex items-center text-slate-500 text-xs font-medium mb-3 gap-2">
          <Calendar size={14} className="text-blue-500" />
          <span>{date}</span>
        </div>

        {/* Content */}
        <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight group-hover:text-blue-700 transition-colors">
          <Link href={`/news/${slug}`} className="focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true" />
            {title}
          </Link>
        </h3>
        
        <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 mb-6 flex-1">
          {excerpt}
        </p>

        {/* Footer/Button */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-blue-600 font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
            Baca Selengkapnya
            <ArrowRight size={16} />
          </span>
        </div>
      </div>
    </article>
  );
}
