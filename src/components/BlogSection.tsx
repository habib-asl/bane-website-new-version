import React, { useState, useEffect } from 'react';
import { collection, query, getDocs, orderBy, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { INITIAL_BLOGS } from '../data/seedData';
import { BlogPost } from '../types';
import { Search, Calendar, User, Eye, ArrowRight, ChevronLeft, Bookmark, Clock, Share2 } from 'lucide-react';

interface BlogProps {
  blogSeed: BlogPost[];
}

// Simple Markdown to JSX Parser for secure, light rendering without foreign injections
export function SimpleMarkdownRenderer({ content }: { content: string }) {
  const lines = content.split('\n');
  
  return (
    <div className="space-y-4 text-slate-705 text-sm sm:text-base leading-relaxed font-light font-sans">
      {lines.map((line, idx) => {
        // Headers Level 2
        if (line.startsWith('## ')) {
          return <h2 key={idx} className="text-xl sm:text-2xl font-bold font-display text-slate-900 mt-6 mb-3">{line.replace('## ', '')}</h2>;
        }
        // Headers Level 3
        if (line.startsWith('### ')) {
          return <h3 key={idx} className="text-lg sm:text-xl font-bold font-display text-sky-600 mt-4 mb-2">{line.replace('### ', '')}</h3>;
        }
        // Blockquotes
        if (line.startsWith('> ')) {
          return (
            <blockquote key={idx} className="border-l-4 border-sky-500 pl-4 py-1.5 my-4 italic text-slate-600 bg-slate-50 rounded-r-lg font-normal">
              {line.replace('> ', '').replace(/"/g, '')}
            </blockquote>
          );
        }
        // Bullets
        if (line.startsWith('* ') || line.startsWith('- ')) {
          return (
            <div key={idx} className="flex items-start space-x-2 pl-4">
              <span className="h-1.5 w-1.5 bg-sky-500 rounded-full mt-2 shrink-0" />
              <span>{line.replace(/^(\*\s|-\s)/, '')}</span>
            </div>
          );
        }
        // Enumerated items
        if (/^\d+\.\s/.test(line)) {
          return (
            <div key={idx} className="flex items-start space-x-2 pl-4">
              <span className="font-mono text-sky-600 text-xs mt-1 shrink-0">{line.match(/^\d+\.\s/)?.[0]}</span>
              <span>{line.replace(/^\d+\.\s/, '')}</span>
            </div>
          );
        }
        // Render Empty Lines
        if (line.trim() === '') {
          return <div key={idx} className="h-2" />;
        }
        // Standard Paragraphs with basic Bold Parsing
        const parts = line.split('**');
        if (parts.length > 2) {
          return (
            <p key={idx}>
              {parts.map((p, pIdx) => pIdx % 2 === 1 ? <strong key={pIdx} className="font-semibold text-slate-900">{p}</strong> : p)}
            </p>
          );
        }
        
        return <p key={idx}>{line}</p>;
      })}
    </div>
  );
}

export default function BlogSection({ blogSeed }: BlogProps) {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const path = 'blogs';
        const q = query(collection(db, path), orderBy('createdAt', 'desc'));
        const response = await getDocs(q);

        if (response.empty) {
          setBlogs(blogSeed.length > 0 ? blogSeed : INITIAL_BLOGS);
        } else {
          const fetched: BlogPost[] = [];
          response.forEach((doc) => {
            const data = doc.data();
            // Handle Timestamp conversions gracefully
            let cDate = new Date();
            if (data.createdAt?.toDate) {
              cDate = data.createdAt.toDate();
            } else if (data.createdAt) {
              cDate = new Date(data.createdAt);
            }
            fetched.push({
              id: doc.id,
              ...data,
              createdAt: cDate
            } as BlogPost);
          });
          setBlogs(fetched);
        }
      } catch (error) {
        console.warn("Firestore error reading blogs, using local fallback models.", error);
        setBlogs(blogSeed.length > 0 ? blogSeed : INITIAL_BLOGS);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, [blogSeed]);

  // Triggers dynamic view count incrementing on firestore
  const handleReadArticle = async (article: BlogPost) => {
    try {
      setActiveArticle(article);
      const docRef = doc(db, 'blogs', article.id);
      await updateDoc(docRef, {
        views: (article.views || 0) + 1
      });
      // Synchronize locally list state after increments
      setBlogs(prev => prev.map(b => b.id === article.id ? { ...b, views: (b.views || 0) + 1 } : b));
    } catch (_) {
      // Swallowed on fallback local state cases
    }
  };

  const filteredBlogs = blogs.filter(b => 
    b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="blogs-section" className="blogs-section-wrapper py-20 sm:py-24 bg-white border-t border-slate-100 px-4 sm:px-8 xl:px-16">
      <div className="blogs-section-container max-w-[1600px] mx-auto">
        
        {/* Full Expanded Reading mode layout */}
        {activeArticle ? (
          <article className="max-w-4xl mx-auto bg-white border border-slate-205 rounded-3xl overflow-hidden shadow-xl animate-fade-in relative">
            {/* Ambient upper lights */}
            <div className="absolute top-0 left-0 right-0 h-44 bg-gradient-to-b from-sky-500/5 to-transparent pointer-events-none" />

            {/* Banner element */}
            <div className="relative aspect-video sm:aspect-21/9 bg-slate-100 overflow-hidden">
              <img
                src={activeArticle.image}
                alt={activeArticle.title}
                className="w-full h-full object-cover opacity-90"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent" />
              
              {/* Back button */}
              <button
                onClick={() => setActiveArticle(null)}
                className="absolute top-6 left-6 flex items-center space-x-2 px-4 py-2 bg-white/95 border border-slate-200 rounded-lg text-xs font-semibold text-sky-600 hover:text-slate-900 shadow-sm smooth-transition hover:cursor-pointer"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Return to Feed</span>
              </button>
            </div>

            {/* Meta and content text body */}
            <div className="p-6 sm:p-10 space-y-6 relative z-10">
              
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-500 border-b border-slate-100 pb-5">
                <span className="text-[10px] uppercase font-bold text-sky-600 py-1 px-2.5 bg-sky-50 border border-sky-100 rounded-md">
                  {activeArticle.category}
                </span>

                <span className="flex items-center space-x-1.5 pl-1.5 border-l border-slate-200">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{activeArticle.createdAt instanceof Date ? activeArticle.createdAt.toLocaleDateString() : String(activeArticle.createdAt)}</span>
                </span>

                <span className="flex items-center space-x-1.5">
                  <User className="h-3.5 w-3.5" />
                  <span>{activeArticle.author}</span>
                </span>

                <span className="flex items-center space-x-1.5">
                  <Eye className="h-3.5 w-3.5" />
                  <span>{activeArticle.views || 0} views</span>
                </span>

                <span className="flex items-center space-x-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  <span>5 Min Read</span>
                </span>
              </div>

              {/* Title display */}
              <h1 className="text-2xl sm:text-4xl font-extrabold font-display tracking-tight text-slate-900 leading-tight">
                {activeArticle.title}
              </h1>

              {/* Summary introductory call-out */}
              <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed border-l-2 border-indigo-500 pl-4 py-1 italic bg-indigo-50 rounded-r-lg">
                {activeArticle.summary}
              </p>

              {/* Standard Markdown elements */}
              <div className="pt-4">
                <SimpleMarkdownRenderer content={activeArticle.content} />
              </div>

              {/* Footer sharing alerts inside modal layout */}
              <div className="border-t border-slate-100 pt-8 mt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-3.5 text-xs text-slate-500">
                  <span className="font-mono uppercase tracking-wider">Aviation Hub Article Reference</span>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      alert("Article link copied for outreach sharing!");
                    }}
                    className="flex items-center space-x-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-950 border border-slate-200 rounded-lg text-xs font-semibold smooth-transition hover:cursor-pointer"
                  >
                    <Share2 className="h-3.5 w-3.5" />
                    <span>Copy Share URL</span>
                  </button>
                  
                  <button
                    onClick={() => setActiveArticle(null)}
                    className="px-5 py-2 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-lg shadow-sm smooth-transition hover:cursor-pointer"
                  >
                    Close & Return
                  </button>
                </div>
              </div>

            </div>
          </article>
        ) : (
          /* Normal List Feed Layout */
          <div className="space-y-12">
            
            {/* Header control strip */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-200">
              <div className="space-y-2 text-center md:text-left">
                <h2 className="text-xs font-mono tracking-widest text-indigo-600 uppercase font-bold">SEO Aviation Portal</h2>
                <p className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-slate-900">Insights & Industry Reports</p>
                <p className="text-slate-600 font-normal text-xs sm:text-sm">
                  Subscribe or check back often for technical analyses about airfield IT support and aeronautical billing efficiencies.
                </p>
              </div>

              {/* Search bar block */}
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Query articles by title or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-205 text-slate-800 placeholder-slate-450 rounded-xl pl-11 pr-4 py-2.5 text-xs outline-none focus:border-indigo-400 focus:bg-white smooth-transition"
                />
              </div>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 space-y-4">
                <div className="h-10 w-10 border-4 border-t-indigo-500 border-slate-900 rounded-full animate-spin" />
                <p className="text-slate-400 font-mono text-xs uppercase tracking-widest">Compiling SEO Flight Logs...</p>
              </div>
            ) : filteredBlogs.length === 0 ? (
              <div className="text-center py-24 bg-slate-900/10 border border-dashed border-slate-900 rounded-2xl">
                <Bookmark className="h-10 w-10 text-slate-600 mx-auto mb-4" />
                <p className="text-sm text-slate-400">No blog documents found correlating with your query.</p>
                <button 
                  onClick={() => setSearchQuery('')}
                  className="mt-4 px-4 py-2 bg-slate-900 border border-slate-800 text-xs font-semibold text-indigo-400 hover:text-indigo-300 rounded-lg smooth-transition"
                >
                  Reset Filter Inputs
                </button>
              </div>
            ) : (
              /* Blogs Grid listing */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredBlogs.map((post) => (
                  <article
                    key={post.id}
                    className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-sky-300 hover:shadow-xl shadow-slate-100 smooth-transition group"
                  >
                    {/* Media header */}
                    <div className="relative aspect-video bg-slate-900 overflow-hidden cursor-pointer" onClick={() => handleReadArticle(post)}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-102 smooth-transition"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                      
                      {/* Top badge */}
                      <span className="absolute top-4 left-4 text-[9px] font-mono tracking-wider uppercase bg-white/95 border border-slate-200 text-sky-650 py-1 px-2.5 rounded-md font-bold shadow-sm">
                        {post.category}
                      </span>
                    </div>

                    {/* Metadata Content */}
                    <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3 text-[10px] font-mono text-slate-500">
                          <span className="flex items-center space-x-1">
                            <Calendar className="h-3.5 w-3.5" />
                            <span>{post.createdAt instanceof Date ? post.createdAt.toLocaleDateString() : String(post.createdAt)}</span>
                          </span>
                          <span>•</span>
                          <span className="flex items-center space-x-1">
                            <Eye className="h-3.5 w-3.5" />
                            <span>{post.views || 0} views</span>
                          </span>
                        </div>

                        <h3 
                          onClick={() => handleReadArticle(post)}
                          className="text-base sm:text-lg font-bold font-display text-slate-900 group-hover:text-sky-650 smooth-transition leading-snug cursor-pointer line-clamp-2"
                        >
                          {post.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light line-clamp-3">
                          {post.summary}
                        </p>
                      </div>

                      {/* Footer Read trigger button */}
                      <div className="pt-4 mt-4 border-t border-slate-100">
                        <button
                          onClick={() => handleReadArticle(post)}
                          className="flex items-center space-x-2 text-xs font-semibold text-indigo-600 group-hover:text-sky-650 smooth-transition uppercase tracking-wider hover:cursor-pointer"
                        >
                          <span>Review Full Case Log</span>
                          <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

          </div>
        )}

      </div>
    </section>
  );
}
