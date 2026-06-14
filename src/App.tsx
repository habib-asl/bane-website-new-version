import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import AviationHero from './components/AviationHero';
import AboutSection, { AboutKeyFeatures, AboutMissionVision, AboutNarrative } from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import PortfolioGallery from './components/PortfolioGallery';
import BlogSection from './components/BlogSection';
import BookingForm from './components/BookingForm';
import ContactSection from './components/ContactSection';
import ArmsSection from './components/ArmsSection';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import FlightPermitDetail from './components/FlightPermitDetail';
import AdsbDetail from './components/AdsbDetail';
import ElectronicFlightPlanDetail from './components/ElectronicFlightPlanDetail';
import AeronauticalInvoiceDetail from './components/AeronauticalInvoiceDetail';
import GeneralAviationDetail from './components/GeneralAviationDetail';

import { BlogPost, GalleryItem } from './types';
import { INITIAL_BLOGS, INITIAL_GALLERY } from './data/seedData';
import { Plane, AlertTriangle, Cpu, HelpCircle } from 'lucide-react';

const knownTabs = [
  'services', 
  'flight-permit', 
  'adsb-detail', 
  'flight-plan-detail', 
  'aeronautical-invoice-detail', 
  'general-aviation-detail', 
  'gallery', 
  'blog', 
  'booking', 
  'admin'
];

const getTabFromURL = (): string => {
  const pathname = window.location.pathname;
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length === 0) return 'home';
  
  const lastSegment = segments[segments.length - 1];
  
  if (lastSegment === 'bane-website-new-version') return 'home';
  
  if (knownTabs.includes(lastSegment)) {
    return lastSegment;
  }
  
  return 'home';
};

const getBasePath = (): string => {
  const pathname = window.location.pathname;
  if (pathname.includes('/bane-website-new-version')) {
    return '/bane-website-new-version';
  }
  return '';
};

const updateURL = (tab: string) => {
  const basePath = getBasePath();
  const targetPath = tab === 'home' ? (basePath || '/') : `${basePath}/${tab}`;
  
  if (window.location.pathname !== targetPath) {
    window.history.pushState({ tab }, '', targetPath);
  }
};

