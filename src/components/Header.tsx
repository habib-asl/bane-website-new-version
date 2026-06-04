import React, { useState, useEffect } from 'react';
import { Menu, X, Settings, Mail, LogOut, LayoutDashboard } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isAdminLoggedIn: boolean;
  onLogout: () => void;
}

export default function Header({ activeTab, setActiveTab, isAdminLoggedIn, onLogout }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [localActiveTab, setLocalActiveTab] = useState(activeTab);
  const [time, setTime] = useState(new Date());

  // Real-time clock for aviation operations
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatUTC = (date: Date) => {
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds} Z`;
  };

  const formatDhaka = (date: Date) => {
    try {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Dhaka',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      return new Intl.DateTimeFormat('en-US', options).format(date) + ' DAC';
    } catch (e) {
      // Fallback if browser timezone mapping fails
      return date.toLocaleTimeString() + ' Local';
    }
  };

  // Synchronize local active indicators when global state changes
  useEffect(() => {
    if (activeTab === 'home') {
      // Keep localActiveTab as is if it is 'about' or 'contact' which are subsections of home
      if (localActiveTab !== 'about' && localActiveTab !== 'contact') {
        setLocalActiveTab('home');
      }
    } else if (activeTab === 'services') {
      setLocalActiveTab('services');
    } else {
      setLocalActiveTab(activeTab);
    }
  }, [activeTab]);

  const handleTabClick = (id: string) => {
    setIsOpen(false);
    if (id === 'home') {
      setActiveTab('home');
      setLocalActiveTab('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (id === 'about') {
      setActiveTab('home');
      setLocalActiveTab('about');
      setTimeout(() => {
        const el = document.getElementById('about-section');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    } else if (id === 'services') {
      setActiveTab('services');
      setLocalActiveTab('services');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (id === 'contact') {
      setActiveTab('home');
      setLocalActiveTab('contact');
      setTimeout(() => {
        const el = document.getElementById('contact-and-outreach');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } else {
      setActiveTab(id);
      setLocalActiveTab(id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Our Solution' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div id="aviation-header-section" className="aviation-header-wrapper w-full sticky top-0 z-50">
      
      {/* TOP ROW: Pure White Branding Section */}
      <div className="w-full bg-white border-b border-slate-100 py-3 md:py-4 px-4 sm:px-8 xl:px-16">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          
          {/* Logo container with official BANE Logo Image from company assets */}
          <div 
            onClick={() => handleTabClick('home')}
            className="flex items-center cursor-pointer select-none group"
          >
            <img 
              src="https://bane.aero/wp-content/uploads/2024/06/BANE-Logo-V4-final.png" 
              alt="BANE Logo" 
              className="h-12 sm:h-14 md:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.015]"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Right Side: Primary Info Channel & Dynamic Console Control Buttons */}
          <div className="flex items-center space-x-6">
            <a 
              href="mailto:info@bane.aero" 
              className="hidden sm:flex items-center space-x-2 text-sm sm:text-[15px] font-semibold text-slate-700 hover:text-[#009FE3] transition-colors"
            >
              <Mail className="h-4.5 w-4.5 text-slate-500 hover:text-[#009FE3]" />
              <span>info@bane.aero</span>
            </a>

            {/* Preserving Staff Login/Staff Console container for easy recovery when requested by user */}
            {/* 
            <div className="hidden md:flex items-center space-x-2.5 border-l border-slate-200 pl-6">
              {isAdminLoggedIn ? (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleTabClick('admin')}
                    className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                      activeTab === 'admin' 
                        ? 'bg-[#009FE3]/10 text-[#009FE3]' 
                        : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                    }`}
                  >
                    <LayoutDashboard className="h-3.5 w-3.5" />
                    <span>Staff Console</span>
                  </button>
                  <button
                    onClick={onLogout}
                    title="Log Out Staff"
                    className="p-1.5 bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 rounded-lg transition-all"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleTabClick('admin')}
                  className="flex items-center space-x-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-all hover:bg-slate-50 px-3 py-1.5 rounded-lg"
                >
                  <Settings className="h-3.5 w-3.5" />
                  <span>Staff Login</span>
                </button>
              )}
            </div>
            */}

            {/* Hamburger for tiny screen layouts */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-all"
              aria-label="Toggle navigation drawer"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* BOTTOM ROW: Deep Sky Blue Full-Width Dynamic Navigation Bar */}
      <div className="w-full bg-[#009FE3] text-white shadow-md">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 xl:px-16 flex items-center justify-between">
          <nav className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => {
              const isActive = localActiveTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`relative py-3.5 px-6 text-[15px] font-semibold tracking-wide transition-all duration-205 cursor-pointer uppercase ${
                    isActive 
                      ? 'text-white font-bold opacity-100' 
                      : 'text-white/80 hover:text-white hover:bg-white/10 opacity-90'
                  }`}
                >
                  <span>{item.label}</span>
                  {/* Bottom precise active white line */}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-1 bg-white" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Dynamic real-time aviation clocks */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-3.5 text-xs font-mono text-white/95">
              <div className="flex items-center space-x-1.5 bg-white/10 px-3 py-1 rounded-lg border border-white/10 hover:border-white/20 transition-all">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span className="opacity-70 font-semibold uppercase tracking-wider text-[10px]">UTC:</span>
                <span className="font-extrabold text-[11px] tracking-wide text-white">{formatUTC(time)}</span>
              </div>
              <div className="flex items-center space-x-1.5 bg-white/10 px-3 py-1 rounded-lg border border-white/10 hover:border-white/20 transition-all">
                <span className="opacity-70 font-semibold uppercase tracking-wider text-[10px]">DAC:</span>
                <span className="font-extrabold text-[11px] tracking-wide text-white">{formatDhaka(time)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE DRAWER: Dropdown layout matching theme */}
      {isOpen && (
        <div className="md:hidden w-full bg-[#009FE3] text-white border-t border-white/20 px-4 py-3 space-y-2 shadow-inner">
          {navItems.map((item) => {
            const isActive = localActiveTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`block w-full text-left px-4 py-2.5 rounded-lg text-sm font-bold uppercase transition-all ${
                  isActive 
                    ? 'bg-white/20 text-white' 
                    : 'text-white/80 hover:bg-white/10'
                }`}
              >
                {item.label}
              </button>
            );
          })}
          
          {/* Mobile staff links */}
          <div className="pt-2 border-t border-white/15 space-y-2">
            <a 
              href="mailto:info@bane.aero" 
              className="flex items-center space-x-2 text-sm text-white/90 px-4 py-2"
            >
              <Mail className="h-4 w-4" />
              <span>info@bane.aero</span>
            </a>
            
            {isAdminLoggedIn ? (
              <div className="flex items-center justify-between px-4 py-2">
                <button
                  onClick={() => handleTabClick('admin')}
                  className="text-xs font-bold uppercase text-white hover:underline"
                >
                  Admin Panel
                </button>
                <button
                  onClick={() => { setIsOpen(false); onLogout(); }}
                  className="text-xs uppercase text-rose-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleTabClick('admin')}
                className="block w-full text-left px-4 py-2 text-xs font-bold uppercase text-white/90"
              >
                Staff Portal Login
              </button>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
