import React from 'react';
import { Plane, Twitter, Linkedin, Youtube, Github, Mail, ShieldAlert } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="aviation-footer-section" className="aviation-footer-wrapper bg-white border-t border-slate-100 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-sky-500/25 to-transparent pointer-events-none" />
      
      <div className="aviation-footer-container max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Left Column Brand profile */}
        <div className="md:col-span-5 space-y-4 text-left">
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => onNavigate('home')}>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
              <Plane className="h-5 w-5 text-sky-600 rotate-45" />
            </div>
            <div>
              <span className="text-xl font-bold font-display text-slate-900 tracking-wider">BANE</span>
              <span className="text-sky-600 text-[10px] py-0.5 px-1.5 font-mono border border-sky-100 bg-sky-50 rounded-md font-bold ml-1.5">.AERO</span>
            </div>
          </div>
          
          <p className="text-xs text-slate-600 leading-relaxed max-w-sm font-normal">
            BANE is an emerging tech company specializing in customized, modular IT configurations with a strong, dedicated emphasis on the civil aviation industry.
          </p>

          {/* Social media icons list */}
          <div className="flex items-center space-x-3.5 pt-2">
            <a href="https://twitter.com/bane_aero" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-50 hover:bg-sky-50 hover:text-sky-655 rounded-lg border border-slate-200 text-slate-500 smooth-transition">
              <Twitter className="h-4 w-4" />
            </a>
            <a href="https://linkedin.com/company/bane-aero" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-50 hover:bg-sky-50 hover:text-sky-655 rounded-lg border border-slate-200 text-slate-500 smooth-transition">
              <Linkedin className="h-4 w-4" />
            </a>
            <a href="https://youtube.com/c/bane_aero" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-50 hover:bg-sky-50 hover:text-sky-655 rounded-lg border border-slate-200 text-slate-500 smooth-transition">
              <Youtube className="h-4 w-4" />
            </a>
            <a href="https://github.com/bane-aero" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-50 hover:bg-sky-50 hover:text-sky-655 rounded-lg border border-slate-200 text-slate-500 smooth-transition">
              <Github className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Middle Column Portal Links */}
        <div className="col-span-2 text-left space-y-4">
          <h4 className="text-xs font-mono text-sky-600 uppercase tracking-widest font-bold">Service Links</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => onNavigate('services')} className="text-slate-600 hover:text-slate-900 smooth-transition hover:cursor-pointer">Aero ARMS Suite</button>
            </li>
            <li>
              <button onClick={() => onNavigate('services')} className="text-slate-600 hover:text-slate-900 smooth-transition hover:cursor-pointer">Flight Trackers</button>
            </li>
            <li>
              <button onClick={() => onNavigate('services')} className="text-slate-600 hover:text-slate-900 smooth-transition hover:cursor-pointer">Cloud Servers</button>
            </li>
            <li>
              <button onClick={() => onNavigate('services')} className="text-slate-600 hover:text-slate-900 smooth-transition hover:cursor-pointer">Consultancy Hubs</button>
            </li>
          </ul>
        </div>

        {/* Right Middle Column Resources links */}
        <div className="col-span-2 text-left space-y-4">
          <h4 className="text-xs font-mono text-sky-600 uppercase tracking-widest font-bold">Company Maps</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => onNavigate('home')} className="text-slate-600 hover:text-slate-900 smooth-transition hover:cursor-pointer">Enterprise Home</button>
            </li>
            <li>
              <button onClick={() => onNavigate('gallery')} className="text-slate-600 hover:text-slate-900 smooth-transition hover:cursor-pointer">Media Showcase</button>
            </li>
            <li>
              <button onClick={() => onNavigate('blog')} className="text-slate-600 hover:text-slate-900 smooth-transition hover:cursor-pointer">Aero Bulletins</button>
            </li>
            <li>
              <button onClick={() => onNavigate('booking')} className="text-slate-600 hover:text-slate-900 smooth-transition hover:cursor-pointer">Scheduler Console</button>
            </li>
          </ul>
        </div>

        {/* Legal Disclaimer / compliance badges */}
        <div className="col-span-3 text-left space-y-4">
          <h4 className="text-xs font-mono text-sky-600 uppercase tracking-widest font-bold">Aviation SLA</h4>
          <div className="space-y-3 bg-slate-50 p-4 border border-slate-200 rounded-xl">
            <div className="flex items-center space-x-2 text-[10px] font-mono text-emerald-600 font-bold uppercase tracking-wider">
              <ShieldAlert className="h-3.5 w-3.5" />
              <span>ICAO Standard SLA</span>
            </div>
            <p className="text-[10px] text-slate-500 leading-normal">
              Systems verified against civil transponder frameworks and encrypted database logs. Dedicated disaster backup rails deployed globally.
            </p>
          </div>
        </div>

      </div>

      {/* Copy copyright */}
      <div className="max-w-7xl mx-auto pt-8 mt-10 border-t border-slate-205 text-center flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 font-mono gap-4">
        <p>© {currentYear} BANE Aero Systems. All rights reserved. Dhaka, DAC Terminal.</p>
        <div className="flex items-center space-x-4">
          <a href="#" className="hover:text-slate-800">Privacy Policy</a>
          <span>|</span>
          <a href="#" className="hover:text-slate-800">Terms of Licensing</a>
          <span>|</span>
          <button onClick={() => onNavigate('admin')} className="text-sky-600 hover:text-sky-700 font-bold uppercase hover:cursor-pointer">Staff Portal</button>
        </div>
      </div>
    </footer>
  );
}
