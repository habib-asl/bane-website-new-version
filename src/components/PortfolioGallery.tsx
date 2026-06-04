import React, { useState, useEffect } from 'react';
import { collection, query, getDocs, orderBy } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { INITIAL_GALLERY } from '../data/seedData';
import { GalleryItem } from '../types';
import { Layers, Image as ImageIcon, Eye, X, ArrowUpRight } from 'lucide-react';

interface GalleryProps {
  gallerySeed: GalleryItem[];
}

export default function PortfolioGallery({ gallerySeed }: GalleryProps) {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeLightbox, setActiveLightbox] = useState<GalleryItem | null>(null);

  const categories = ['All', 'Technology', 'Airfield', 'Operations', 'Consultancy'];

  useEffect(() => {
    async function loadGallery() {
      try {
        const path = 'gallery';
        const q = query(collection(db, path), orderBy('title', 'asc'));
        const response = await getDocs(q);
        
        if (response.empty) {
          // If Firestore has no records, we fall back to the initial seeded array.
          setGalleryItems(gallerySeed.length > 0 ? gallerySeed : INITIAL_GALLERY);
        } else {
          const items: GalleryItem[] = [];
          response.forEach((doc) => {
            items.push({ id: doc.id, ...doc.data() } as GalleryItem);
          });
          setGalleryItems(items);
        }
      } catch (error) {
        console.warn("Firestore error loading gallery, compiling standard seed values.", error);
        setGalleryItems(gallerySeed.length > 0 ? gallerySeed : INITIAL_GALLERY);
      } finally {
        setLoading(false);
      }
    }

    loadGallery();
  }, [gallerySeed]);

  const filteredItems = selectedCategory === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <section id="portfolio-gallery" className="gallery-section-wrapper py-20 sm:py-24 bg-[#fafafc] px-4 sm:px-8 xl:px-16 border-t border-slate-100">
      <div className="gallery-section-container max-w-[1600px] mx-auto space-y-12">
        
        {/* Headings */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-200">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-xs font-mono tracking-widest text-sky-600 uppercase font-bold">Technical Showcase</h2>
            <p className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-slate-900">Aviation Digitize Album</p>
            <p className="text-slate-600 font-normal text-xs sm:text-sm max-w-xl">
              Inspect BANE Aero's active hardware infrastructures, automated terminals, security arrays, and consultant planning meetings.
            </p>
          </div>

          {/* Filtering navigation badges */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-medium uppercase tracking-wider smooth-transition hover:cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-sky-600 text-white font-bold shadow-md shadow-sky-600/10'
                    : 'bg-white text-slate-600 border border-slate-200 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="h-10 w-10 border-4 border-t-sky-600 border-slate-200 rounded-full animate-spin" />
            <p className="text-slate-500 font-mono text-xs uppercase tracking-widest">Caching High-Res Visual Portfolios...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-24 bg-slate-50 border border-dashed border-slate-200 rounded-2xl">
            <ImageIcon className="h-10 w-10 text-slate-400 mx-auto mb-4" />
            <p className="text-sm text-slate-600 leading-relaxed font-sans">No gallery images registered in this classification.</p>
            <p className="text-[11px] text-slate-500 font-mono mt-1">Visit your CMS Administrator Dashboard to import dynamic photos.</p>
          </div>
        ) : (
          /* Masonry GRID pattern */
          <div className="masonry-grid">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveLightbox(item)}
                className="masonry-item bg-white border border-slate-200 rounded-2xl overflow-hidden cursor-pointer group hover:border-sky-300 hover:shadow-lg smooth-transition"
              >
                {/* Photo holder wrapper */}
                <div className="relative overflow-hidden aspect-video xs:aspect-4/3 sm:aspect-auto">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-102 smooth-transition"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  
                  {/* Subtle hover gradient and action icon overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 smooth-transition flex items-end p-5">
                    <div className="w-full flex items-center justify-between">
                      <div className="space-y-1 max-w-[80%]">
                        <span className="text-[9px] font-mono tracking-widest text-sky-400 uppercase py-0.5 px-1.5 bg-sky-950/65 border border-sky-400/20 rounded">
                          {item.category}
                        </span>
                        <h4 className="text-sm font-bold text-slate-100 truncate mt-1.5">{item.title}</h4>
                      </div>
                      
                      <div className="h-8 w-8 rounded-lg bg-sky-500 text-white flex items-center justify-center shrink-0">
                        <Eye className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Active top badge default */}
                  <span className="absolute top-4 left-4 text-[9px] font-mono tracking-wider font-semibold uppercase py-1 px-2.5 bg-white/95 border border-slate-200 text-slate-600 rounded-md backdrop-blur-sm group-hover:opacity-0 smooth-transition shadow-sm">
                    {item.category}
                  </span>
                </div>

                {/* Outer descriptions */}
                <div className="p-5 space-y-1 border-t border-slate-100">
                  <h3 className="text-sm font-bold text-slate-800 group-hover:text-sky-600 smooth-transition flex items-center justify-between">
                    <span>{item.title}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-sky-600 smooth-transition" />
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-light line-clamp-2">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Lightbox Immersive Overlay Widget */}
        {activeLightbox && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-sm animate-fade-in">
            <div className="relative max-w-4xl w-full bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] md:max-h-none">
              
              {/* Image side */}
              <div className="md:w-3/5 bg-slate-950 flex items-center justify-center overflow-hidden h-[40vh] md:h-auto">
                <img
                  src={activeLightbox.image}
                  alt={activeLightbox.title}
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Text Description and actions side */}
              <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="text-[10px] font-mono tracking-widest font-bold text-sky-650 uppercase py-1 px-2.5 bg-sky-50 border border-sky-100 rounded-md">
                      {activeLightbox.category}
                    </span>
                    <button
                      onClick={() => setActiveLightbox(null)}
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 smooth-transition"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-bold font-display text-slate-900 leading-tight">{activeLightbox.title}</h3>
                    <p className="text-xs text-slate-500 font-mono">BANE Aviation Infrastructure Repository</p>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed font-light">
                    {activeLightbox.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-100 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-500">Node Status:</span>
                    <span className="text-emerald-600 font-semibold flex items-center space-x-1">
                      <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-ping mr-1" />
                      <span>Operational</span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                    <span>Database ID:</span>
                    <span className="text-slate-800">{activeLightbox.id}</span>
                  </div>
                  <button
                    onClick={() => setActiveLightbox(null)}
                    className="w-full px-4 py-2.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-semibold text-slate-700 rounded-lg smooth-transition uppercase tracking-wider"
                  >
                    Close Inspection View
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
