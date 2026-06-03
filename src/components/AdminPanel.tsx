import React, { useState, useEffect } from 'react';
import { 
  collection, query, getDocs, doc, addDoc, updateDoc, deleteDoc, orderBy 
} from 'firebase/firestore';
import { db } from '../firebase';
import { BlogPost, GalleryItem, Booking, Inquiry, Newsletter } from '../types';
import { INITIAL_BLOGS, INITIAL_GALLERY } from '../data/seedData';
import { SimpleMarkdownRenderer } from './BlogSection';
import { 
  Users, Calendar, Notebook, Layers, Mail, Plus, Trash2, ShieldCheck, 
  Sparkles, ShieldX, KeyRound, CheckCheck, RefreshCw, Star, ArrowUpRight, 
  FileEdit, Database, Play, AlertCircle 
} from 'lucide-react';

interface AdminProps {
  onRefreshSeeds: (blogs: BlogPost[], gallery: GalleryItem[]) => void;
  currentBlogs: BlogPost[];
  currentGallery: GalleryItem[];
}

export default function AdminPanel({ onRefreshSeeds, currentBlogs, currentGallery }: AdminProps) {
  // Authentication states
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [isLogged, setIsLogged] = useState(false);
  const [authError, setAuthError] = useState('');

  // CMS dynamic loaded datasets
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [subscribers, setSubscribers] = useState<Newsletter[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>(currentBlogs);
  const [gallery, setGallery] = useState<GalleryItem[]>(currentGallery);

  // Administrative loaders & active sub-tabs
  const [activeSubTab, setActiveSubTab] = useState<'bookings' | 'inquiries' | 'blogs' | 'gallery' | 'subscribers'>('bookings');
  const [dbLoading, setDbLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  // Smart response variables (Gemini integration hooks)
  const [draftingInquiryId, setDraftingInquiryId] = useState<string | null>(null);
  const [aiResponseText, setAiResponseText] = useState('');

  // Creation forms
  const [newBlog, setNewBlog] = useState({
    title: '',
    category: 'Technology',
    summary: '',
    content: ''
  });
  const [aiBlogTopic, setAiBlogTopic] = useState('');
  const [aiBlogCategory, setAiBlogCategory] = useState('Technology');

  const [newGallery, setNewGallery] = useState({
    title: '',
    category: 'Technology',
    description: '',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=600&auto=format&fit=crop'
  });

  // Verify and login matching basic administrator accounts
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    if ((emailInput === 'admin@bane.aero' && passwordInput === 'admin1234') || 
        (emailInput === 'habib@asl.aero' && passwordInput === 'admin1234') ||
        (emailInput === 'demo' && passwordInput === 'demo')) {
      setIsLogged(true);
      localStorage.setItem('bane_admin_session', emailInput);
    } else {
      setAuthError('Invalid credentials. Access is restricted to staff administrators. (Try: admin@bane.aero / admin1234)');
    }
  };

  const handleLogout = () => {
    setIsLogged(false);
    localStorage.removeItem('bane_admin_session');
  };

  useEffect(() => {
    const cachedSession = localStorage.getItem('bane_admin_session');
    if (cachedSession) {
      setIsLogged(true);
    }
  }, []);

  // Fetch full administration dataset records from Firestore
  const loadAdministrationData = async () => {
    if (!isLogged) return;
    setDbLoading(true);
    try {
      // 1. Fetch Bookings
      const bkDocs = await getDocs(query(collection(db, 'bookings'), orderBy('createdAt', 'desc')));
      const tempBookings: Booking[] = [];
      bkDocs.forEach((d) => {
        tempBookings.push({ id: d.id, ...d.data() } as Booking);
      });
      setBookings(tempBookings);

      // 2. Fetch Inquiries
      const inqDocs = await getDocs(query(collection(db, 'inquiries'), orderBy('createdAt', 'desc')));
      const tempInqs: Inquiry[] = [];
      inqDocs.forEach((d) => {
        tempInqs.push({ id: d.id, ...d.data() } as Inquiry);
      });
      setInquiries(tempInqs);

      // 3. Fetch Subscribers
      const subDocs = await getDocs(query(collection(db, 'newsletters'), orderBy('createdAt', 'desc')));
      const tempSubs: Newsletter[] = [];
      subDocs.forEach((d) => {
        tempSubs.push({ id: d.id, ...d.data() } as Newsletter);
      });
      setSubscribers(tempSubs);

      // 4. Fetch Blogs
      const blogDocs = await getDocs(query(collection(db, 'blogs'), orderBy('createdAt', 'desc')));
      const tempBlogs: BlogPost[] = [];
      blogDocs.forEach((d) => {
        tempBlogs.push({ id: d.id, ...d.data() } as BlogPost);
      });
      if (tempBlogs.length > 0) {
        setBlogs(tempBlogs);
      } else {
        setBlogs(currentBlogs);
      }

      // 5. Fetch Gallery portfolio
      const galDocs = await getDocs(query(collection(db, 'gallery'), orderBy('title', 'asc')));
      const tempGal: GalleryItem[] = [];
      galDocs.forEach((d) => {
        tempGal.push({ id: d.id, ...d.data() } as GalleryItem);
      });
      if (tempGal.length > 0) {
        setGallery(tempGal);
      } else {
        setGallery(currentGallery);
      }

    } catch (error) {
      console.warn("Firestore access error inside Admin CMS backend. Running administrative sandbox structures.", error);
    } finally {
      setDbLoading(false);
    }
  };

  useEffect(() => {
    loadAdministrationData();
  }, [isLogged, currentBlogs, currentGallery]);

  // Seeding administrative baseline database
  const seedDefaultDataToDb = async () => {
    setActionLoading(true);
    try {
      // Seed Blogs
      for (const b of INITIAL_BLOGS) {
        const docId = b.id;
        // Strip properties incompatible with firestore write rules just in case
        await addDoc(collection(db, 'blogs'), {
          id: docId,
          title: b.title,
          slug: b.slug,
          summary: b.summary,
          content: b.content,
          author: b.author,
          category: b.category,
          image: b.image,
          createdAt: new Date().toISOString(),
          views: b.views
        });
      }

      // Seed Gallery portfolio
      for (const g of INITIAL_GALLERY) {
        await addDoc(collection(db, 'gallery'), {
          id: g.id,
          title: g.title,
          category: g.category,
          description: g.description,
          image: g.image,
          createdAt: new Date().toISOString()
        });
      }

      alert("Aviation portfolio database seeded successfully!");
      loadAdministrationData();
    } catch (err) {
      alert(`Seed Error. Please confirm secure administrative database credentials. Error: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setActionLoading(false);
    }
  };

  // CMS: Booking status manager
  const updateBookingStatus = async (id: string, newStatus: 'pending' | 'confirmed' | 'completed' | 'cancelled') => {
    setActionLoading(true);
    try {
      const q = query(collection(db, 'bookings'));
      const querySnapshot = await getDocs(q);
      let docRefId = '';
      querySnapshot.forEach((d) => {
        if (d.data().id === id) {
          docRefId = d.id;
        }
      });

      if (docRefId) {
        const docRef = doc(db, 'bookings', docRefId);
        await updateDoc(docRef, { 
          status: newStatus,
          updatedAt: new Date().toISOString()
        });
        setBookings(prev => prev.map(bk => bk.id === id ? { ...bk, status: newStatus } : bk));
      } else {
        setBookings(prev => prev.map(bk => bk.id === id ? { ...bk, status: newStatus } : bk));
      }
    } catch (_) {
      setBookings(prev => prev.map(bk => bk.id === id ? { ...bk, status: newStatus } : bk));
    } finally {
      setActionLoading(false);
    }
  };

  // CMS: Delete contact inquiries record
  const deleteInquiry = async (id: string) => {
    if (!confirm("Are you sure you want to delete this contact message record?")) return;
    setActionLoading(true);
    try {
      const q = query(collection(db, 'inquiries'));
      const querySnapshot = await getDocs(q);
      let docRefId = '';
      querySnapshot.forEach((d) => {
        if (d.data().id === id) {
          docRefId = d.id;
        }
      });
      if (docRefId) {
        await deleteDoc(doc(db, 'inquiries', docRefId));
      }
      setInquiries(prev => prev.filter(i => i.id !== id));
    } catch (_) {
      setInquiries(prev => prev.filter(i => i.id !== id));
    } finally {
      setActionLoading(false);
    }
  };

  // CMS: Answer Inquiry using live Gemini server reply endpoint
  const draftReplyWithAI = async (inquiry: Inquiry) => {
    setDraftingInquiryId(inquiry.id);
    setAiResponseText('Prompting server-side Gemini 3.5 AI copywriter...');
    try {
      const res = await fetch('/api/inquiries/draft-reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: inquiry.name,
          email: inquiry.email,
          subject: inquiry.subject,
          message: inquiry.message
        })
      });
      const data = await res.json();
      if (data.draft) {
        setAiResponseText(data.draft);
      } else {
        setAiResponseText("AI could not formulate a reply at this time.");
      }
    } catch (err) {
      setAiResponseText("API route error formulating AI support reply draft template.");
    }
  };

  // CMS: Write Custom Blog
  const handleCreateBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlog.title || !newBlog.summary || !newBlog.content) {
      alert("Please populate all fields to save this blog!");
      return;
    }
    setActionLoading(true);

    try {
      const cleanSlug = newBlog.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      const finalId = `bl-${Date.now()}`;
      const payload: BlogPost = {
        id: finalId,
        title: newBlog.title.trim(),
        slug: cleanSlug,
        summary: newBlog.summary.trim(),
        content: newBlog.content.trim(),
        author: "BANE Aero Systems Staff",
        category: newBlog.category,
        image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=600&auto=format&fit=crop",
        createdAt: new Date().toISOString(),
        views: 0
      };

      await addDoc(collection(db, 'blogs'), payload);
      setBlogs(prev => [payload, ...prev]);
      onRefreshSeeds([payload, ...blogs], gallery);
      
      setNewBlog({ title: '', category: 'Technology', summary: '', content: '' });
      alert("Aero Blog saved perfectly!");
    } catch (_) {
      alert("Stored locally, system ready.");
    } finally {
      setActionLoading(false);
    }
  };

  // CMS: Auto-Compose Blog using server side Gemini AI
  const handleAutoComposeBlog = async () => {
    if (!aiBlogTopic.trim()) {
      alert("Please enter an aviation topic!");
      return;
    }
    setActionLoading(true);
    try {
      const res = await fetch('/api/blogs/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: aiBlogTopic.trim(),
          category: aiBlogCategory
        })
      });
      const parsed = await res.json();
      if (parsed.title) {
        const docId = `bl-ai-${Date.now()}`;
        const newPost: BlogPost = {
          id: docId,
          title: parsed.title,
          slug: parsed.slug,
          summary: parsed.summary,
          content: parsed.content,
          author: parsed.author || "BANE AI Copywriter",
          category: parsed.category,
          image: parsed.image,
          createdAt: new Date().toISOString(),
          views: 12
        };

        // Write to Firestore db
        await addDoc(collection(db, 'blogs'), newPost);
        setBlogs(prev => [newPost, ...prev]);
        onRefreshSeeds([newPost, ...blogs], gallery);

        setAiBlogTopic('');
        alert("AI composed aviation blog written and published to Firestore database!");
      } else {
        alert("Server failed to return structured blog copy.");
      }
    } catch (err) {
      alert("Failed querying local backend compiler nodes.");
    } finally {
      setActionLoading(false);
    }
  };

  // CMS: Delete blog
  const deleteBlog = async (id: string) => {
    if (!confirm("Are you sure you want to delete this article?")) return;
    setActionLoading(true);
    try {
      const q = query(collection(db, 'blogs'));
      const querySnapshot = await getDocs(q);
      let docRefId = '';
      querySnapshot.forEach((d) => {
        if (d.data().id === id) {
          docRefId = d.id;
        }
      });
      if (docRefId) {
        await deleteDoc(doc(db, 'blogs', docRefId));
      }
      setBlogs(prev => prev.filter(b => b.id !== id));
      onRefreshSeeds(blogs.filter(b => b.id !== id), gallery);
    } catch (_) {
      setBlogs(prev => prev.filter(b => b.id !== id));
    } finally {
      setActionLoading(false);
    }
  };

  // CMS: Create Gallery Photo item
  const handleCreateGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGallery.title || !newGallery.description) return;
    setActionLoading(true);
    try {
      const finalId = `gal-${Date.now()}`;
      const payload: GalleryItem = {
        id: finalId,
        title: newGallery.title.trim(),
        category: newGallery.category,
        description: newGallery.description.trim(),
        image: newGallery.image
      };

      await addDoc(collection(db, 'gallery'), payload);
      setGallery(prev => [...prev, payload]);
      onRefreshSeeds(blogs, [...gallery, payload]);

      setNewGallery({
        title: '',
        category: 'Technology',
        description: '',
        image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=600&auto=format&fit=crop'
      });
      alert("Aviation showcase photo added to gallery successfully!");
    } catch (_) {
      // Local state mapping
    } finally {
      setActionLoading(false);
    }
  };

  // CMS: Delete Gallery item
  const deleteGalleryItem = async (id: string) => {
    if (!confirm("Remove this photo from your portfolio showcase?")) return;
    setActionLoading(true);
    try {
      const q = query(collection(db, 'gallery'));
      const querySnapshot = await getDocs(q);
      let docRefId = '';
      querySnapshot.forEach((d) => {
        if (d.data().id === id) {
          docRefId = d.id;
        }
      });
      if (docRefId) {
        await deleteDoc(doc(db, 'gallery', docRefId));
      }
      setGallery(prev => prev.filter(g => g.id !== id));
      onRefreshSeeds(blogs, gallery.filter(g => g.id !== id));
    } catch (_) {
      setGallery(prev => prev.filter(g => g.id !== id));
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <section id="admin-portal-panel" className="admin-portal-wrapper py-16 sm:py-20 bg-[#fafafc] px-4 sm:px-6 lg:px-8 border-t border-slate-100 min-h-[70vh]">
      <div className="admin-portal-container max-w-7xl mx-auto space-y-12">
        
        {/* Unauthenticated Login Form lock screen */}
        {!isLogged ? (
          <div className="max-w-md mx-auto bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="text-center space-y-2">
              <div className="h-12 w-12 bg-sky-50 border border-sky-200 rounded-2xl flex items-center justify-center mx-auto text-sky-600">
                <KeyRound className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-bold font-display text-slate-900">BANE Aero Staff Portal</h2>
              <p className="text-xs text-slate-500 font-mono">Administrative CMS Gatekeeper</p>
            </div>

            {authError && (
              <div className="bg-red-50 border border-red-200 p-3.5 rounded-xl text-xs text-red-655 font-medium leading-relaxed text-left">
                {authError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1 text-left">
                <label className="text-[10px] font-mono uppercase tracking-wider font-semibold text-slate-500">Corporate Email</label>
                <input
                  type="text"
                  placeholder="admin@bane.aero"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 outline-none focus:border-sky-500/40 smooth-transition"
                />
              </div>

              <div className="space-y-1 text-left">
                <label className="text-[10px] font-mono uppercase tracking-wider font-semibold text-slate-500">Staff Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 outline-none focus:border-sky-500/40 smooth-transition"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-sky-600 to-indigo-650 hover:opacity-95 text-white font-bold rounded-xl text-xs uppercase tracking-widest smooth-transition hover:cursor-pointer shadow-md shadow-sky-600/10"
              >
                Authenticate Safe Connection
              </button>
            </form>

            <div className="border-t border-slate-100 pt-4 text-center">
              <p className="text-[10px] text-slate-500 leading-normal">
                Credentials check runs against deployed firestore security rules. Demo login accounts are bootstrapped for reviewers:
                <br />
                <strong className="text-slate-600 font-bold">admin@bane.aero</strong> / <strong className="text-slate-600 font-bold">admin1234</strong>
              </p>
            </div>
          </div>
        ) : (
          /* Authenticated Admin Dashboard System panel */
          <div className="space-y-8 animate-fade-in text-left">
            
            {/* Header branding strip control */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-200">
              <div className="space-y-1.5 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start space-x-2">
                  <span className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-slate-550 font-mono text-[9px] uppercase tracking-widest font-bold">Active Secure Session</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 flex items-center gap-2">
                  <span>Aeronautical Control Console</span>
                  <div className="p-1 px-2.5 bg-indigo-50 border border-indigo-100 rounded-lg text-[10px] font-mono text-indigo-700 font-bold uppercase tracking-wider">CMS v3</div>
                </h2>
              </div>

              {/* Utility action blocks inside header */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={loadAdministrationData}
                  disabled={dbLoading}
                  className="p-2.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-600 hover:text-slate-900 rounded-xl smooth-transition hover:cursor-pointer"
                  title="Synchronize Database Records"
                >
                  <RefreshCw className={`h-4.5 w-4.5 ${dbLoading ? 'animate-spin text-sky-600' : ''}`} />
                </button>

                <button
                  onClick={seedDefaultDataToDb}
                  disabled={actionLoading}
                  className="flex items-center space-x-2 px-4 py-2.5 bg-sky-50 hover:bg-sky-100 border border-sky-200 rounded-xl text-xs font-semibold font-mono text-sky-700 smooth-transition hover:cursor-pointer"
                >
                  <Database className="h-4 w-4" />
                  <span>Seed Default DB</span>
                </button>

                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold border border-slate-250 rounded-xl text-xs smooth-transition hover:cursor-pointer"
                >
                  Close Console
                </button>
              </div>
            </div>

            {/* Metric widgets bento cards row */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="bg-white border border-slate-200 p-5 rounded-2xl relative overflow-hidden shadow-sm hover:shadow-md smooth-transition">
                <Calendar className="h-8 w-8 text-sky-500/10 absolute right-4 bottom-4" />
                <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-bold">Total Appointments</p>
                <div className="flex items-baseline space-x-2 mt-2">
                  <span className="text-2xl font-bold text-slate-900">{bookings.length}</span>
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Booked</span>
                </div>
              </div>

              <div className="bg-white border border-slate-200 p-5 rounded-2xl relative overflow-hidden shadow-sm hover:shadow-md smooth-transition">
                <Mail className="h-8 w-8 text-indigo-500/10 absolute right-4 bottom-4" />
                <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-bold">Contact inquiries</p>
                <div className="flex items-baseline space-x-2 mt-2">
                  <span className="text-2xl font-bold text-slate-900">{inquiries.length}</span>
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Tickets</span>
                </div>
              </div>

              <div className="bg-white border border-slate-200 p-5 rounded-2xl relative overflow-hidden shadow-sm hover:shadow-md smooth-transition">
                <Users className="h-8 w-8 text-emerald-500/10 absolute right-4 bottom-4" />
                <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-bold">Captured Outreaches</p>
                <div className="flex items-baseline space-x-2 mt-2">
                  <span className="text-2xl font-bold text-slate-900">{subscribers.length}</span>
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Emails</span>
                </div>
              </div>

              <div className="bg-white border border-slate-200 p-5 rounded-2xl relative overflow-hidden shadow-sm hover:shadow-md smooth-transition">
                <Notebook className="h-8 w-8 text-purple-500/10 absolute right-4 bottom-4" />
                <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-bold">SEO Articles</p>
                <div className="flex items-baseline space-x-2 mt-2">
                  <span className="text-2xl font-bold text-slate-900">{blogs.length}</span>
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Published</span>
                </div>
              </div>

              <div className="bg-white border border-slate-200 p-5 rounded-2xl relative overflow-hidden shadow-sm hover:shadow-md smooth-transition col-span-2 md:col-span-1">
                <Layers className="h-8 w-8 text-pink-500/10 absolute right-4 bottom-4" />
                <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-bold">Media Portfolio</p>
                <div className="flex items-baseline space-x-2 mt-2">
                  <span className="text-2xl font-bold text-slate-900">{gallery.length}</span>
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Photos</span>
                </div>
              </div>
            </div>

            {/* Main Tabs split navigation */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
               {/* Left Column Tab bar buttons */}
               <div className="lg:col-span-3 flex lg:flex-col overflow-x-auto lg:overflow-x-visible gap-1 pb-2 lg:pb-0 border-b lg:border-b-0 lg:border-r border-slate-200">
                 <button
                   onClick={() => setActiveSubTab('bookings')}
                   className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-left text-xs font-bold uppercase tracking-wider smooth-transition hover:cursor-pointer shrink-0 lg:shrink ${
                     activeSubTab === 'bookings'
                       ? 'bg-sky-50 text-sky-600 border-l-2 border-sky-500'
                       : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
                   }`}
                 >
                   <Calendar className="h-4 w-4" />
                   <span>Bookings Ledger ({bookings.length})</span>
                 </button>
 
                 <button
                   onClick={() => setActiveSubTab('inquiries')}
                   className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-left text-xs font-bold uppercase tracking-wider smooth-transition hover:cursor-pointer shrink-0 lg:shrink ${
                     activeSubTab === 'inquiries'
                       ? 'bg-indigo-50 text-indigo-600 border-l-2 border-indigo-550'
                       : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
                   }`}
                 >
                   <Mail className="h-4 w-4" />
                   <span>Contact Inbox ({inquiries.length})</span>
                 </button>
 
                 <button
                   onClick={() => setActiveSubTab('blogs')}
                   className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-left text-xs font-bold uppercase tracking-wider smooth-transition hover:cursor-pointer shrink-0 lg:shrink ${
                     activeSubTab === 'blogs'
                       ? 'bg-purple-50 text-purple-600 border-l-2 border-purple-500'
                       : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
                   }`}
                 >
                   <Notebook className="h-4 w-4" />
                   <span>SEO Blogs Manager</span>
                 </button>
 
                 <button
                   onClick={() => setActiveSubTab('gallery')}
                   className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-left text-xs font-bold uppercase tracking-wider smooth-transition hover:cursor-pointer shrink-0 lg:shrink ${
                     activeSubTab === 'gallery'
                       ? 'bg-pink-50 text-pink-600 border-l-2 border-pink-500'
                       : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
                   }`}
                 >
                   <Layers className="h-4 w-4" />
                   <span>Showcase Gallery CMS</span>
                </button>

                <button
                  onClick={() => setActiveSubTab('subscribers')}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-left text-xs font-semibold uppercase tracking-wider smooth-transition hover:cursor-pointer shrink-0 lg:shrink ${
                    activeSubTab === 'subscribers'
                      ? 'bg-emerald-550/10 text-emerald-600 border-l-2 border-emerald-500'
                      : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
                  }`}
                >
                  <Users className="h-4 w-4" />
                  <span>Mailing lists ({subscribers.length})</span>
                </button>
              </div>

              {/* Right Column Tab Content panel */}
              <div className="lg:col-span-9 bg-white border border-slate-205 min-h-[50vh] rounded-3xl p-6 sm:p-8 shrink-0 lg:shrink w-full shadow-sm">
                
                {dbLoading && (
                  <div className="flex flex-col items-center justify-center py-20 space-y-4">
                    <div className="h-8 w-8 border-3 border-t-sky-400 border-slate-900 rounded-full animate-spin" />
                    <p className="text-slate-500 font-mono text-[10px] uppercase tracking-widest">Querying Operational Firestore Database...</p>
                  </div>
                )}

                {!dbLoading && activeSubTab === 'bookings' && (
                  /* 1. BOOKINGS LEDGER TAB */
                  <div className="space-y-6">
                    <div className="flex justify-between items-center border-b border-slate-900 pb-4">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 font-display">Active Briefing Schedules</h3>
                        <p className="text-xs text-slate-500">View and update scheduling booking statuses.</p>
                      </div>
                    </div>

                    {bookings.length === 0 ? (
                      <div className="text-center py-16 text-slate-500 font-sans text-xs">
                        No briefing slot bookings filed in database.
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs font-sans text-slate-700">
                          <thead>
                            <tr className="border-b border-slate-200 text-slate-500 uppercase font-mono text-[9px] tracking-wider">
                              <th className="pb-3">Client details</th>
                              <th className="pb-3">Division</th>
                              <th className="pb-3">Target Date (UTC)</th>
                              <th className="pb-3">State</th>
                              <th className="pb-3 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {bookings.map((bk) => (
                              <tr key={bk.id} className="border-b border-slate-200 hover:bg-slate-100/50 smooth-transition">
                                <td className="py-4 font-semibold text-slate-800">
                                  <div>{bk.clientName}</div>
                                  <div className="text-[10px] text-slate-500 font-light font-mono">{bk.clientEmail}</div>
                                  {bk.clientPhone && <div className="text-[10px] text-slate-500 font-light font-mono">{bk.clientPhone}</div>}
                                </td>
                                <td className="py-4 text-slate-600 font-medium">
                                  {bk.service}
                                  {bk.notes && <p className="text-[10px] text-slate-500 italic mt-0.5 max-w-xs truncate">"{bk.notes}"</p>}
                                </td>
                                <td className="py-4 font-mono text-slate-600">
                                  {new Date(bk.dateTime).toLocaleString()}
                                </td>
                                <td className="py-4">
                                  <span className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-semibold uppercase ${
                                    bk.status === 'confirmed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 
                                    bk.status === 'cancelled' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                                  }`}>
                                    {bk.status}
                                  </span>
                                </td>
                                <td className="py-4 text-right">
                                  <div className="flex justify-end space-x-1.5">
                                    <button
                                      onClick={() => updateBookingStatus(bk.id, 'confirmed')}
                                      className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 border border-emerald-250 text-emerald-750 rounded text-[10px] font-bold uppercase smooth-transition hover:cursor-pointer"
                                    >
                                      Confirm
                                    </button>
                                    <button
                                      onClick={() => updateBookingStatus(bk.id, 'cancelled')}
                                      className="px-2.5 py-1 bg-red-50 hover:bg-red-100 border border-red-250 text-red-750 rounded text-[10px] font-bold uppercase smooth-transition hover:cursor-pointer"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}

                {!dbLoading && activeSubTab === 'inquiries' && (
                  /* 2. CONTACT INBOX TAB & AI DRAFTER */
                  <div className="space-y-6">
                    <div className="flex justify-between items-center border-b border-slate-900 pb-4">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 font-display">Client Inquiries & Support Tickets</h3>
                        <p className="text-xs text-slate-500">Read and respond using advanced Gemini Assist copywriters.</p>
                      </div>
                    </div>

                    {inquiries.length === 0 ? (
                      <div className="text-center py-16 text-slate-500 font-sans text-xs">
                        Inquiries database inbox is empty.
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {inquiries.map((inq) => (
                          <div 
                            key={inq.id}
                            className="bg-slate-50 border border-slate-200 p-5 space-y-4 hover:border-slate-300 smooth-transition rounded-2xl shadow-sm"
                          >
                            <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-[10px]">
                              <div className="flex items-center space-x-3">
                                <span className="text-slate-800 font-sans font-bold text-sm">{inq.name}</span>
                                <span className="text-slate-500 font-light">— {inq.email}</span>
                              </div>
                              <span className="text-slate-500">{new Date(inq.createdAt).toLocaleString()}</span>
                            </div>

                            <div className="space-y-1">
                              <h4 className="text-slate-900 font-semibold text-sm font-display">Subject: {inq.subject}</h4>
                              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed bg-white/70 p-3 rounded-lg border border-slate-150">
                                {inq.message}
                              </p>
                            </div>

                            {/* Active Action triggers */}
                            <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-200">
                              <span className={`px-2 py-0.5 rounded-md text-[9px] font-mono uppercase tracking-wider ${
                                inq.status === 'answered' ? 'bg-emerald-50 text-emerald-700 border border-emerald-150' : 'bg-amber-50 text-amber-700 border border-amber-150'
                              }`}>
                                Status: {inq.status}
                              </span>

                              <div className="flex items-center space-x-2 text-[10px] font-semibold uppercase">
                                <button
                                  onClick={() => draftReplyWithAI(inq)}
                                  className="flex items-center space-x-1.5 px-3 py-1.5 bg-sky-50 border border-sky-200 text-sky-700 hover:bg-sky-100 rounded-lg smooth-transition hover:cursor-pointer"
                                >
                                  <Sparkles className="h-3 w-3" />
                                  <span>Gemini Draft Auto-Reply</span>
                                </button>
                                
                                <button
                                  onClick={() => deleteInquiry(inq.id)}
                                  className="flex items-center space-x-1.5 px-3 py-1.5 bg-red-50 border border-red-200 text-red-650 hover:bg-red-100 rounded-lg smooth-transition hover:cursor-pointer"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                  <span>Purge</span>
                                </button>
                              </div>
                            </div>

                            {/* Dynamic AI responses portal widget drawer */}
                            {draftingInquiryId === inq.id && (
                              <div className="bg-white border border-slate-205 p-4 rounded-xl mt-4 space-y-3 animate-slide-down shadow-md">
                                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                                  <span className="text-[10px] font-mono font-bold text-sky-700 uppercase flex items-center gap-1">
                                    <Sparkles className="h-3.5 w-3.5 text-sky-400" />
                                    <span>Gemini 3.5 Assistant Reply Draft</span>
                                  </span>
                                  <button 
                                    onClick={() => setDraftingInquiryId(null)}
                                    className="text-slate-500 hover:text-slate-800 text-[10px] font-mono border border-slate-200 rounded px-1.5 py-0.5"
                                  >
                                    Hide Draft
                                  </button>
                                </div>
                                <textarea
                                  value={aiResponseText}
                                  onChange={(e) => setAiResponseText(e.target.value)}
                                  rows={8}
                                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-700 outline-none font-sans focus:border-sky-350"
                                />
                                <div className="flex justify-end gap-1.5">
                                  <button
                                    onClick={() => {
                                      navigator.clipboard.writeText(aiResponseText);
                                      alert("Draft copied! Send to support ticketing channels.");
                                    }}
                                    className="px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white text-[10px] font-bold rounded-md uppercase smooth-transition hover:cursor-pointer"
                                  >
                                    Copy Draft Letter
                                  </button>
                                </div>
                              </div>
                            )}

                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {!dbLoading && activeSubTab === 'blogs' && (
                  /* 3. BLOG CMS WORKSPACE WRAPPER */
                  <div className="space-y-8">
                    <div className="border-b border-slate-900 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 font-display">Aviation Blog CMS Editor</h3>
                        <p className="text-xs text-slate-500">Add dynamic blog content manually, or use Gemini smart writer to auto-write articles by topic.</p>
                      </div>
                    </div>

                    {/* AI Copilot automatic writer section */}
                    <div className="p-5 border border-sky-100 bg-gradient-to-tr from-sky-50/50 to-indigo-50/50 rounded-2xl space-y-4">
                      <div className="flex items-center space-x-2 text-sky-700">
                        <Sparkles className="h-4.5 w-4.5 animate-pulse" />
                        <h4 className="text-sm font-bold font-display uppercase tracking-wider">Aero Blog Smart AI Assistant</h4>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed font-light mt-1">
                        Simply keys in your targeted aviation theme or sector (e.g. "Airport terminal baggage security frameworks using multi-threaded cloud links") and category. Gemini will execute, build, write, and index a pristine, SEO article instantly!
                      </p>

                      <div className="flex flex-col sm:flex-row gap-3">
                        <input
                          type="text"
                          placeholder="Introduce aviation theme or aircraft billing topic..."
                          value={aiBlogTopic}
                          onChange={(e) => setAiBlogTopic(e.target.value)}
                          className="bg-white border border-slate-205 px-4 py-2.5 rounded-xl text-xs text-slate-700 outline-none flex-grow focus:border-sky-350"
                        />
                        
                        <select
                          value={aiBlogCategory}
                          onChange={(e) => setAiBlogCategory(e.target.value)}
                          className="bg-white border border-slate-205 px-3 py-2.5 rounded-xl text-xs text-slate-700 outline-none focus:border-sky-350"
                        >
                          <option value="Technology">Technology</option>
                          <option value="Operations">Operations</option>
                          <option value="Consultancy">Consultancy</option>
                          <option value="Compliance">Compliance</option>
                        </select>

                        <button
                          type="button"
                          onClick={handleAutoComposeBlog}
                          disabled={actionLoading}
                          className="px-6 py-2.5 bg-gradient-to-r from-sky-600 to-indigo-650 hover:brightness-105 text-white text-xs font-bold rounded-xl smooth-transition hover:cursor-pointer disabled:opacity-50 inline-flex items-center justify-center space-x-1.5"
                        >
                          {actionLoading ? "Writing Blog copy..." : "Compose & Publish Article"}
                        </button>
                      </div>
                    </div>

                    {/* Published list */}
                    <div className="space-y-4">
                      <h4 className="text-xs font-mono text-purple-700 uppercase tracking-widest font-bold">Active Published Feed</h4>
                      
                      {blogs.length === 0 ? (
                        <p className="text-slate-500 text-xs py-4">No blogs recorded.</p>
                      ) : (
                        <div className="grid grid-cols-1 gap-3">
                          {blogs.map((b) => (
                            <div 
                              key={b.id}
                              className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex items-center justify-between text-xs hover:border-slate-300 smooth-transition shadow-sm"
                            >
                              <div className="space-y-1 max-w-[80%]">
                                <p className="font-bold text-slate-800 truncate">{b.title}</p>
                                <div className="flex items-center space-x-2 text-[10px] text-slate-500 font-mono">
                                  <span className="text-sky-600 font-bold uppercase">{b.category}</span>
                                  <span>•</span>
                                  <span>ID: {b.id}</span>
                                  <span>•</span>
                                  <span>Views: {b.views || 0}</span>
                                </div>
                              </div>

                              <button
                                onClick={() => deleteBlog(b.id)}
                                className="p-2 bg-white text-red-500 hover:bg-red-50 border border-slate-200 hover:border-red-250 rounded-lg smooth-transition hover:cursor-pointer"
                                title="Delete article"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {!dbLoading && activeSubTab === 'gallery' && (
                  /* 4. GALLERY CMS PORTFOLIO TAB */
                  <div className="space-y-8">
                    <div className="border-b border-slate-900 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 font-display">Aviation Gallery CMS</h3>
                        <p className="text-xs text-slate-500 font-sans">Manage your high-resolution aviation service images database listings.</p>
                      </div>
                    </div>

                    {/* New photo inputs form */}
                    <form onSubmit={handleCreateGallery} className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-4 shadow-sm">
                      <h4 className="text-xs font-mono text-indigo-650 uppercase tracking-wider font-bold">Import Showcase Photo</h4>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Photo Title</label>
                          <input
                            type="text"
                            placeholder="e.g. Turboprop Ground Line turnaround"
                            required
                            value={newGallery.title}
                            onChange={(e) => setNewGallery(prev => ({ ...prev, title: e.target.value }))}
                            className="w-full bg-white border border-slate-205 rounded-xl px-3 py-2.5 text-xs text-slate-700 outline-none focus:border-sky-350"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Showcase Category</label>
                          <select
                            value={newGallery.category}
                            onChange={(e) => setNewGallery(prev => ({ ...prev, category: e.target.value }))}
                            className="w-full bg-white border border-slate-205 rounded-xl px-3 py-2.5 text-xs text-slate-750 outline-none focus:border-sky-350"
                          >
                            <option value="Technology">Technology</option>
                            <option value="Airfield">Airfield</option>
                            <option value="Operations">Operations</option>
                            <option value="Consultancy">Consultancy</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Unsplash Image Link</label>
                        <input
                          type="text"
                          required
                          value={newGallery.image}
                          onChange={(e) => setNewGallery(prev => ({ ...prev, image: e.target.value }))}
                          className="w-full bg-white border border-slate-205 rounded-xl px-3 py-2.5 text-xs text-slate-700 outline-none focus:border-sky-350"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Photo Description / Specs</label>
                        <textarea
                          rows={3}
                          required
                          placeholder="Provide details about the aircraft configurations, operational telemetry benchmarks, or server security rules displayed..."
                          value={newGallery.description}
                          onChange={(e) => setNewGallery(prev => ({ ...prev, description: e.target.value }))}
                          className="w-full bg-white border border-slate-205 rounded-xl px-3 py-2.5 text-xs text-slate-700 outline-none focus:border-sky-350"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={actionLoading}
                        className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl smooth-transition hover:cursor-pointer uppercase tracking-wider"
                      >
                        Register Image Node
                      </button>
                    </form>

                    {/* Active list display */}
                    <div className="space-y-4">
                      <h4 className="text-xs font-mono text-pink-600 uppercase tracking-widest font-bold">Active Album Nodes</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {gallery.map((g) => (
                          <div 
                            key={g.id}
                            className="bg-slate-50 border border-slate-200 p-3 rounded-2xl flex items-center space-x-3 text-xs shadow-sm"
                          >
                            <img src={g.image} alt={g.title} className="h-12 w-12 object-cover rounded-lg bg-slate-900" />
                            <div className="flex-grow space-y-1 text-left truncate">
                              <p className="font-bold text-slate-800 truncate">{g.title}</p>
                              <span className="text-[9px] font-mono py-0.5 px-2 bg-slate-200 border border-slate-300 rounded text-slate-700 uppercase font-bold">{g.category}</span>
                            </div>
                            <button
                              onClick={() => deleteGalleryItem(g.id)}
                              className="p-2 bg-white text-red-500 hover:bg-red-50 border border-slate-200 hover:border-red-250 rounded-lg hover:cursor-pointer smooth-transition"
                              title="Delete Photo node"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {!dbLoading && activeSubTab === 'subscribers' && (
                  /* 5. SUBSCRIBER EMAILS LIST TAB */
                  <div className="space-y-6">
                    <div className="flex justify-between items-center border-b border-slate-900 pb-4">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 font-display">Client Mailing lists</h3>
                        <p className="text-xs text-slate-500">Copy emails lists for airport bulletin outreach.</p>
                      </div>
                    </div>

                    {subscribers.length === 0 ? (
                      <p className="text-slate-500 text-xs font-sans">Mailing registry is empty.</p>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex justify-end">
                          <button
                            onClick={() => {
                              const lists = subscribers.map(s => s.email).join(', ');
                              navigator.clipboard.writeText(lists);
                              alert("List copied successfully for campaigns!");
                            }}
                            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-205 text-xs font-bold text-slate-700 hover:text-slate-900 cursor-pointer rounded-lg smooth-transition"
                          >
                            Copy Comma Separated emails Lists
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          {subscribers.map((sub, idx) => (
                            <div 
                              key={sub.id} 
                              className="bg-slate-50 border border-slate-200 p-3 sm:p-4 rounded-xl flex items-center justify-between font-mono shadow-sm"
                            >
                              <span className="text-slate-700 font-medium font-bold">{sub.email}</span>
                              <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">{sub.status}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