export default function App() {
  const [activeTab, setActiveTabInternal] = useState<string>('home');
  const [targetBookingService, setTargetBookingService] = useState<string>("Aviation Consultancy");
  
  // Sync state on load
  useEffect(() => {
    setActiveTabInternal(getTabFromURL());
  }, []);

  const setActiveTab = (tab: string) => {
    setActiveTabInternal(tab);
    updateURL(tab);
  };

  // Popstate navigation synchronization (e.g. Back/Forward)
  useEffect(() => {
    const handlePopState = () => {
      setActiveTabInternal(getTabFromURL());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);
  
  // Dynamic state repositories to enable instant cross-tab propagation when CMS is manipulated
  const [blogsState, setBlogsState] = useState<BlogPost[]>(INITIAL_BLOGS);
  const [galleryState, setGalleryState] = useState<GalleryItem[]>(INITIAL_GALLERY);
  
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Read admin staff active session markers from client local vaults on startup
  useEffect(() => {
    const session = localStorage.getItem('bane_admin_session');
    if (session) {
      setIsAdminLoggedIn(true);
    } else {
      setIsAdminLoggedIn(false);
    }
  }, [activeTab]);

  const handleSelectServiceForBooking = (serviceName: string) => {
    setTargetBookingService(serviceName);
    setActiveTab('booking');
    
    // Smooth scroll down to form
    setTimeout(() => {
      const el = document.getElementById('consultancy-scheduling');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleReadMoreService = (serviceName: string) => {
    // Smooth scroll to top of viewport
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (serviceName === "ADS-B Flight Tracking") {
      setActiveTab('adsb-detail');
    } else if (serviceName === "Electronic Flight Plan System") {
      setActiveTab('flight-plan-detail');
    } else if (serviceName === "Aeronautical Invoice Module") {
      setActiveTab('aeronautical-invoice-detail');
    } else if (serviceName === "General Aviation Flight Permits (Non-Scheduled)") {
      setActiveTab('general-aviation-detail');
    } else {
      setActiveTab('flight-permit');
    }
  };

  const handleRefreshSeedsFromCMS = (updatedBlogs: BlogPost[], updatedGallery: GalleryItem[]) => {
    setBlogsState(updatedBlogs);
    setGalleryState(updatedGallery);
  };

  return (
    <div id="bane-aviation-engine" className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans transition-all selection:bg-sky-100 selection:text-sky-800">
      
      {/* Dynamic Navigation Header bar */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isAdminLoggedIn={isAdminLoggedIn} 
        onLogout={() => {
          localStorage.removeItem('bane_admin_session');
          setIsAdminLoggedIn(false);
          setActiveTab('home');
        }} 
      />

      {/* Main viewport sections switcher */}
      <main className="flex-grow font-sans">
        
        {activeTab === 'home' && (
          <div className="animate-fade-in space-y-0">
            {/* 1. HERO SHIELD RADAR INTERACTIVE */}
            <AviationHero 
              onExploreServices={() => {
                const el = document.getElementById('services-suite');
                if (el) { el.scrollIntoView({ behavior: 'smooth' }); }
              }} 
              onBookDemo={() => handleSelectServiceForBooking("General Consultancy Call")} 
            />

            {/* 2.1 KEY FEATURES */}
            <AboutKeyFeatures />

            {/* 3.5 REVENUE MANAGEMENT SUITE (ARMS) */}
            <ArmsSection />

            {/* 3. QUICK SERVICES PREVIEW BENTO SPLITS */}
            <ServicesSection onSelectService={handleSelectServiceForBooking} onReadMore={handleReadMoreService} />

            {/* 2.2 STRATEGIC FRAMEWORK (MISSION & VISION) */}
            <AboutMissionVision />

            {/* 2.3 ABOUT BANE & OPERATIONAL PILLARS (Now placed under Mission & Vision) */}
            <AboutNarrative />

            {/* 4. SEED OUTREACH & CONTACT FORM BLOCK */}
            <ContactSection />
          </div>
        )}

        {activeTab === 'services' && (
          <div className="animate-fade-in">
            {/* Full-width interactive details services */}
            <ServicesSection onSelectService={handleSelectServiceForBooking} onReadMore={handleReadMoreService} />
            <ArmsSection />
            <ContactSection />
          </div>
        )}

        {activeTab === 'flight-permit' && (
          <div className="animate-fade-in">
            <FlightPermitDetail 
              onBack={() => {
                setActiveTab('services');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }} 
              onBookDemo={handleSelectServiceForBooking}
            />
          </div>
        )}

        {activeTab === 'adsb-detail' && (
          <div className="animate-fade-in">
            <AdsbDetail 
              onBack={() => {
                setActiveTab('services');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }} 
            />
          </div>
        )}

        {activeTab === 'flight-plan-detail' && (
          <div className="animate-fade-in">
            <ElectronicFlightPlanDetail 
              onBack={() => {
                setActiveTab('services');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }} 
              onBookDemo={handleSelectServiceForBooking}
            />
          </div>
        )}

        {activeTab === 'aeronautical-invoice-detail' && (
          <div className="animate-fade-in">
            <AeronauticalInvoiceDetail 
              onBack={() => {
                setActiveTab('services');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }} 
              onBookDemo={handleSelectServiceForBooking}
            />
          </div>
        )}

        {activeTab === 'general-aviation-detail' && (
          <div className="animate-fade-in">
            <GeneralAviationDetail 
              onBack={() => {
                setActiveTab('services');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }} 
              onBookDemo={handleSelectServiceForBooking}
            />
          </div>
        )}

        {activeTab === 'gallery' && (
          <div className="animate-fade-in font-sans">
            <PortfolioGallery gallerySeed={galleryState} />
          </div>
        )}

        {activeTab === 'blog' && (
          <div className="animate-fade-in font-sans">
            <BlogSection blogSeed={blogsState} />
          </div>
        )}

        {activeTab === 'booking' && (
          <div className="animate-fade-in font-sans">
            <BookingForm 
              initialService={targetBookingService} 
              onBookingSuccess={() => {
                // Return to home page after standard brief buffer
                setTimeout(() => {
                  setActiveTab('home');
                }, 3000);
              }} 
            />
          </div>
        )}

        {activeTab === 'admin' && (
          <div className="animate-fade-in font-sans">
            <AdminPanel 
              onRefreshSeeds={handleRefreshSeedsFromCMS} 
              currentBlogs={blogsState} 
              currentGallery={galleryState} 
            />
          </div>
        )}

      </main>

      {/* Corporate Aviation Footer maps */}
      <Footer onNavigate={(tab) => setActiveTab(tab)} />

    </div>
  );
}
