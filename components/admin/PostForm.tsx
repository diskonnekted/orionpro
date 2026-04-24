'use client';

import { createPost } from '@/app/admin/posts/actions';
import Link from 'next/link';
import { useFormStatus } from 'react-dom';
import { useState, useRef } from 'react';
import Image from 'next/image';
import Editor from './Editor';

type Category = {
  term_id: number;
  name: string;
  term_taxonomy_id: number;
};

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button 
      type="submit" 
      disabled={pending}
      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? 'Publishing...' : 'Publish'}
    </button>
  );
}

export default function PostForm({ categories, post, action, backLink = "/admin/posts", pageTitle }: { categories: Category[], post?: any, action?: any, backLink?: string, pageTitle?: string }) {
  const [featuredImage, setFeaturedImage] = useState<string | null>(post?.featured_image_url || null);
  const [galleryImages, setGalleryImages] = useState<string[]>(post?.gallery_urls || []);
  const [content, setContent] = useState<string>(post?.post_content || '');
  const featuredInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const formAction = action || createPost;

  const handleFeaturedImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFeaturedImage(URL.createObjectURL(file));
    }
  };

  const triggerFeaturedInput = () => {
    featuredInputRef.current?.click();
  };

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setGalleryImages(prev => [...prev, ...newImages]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">{pageTitle || (post ? 'Edit Post' : 'Add New Post')}</h1>
        <Link href={backLink} className="text-sm text-slate-500 hover:text-slate-700">
          &larr; Back to {backLink.includes('pages') ? 'Pages' : 'Posts'}
        </Link>
      </div>

      <form action={formAction} className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="post_title" className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                <input
                  type="text"
                  name="post_title"
                  id="post_title"
                  required
                  defaultValue={post?.post_title || ''}
                  placeholder="Enter title here"
                  className="block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-lg px-4 py-3"
                />
              </div>
              
              <div>
                <label htmlFor="post_content" className="block text-sm font-medium text-slate-700 mb-1">Content</label>
                <input type="hidden" name="post_content" value={content} />
                <div className="h-80 mb-12">
                  <Editor
                    value={content}
                    onChange={setContent}
                    placeholder="Start writing..."
                  />
                </div>
              </div>

              {/* Gallery Section */}
              <div className="pt-6 border-t border-slate-100">
                <label className="block text-sm font-medium text-slate-700 mb-2">Gallery</label>
                <input
                  type="file"
                  name="gallery_images"
                  id="gallery_images"
                  multiple
                  accept="image/*"
                  onChange={handleGalleryChange}
                  className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {galleryImages.length > 0 && (
                  <div className="mt-4 grid grid-cols-4 gap-4">
                    {galleryImages.map((src, index) => (
                      <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-slate-200">
                        <Image src={src} alt={`Gallery ${index}`} fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Publish Box */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="font-semibold text-slate-800 mb-4 pb-2 border-b border-slate-100">Publish</h3>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="post_status" className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                <select
                  name="post_status"
                  id="post_status"
                  defaultValue={post?.post_status || 'draft'}
                  className="block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option value="publish">Published</option>
                  <option value="draft">Draft</option>
                  <option value="pending">Pending Review</option>
                </select>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <SubmitButton />
              </div>
            </div>
          </div>
          
          {/* Categories Box */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="font-semibold text-slate-800 mb-4 pb-2 border-b border-slate-100">Categories</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {categories.map((category) => (
                <div key={category.term_id} className="flex items-center">
                  <input
                    id={`category-${category.term_id}`}
                    name="post_category[]"
                    value={category.term_taxonomy_id}
                    type="checkbox"
                    defaultChecked={post?.categories?.includes(category.term_taxonomy_id)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor={`category-${category.term_id}`} className="ml-2 block text-sm text-slate-700">
                    {category.name}
                  </label>
                </div>
              ))}
              {categories.length === 0 && (
                <p className="text-sm text-slate-500 italic">No categories found.</p>
              )}
            </div>
          </div>

          {/* Featured Image Box */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="font-semibold text-slate-800 mb-4 pb-2 border-b border-slate-100">Featured Image</h3>
            <div className="space-y-4">
              <input 
                ref={featuredInputRef}
                id="featured_image" 
                name="featured_image" 
                type="file" 
                className="hidden" 
                accept="image/*" 
                onChange={handleFeaturedImageChange} 
              />
              {/* Hidden input to track existing image status */}
              <input 
                type="hidden" 
                name="existing_featured_image" 
                value={featuredImage && !featuredImage.startsWith('blob:') ? featuredImage : ''} 
              />
              
              {featuredImage ? (
                <div className="relative aspect-video rounded-lg overflow-hidden border border-slate-200 mb-2">
                  <Image src={featuredImage} alt="Featured" fill className="object-cover" />
                  <button 
                    type="button" 
                    onClick={() => {
                        setFeaturedImage(null);
                        if (featuredInputRef.current) featuredInputRef.current.value = '';
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              ) : (
                <div 
                    onClick={triggerFeaturedInput}
                    className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <svg className="mx-auto h-12 w-12 text-slate-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="flex text-sm text-slate-600 justify-center mt-2">
                    <span className="relative bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                      <span>Upload a file</span>
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Format Box */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="font-semibold text-slate-800 mb-4 pb-2 border-b border-slate-100">Format</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <input id="format-standard" name="post_format" type="radio" value="standard" defaultChecked className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300" />
                <label htmlFor="format-standard" className="ml-2 block text-sm text-slate-700">Standard</label>
              </div>
              <div className="flex items-center">
                <input id="format-video" name="post_format" type="radio" value="video" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300" />
                <label htmlFor="format-video" className="ml-2 block text-sm text-slate-700">Video</label>
              </div>
              <div className="flex items-center">
                <input id="format-gallery" name="post_format" type="radio" value="gallery" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300" />
                <label htmlFor="format-gallery" className="ml-2 block text-sm text-slate-700">Gallery</label>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
